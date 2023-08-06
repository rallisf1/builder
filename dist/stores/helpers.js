import { find as _find, chain as _chain, flattenDeep as _flattenDeep } from 'lodash-es'
import _ from 'lodash-es'
import { get } from 'svelte/store'
import { processors } from '../component.js'
import { site as activeSite } from './data/site.js'
import sections from './data/sections.js'
import symbols from './data/symbols.js'
import pages from './data/pages.js'
import activePage from './app/activePage.js'
import { locale } from './app/misc.js'
import { processCSS, getEmptyValue } from '../utils.js'
import md5 from 'crypto-js/md5'

export function getSymbolUseInfo(symbolID) {
  const info = { pages: [], frequency: 0 }
  get(pages).forEach(page => {
    // TODO: fix this
    // page.sections.forEach(section => {
    //   if (section.symbolID === symbolID) {
    //     info.frequency++
    //     if (!info.pages.includes(page.id)) info.pages.push(page.name)
    //   }
    // })
  })
  return info
}

export function getSymbol(symbolID) {
  return _find(get(symbols), ['id', symbolID]);
}

/** 
 * @param {{ 
 *  page?: import('..').Page 
 *  site?: import('..').Site
 *  page_sections?: import('..').Section[]
 *  page_symbols?: import('..').Symbol[]
 *  locale?: string
 *  separateModules?: boolean
 *  no_js?: boolean
 * }} details
 * @returns {Promise<string | { html: string, js: string}>} 
 * */
export async function buildStaticPage({ page = get(activePage), site = get(activeSite), page_sections = get(sections), page_symbols = get(symbols), locale = 'en', separateModules = false, no_js = false }) {
  const component = await Promise.all([
    (async () => {
      const css = await processCSS(site.code.css + page.code.css)
      const data = getPageData({ page, site, loc: locale })
      return {
        html: `
          <svelte:head>
            ${site.code.html.head}
            ${page.code.html.head}
            <style>${css}</style>
          </svelte:head>`,
        css: ``,
        js: ``,
        data
      }
    })(),
    ...page_sections.map(async section => {
      const symbol = page_symbols.find(symbol => symbol.id === section.symbol)
      const { html, css: postcss, js } = symbol.code
      const data = getComponentData({
        component: section,
        symbol,
        page,
        site,
        loc: locale
      })
      const { css, error } = await processors.css(postcss || '')
      const section_id = section.id.split('-')[0]
      return {
        html: `
          <div class="section" id="section-${section_id}">
            ${html} 
          </div>`,
        js,
        css,
        data
      }
    }).filter(Boolean), // remove options blocks
    (async () => {
      const data = getPageData({ page, site, loc: locale })
      return {
        html: site.code.html.below + page.code.html.below,
        css: ``,
        js: ``,
        data
      }
    })()
  ])

  const res = await processors.html({
    component,
    locale
  })

  const final = `
  <!DOCTYPE html>
  <html lang="${locale}">
    <head>
      <meta name="generator" content="Primo" />
      ${res.head}
      <style>${res.css}</style>
    </head>
    <body id="page">
      ${res.html}
      ${!no_js ? `<script type="module">${buildModule(res.js)}</script>` : ``}
    </body>
  </html>
  `

  // fetch module & content to hydrate component
  function buildModule(js) {
    return separateModules ? `\
      const path = window.location.pathname === '/' ? '' : window.location.pathname
      const [ {default:App} ] = await Promise.all([
        import(path + '/${md5(js).toString()}.js')
      ]).catch(e => console.error(e))
      new App({
        target: document.querySelector('body'),
        hydrate: true,
      })`
      :
      `\
    const App = ${js};
    new App({
      target: document.querySelector('body'),
      hydrate: true
    }); `
  }

  return separateModules ? {
    html: final,
    js: res.js
  } : final
}

// Include static content alongside the component's content
export function getComponentData({
  component,
  symbol = get(symbols).find(symbol => symbol.id === component.symbol),
  page = get(activePage),
  site = get(activeSite),
  loc = get(locale),
  include_parent_data = true
}) {

	let component_content = {}
  symbol.fields.forEach((field) => {
    if (field.is_static || !component) {
      component_content = {
        ...component_content,
        [field.key]: symbol.content[loc][field.key] || getEmptyValue(field)
      }
    } else {
      component_content = {
        ...component_content,
        [field.key]: component.content[loc][field.key] || getEmptyValue(field)
      }
    }
  })

  const site_content = site.content[loc]
  const page_content = page.content[loc]

  return include_parent_data ? _.cloneDeep({
    ...site_content,
    ...page_content,
    ...component_content
  }) : _.cloneDeep(component_content)
}

export function get_content_with_static({ component, symbol, loc = get(locale) } ) {
  if (!symbol) return { en: {} }
  const content = _chain(symbol.fields)
    .map(field => {
      const field_value = component.content?.[loc]?.[field.key]
      // if field is static, use value from symbol content
      if (field.is_static) {
        const symbol_value = symbol.content?.[loc]?.[field.key]
        return {
          key: field.key,
          value: symbol_value
        }
      } else if (field_value !== undefined) {
        return {
          key: field.key,
          value: field_value
        }
      } else {
        const default_content = symbol.content?.[loc]?.[field.key]
        return {
          key: field.key,
          value: default_content || getEmptyValue(field)
        }
      }
    })
    .keyBy('key')
    .mapValues('value')
    .value();

  return _.cloneDeep(content)
}

export function getPageData({
  page = get(activePage),
  site = get(activeSite),
  loc = get(locale)
}) {
  const page_content = page.content[loc]
  const site_content = site.content[loc]
  return {
    ...site_content,
    ...page_content,
  }
}