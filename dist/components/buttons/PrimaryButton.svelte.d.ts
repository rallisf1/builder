/** @typedef {typeof __propDef.props}  PrimaryButtonProps */
/** @typedef {typeof __propDef.events}  PrimaryButtonEvents */
/** @typedef {typeof __propDef.slots}  PrimaryButtonSlots */
export default class PrimaryButton extends SvelteComponentTyped<{
    id?: string;
    icon?: any;
    label?: string;
    disabled?: boolean;
    type?: string;
    variants?: string;
}, {
    click: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type PrimaryButtonProps = typeof __propDef.props;
export type PrimaryButtonEvents = typeof __propDef.events;
export type PrimaryButtonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        id?: string | null;
        icon?: any;
        label?: string;
        disabled?: boolean;
        type?: string;
        variants?: string;
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
