<script>
	import _, { chain as _chain } from 'lodash-es'
	import { fade } from 'svelte/transition'
	import { getComponentData, getSymbolUseInfo } from '$lib/stores/helpers'

	import IFrame from '$lib/views/modal/ComponentLibrary/IFrame.svelte'
	import { processCode, processCSS } from '$lib/utils'
	import { code as siteCode } from '$lib/stores/data/site'
	import { code as pageCode } from '$lib/stores/app/activePage'
	import { locale } from '$lib/stores/app/misc'

	export let symbol
	export let name = symbol.name || ''
	export let buttons = []
	export let action = null

	let height = 0

	let componentCode
	let cachedSymbol = {}
	$: compile_component_code(symbol, $locale)
	async function compile_component_code(symbol) {
		if (
			_.isEqual(cachedSymbol.code, symbol.code) &&
			_.isEqual(cachedSymbol.content, symbol.content)
		) {
			return
		}

		const component_data = getComponentData({ symbol, loc: 'en' })
		const parent_css = await processCSS($siteCode.css + $pageCode.css)
		let res = await processCode({
			component: {
				...symbol.code,
				head: $siteCode.html.head + $pageCode.html.head,
				css: parent_css + symbol.code.css,
				html: `
          ${symbol.code.html}
          ${$pageCode.html.below}`,
				data: component_data
			},
			buildStatic: true,
			hydrated: false
		})
		res.css = res.css + parent_css
		componentCode = res
		cachedSymbol = _.cloneDeep({ code: symbol.code, content: symbol.content })
	}

	let active
</script>

{#if buttons.length === 1 && action}
	<!-- make whole container a button -->
	<button
		in:fade={{ duration: 100 }}
		class="component-wrapper"
		id="component-{symbol.id}"
		style="height:{height + 32}px"
		on:click={() => {
			active = true
			action.onclick()
		}}
		class:active
	>
		<IFrame bind:height {componentCode} />
		{#if name}
			<header>
				<div class="component-label">
					<span>{name}</span>
				</div>
				{@html action.svg}
			</header>
		{/if}
		<div class="overlay">
			{#if !active}
				<svg
					width="13"
					height="12"
					viewBox="0 0 13 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.5 5.625V6.375C9.5 6.52969 9.37344 6.65625 9.21875 6.65625H7.15625V8.71875C7.15625 8.87344 7.02969 9 6.875 9H6.125C5.97031 9 5.84375 8.87344 5.84375 8.71875V6.65625H3.78125C3.62656 6.65625 3.5 6.52969 3.5 6.375V5.625C3.5 5.47031 3.62656 5.34375 3.78125 5.34375H5.84375V3.28125C5.84375 3.12656 5.97031 3 6.125 3H6.875C7.02969 3 7.15625 3.12656 7.15625 3.28125V5.34375H9.21875C9.37344 5.34375 9.5 5.47031 9.5 5.625ZM12.3125 6C12.3125 9.21094 9.71094 11.8125 6.5 11.8125C3.28906 11.8125 0.6875 9.21094 0.6875 6C0.6875 2.78906 3.28906 0.1875 6.5 0.1875C9.71094 0.1875 12.3125 2.78906 12.3125 6ZM11.1875 6C11.1875 3.41016 9.08984 1.3125 6.5 1.3125C3.91016 1.3125 1.8125 3.41016 1.8125 6C1.8125 8.58984 3.91016 10.6875 6.5 10.6875C9.08984 10.6875 11.1875 8.58984 11.1875 6Z"
						fill="white"
					/>
				</svg>
			{/if}
			<span>
				{active && action.clicked ? action.clicked.label : action.label}
			</span>
		</div>
	</button>
{:else}
	<div in:fade={{ duration: 100 }} class="component-wrapper" id="component-{symbol.id}">
		{#if action}
			<div class="primary-action" class:active>
				<button
					on:click={() => {
						active = true
						action.onclick()
					}}
				>
					<IFrame bind:height {componentCode} />
					<div class="overlay">
						{#if !active}
							<svg
								width="13"
								height="12"
								viewBox="0 0 13 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.5 5.625V6.375C9.5 6.52969 9.37344 6.65625 9.21875 6.65625H7.15625V8.71875C7.15625 8.87344 7.02969 9 6.875 9H6.125C5.97031 9 5.84375 8.87344 5.84375 8.71875V6.65625H3.78125C3.62656 6.65625 3.5 6.52969 3.5 6.375V5.625C3.5 5.47031 3.62656 5.34375 3.78125 5.34375H5.84375V3.28125C5.84375 3.12656 5.97031 3 6.125 3H6.875C7.02969 3 7.15625 3.12656 7.15625 3.28125V5.34375H9.21875C9.37344 5.34375 9.5 5.47031 9.5 5.625ZM12.3125 6C12.3125 9.21094 9.71094 11.8125 6.5 11.8125C3.28906 11.8125 0.6875 9.21094 0.6875 6C0.6875 2.78906 3.28906 0.1875 6.5 0.1875C9.71094 0.1875 12.3125 2.78906 12.3125 6ZM11.1875 6C11.1875 3.41016 9.08984 1.3125 6.5 1.3125C3.91016 1.3125 1.8125 3.41016 1.8125 6C1.8125 8.58984 3.91016 10.6875 6.5 10.6875C9.08984 10.6875 11.1875 8.58984 11.1875 6Z"
									fill="white"
								/>
							</svg>
						{/if}
						<span>
							{active && action.clicked ? action.clicked.label : action.label}
						</span>
					</div>
				</button>
			</div>
		{:else}
			<IFrame bind:height {componentCode} />
		{/if}
	</div>
{/if}

<style lang="postcss">
	button.component-wrapper {
		display: flex;
		flex-direction: column;
	}

	.primary-action {
		position: relative;
		border: 1px solid var(--color-gray-8);
		background: var(--color-gray-9);

		button {
			min-height: 3rem;
			height: 100%;
			width: 100%;
		}
		.overlay {
			position: absolute;
			inset: 0;
			height: 100%;
		}
		&.active,
		&:hover {
			.overlay {
				opacity: 0.95;
			}
		}
	}

	.component-wrapper {
		position: relative;
		/* box-shadow: var(--primo-box-shadow); */
		overflow: hidden;
		/* content-visibility: auto; breaking the sidebar */
		color: var(--primo-color-white);
		/* border: 1px solid var(--color-gray-9); */
		display: grid;

		.overlay {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			background: var(--color-gray-8);
			z-index: 1;
			opacity: 0;
			transition: 0.1s opacity;

			svg {
				margin-right: 0.5rem;
			}
		}

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: var(--color-gray-8);
			padding: 0.5rem;

			:global(svg) {
				width: 1rem;
			}

			.component-label {
				display: flex;
				align-items: center;
				flex: 1;
				padding-left: 0.5rem;

				span {
					font-weight: 700;
					font-size: 0.75rem;
				}
			}
		}
	}
</style>
