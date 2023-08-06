/** @typedef {typeof __propDef.props}  BlockButtonsProps */
/** @typedef {typeof __propDef.events}  BlockButtonsEvents */
/** @typedef {typeof __propDef.slots}  BlockButtonsSlots */
export default class BlockButtons extends SvelteComponentTyped<{
    i: any;
    node?: any;
}, {
    'edit-content': CustomEvent<any>;
    'edit-code': CustomEvent<any>;
    delete: CustomEvent<any>;
    duplicate: CustomEvent<any>;
    moveUp: CustomEvent<any>;
    moveDown: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type BlockButtonsProps = typeof __propDef.props;
export type BlockButtonsEvents = typeof __propDef.events;
export type BlockButtonsSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        i: any;
        node?: any;
    };
    events: {
        'edit-content': CustomEvent<any>;
        'edit-code': CustomEvent<any>;
        delete: CustomEvent<any>;
        duplicate: CustomEvent<any>;
        moveUp: CustomEvent<any>;
        moveDown: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
