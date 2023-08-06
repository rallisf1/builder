/** @typedef {typeof __propDef.props}  BlockItemProps */
/** @typedef {typeof __propDef.events}  BlockItemEvents */
/** @typedef {typeof __propDef.slots}  BlockItemSlots */
export default class BlockItem extends SvelteComponentTyped<{
    symbol: any;
    name?: any;
    buttons?: any[];
    action?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type BlockItemProps = typeof __propDef.props;
export type BlockItemEvents = typeof __propDef.events;
export type BlockItemSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        symbol: any;
        name?: any;
        buttons?: any[];
        action?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
