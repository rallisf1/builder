/** @typedef {typeof __propDef.props}  ToolbarButtonProps */
/** @typedef {typeof __propDef.events}  ToolbarButtonEvents */
/** @typedef {typeof __propDef.slots}  ToolbarButtonSlots */
export default class ToolbarButton extends SvelteComponentTyped<{
    id?: any;
    title?: string;
    style?: string;
    key?: any;
    svg?: any;
    buttons?: any;
    icon?: any;
    label?: string;
    disabled?: boolean;
    onclick?: any;
    loading?: boolean;
    active?: boolean;
    type?: any;
}, {
    click: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type ToolbarButtonProps = typeof __propDef.props;
export type ToolbarButtonEvents = typeof __propDef.events;
export type ToolbarButtonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        id?: any;
        title?: string;
        style?: string;
        key?: any;
        svg?: any;
        buttons?: any;
        icon?: any;
        label?: string | null;
        disabled?: boolean;
        onclick?: any;
        loading?: boolean;
        active?: boolean;
        type?: any;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
