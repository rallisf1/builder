/** @typedef {typeof __propDef.props}  CopyButtonProps */
/** @typedef {typeof __propDef.events}  CopyButtonEvents */
/** @typedef {typeof __propDef.slots}  CopyButtonSlots */
export default class CopyButton extends SvelteComponentTyped<{
    icon: any;
    active?: boolean;
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CopyButtonProps = typeof __propDef.props;
export type CopyButtonEvents = typeof __propDef.events;
export type CopyButtonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        icon: any;
        active?: boolean;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
