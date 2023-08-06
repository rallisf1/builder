/** @typedef {typeof __propDef.props}  IconButtonProps */
/** @typedef {typeof __propDef.events}  IconButtonEvents */
/** @typedef {typeof __propDef.slots}  IconButtonSlots */
export default class IconButton extends SvelteComponentTyped<{
    size?: string;
    title?: any;
    style?: string;
    icon?: string;
    label?: any;
    disabled?: any;
    variants?: string;
}, {
    click: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type IconButtonProps = typeof __propDef.props;
export type IconButtonEvents = typeof __propDef.events;
export type IconButtonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        size?: string;
        title?: any;
        style?: string;
        icon?: string;
        label?: any;
        disabled?: any;
        variants?: string;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
