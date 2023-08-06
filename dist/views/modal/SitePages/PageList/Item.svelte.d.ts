/** @typedef {typeof __propDef.props}  ItemProps */
/** @typedef {typeof __propDef.events}  ItemEvents */
/** @typedef {typeof __propDef.slots}  ItemSlots */
export default class Item extends SvelteComponentTyped<{
    page: any;
    active: any;
    parent?: any;
    children?: any[];
    at_root_level?: boolean;
    parent_urls?: string[];
}, {
    delete: CustomEvent<any>;
    create: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ItemProps = typeof __propDef.props;
export type ItemEvents = typeof __propDef.events;
export type ItemSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        page: any;
        active: any;
        parent?: import('../../../..').Page | null;
        children?: any[];
        at_root_level?: boolean;
        parent_urls?: string[];
    };
    events: {
        delete: CustomEvent<any>;
        create: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
