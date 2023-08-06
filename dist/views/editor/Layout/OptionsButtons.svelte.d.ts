/** @typedef {typeof __propDef.props}  OptionsButtonsProps */
/** @typedef {typeof __propDef.events}  OptionsButtonsEvents */
/** @typedef {typeof __propDef.slots}  OptionsButtonsSlots */
export default class OptionsButtons extends SvelteComponentTyped<{
    deletable?: boolean;
}, {
    convert: CustomEvent<any>;
    select: CustomEvent<any>;
    delete: CustomEvent<any>;
    remove: CustomEvent<any>;
    mount: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type OptionsButtonsProps = typeof __propDef.props;
export type OptionsButtonsEvents = typeof __propDef.events;
export type OptionsButtonsSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        deletable?: boolean;
    };
    events: {
        convert: CustomEvent<any>;
        select: CustomEvent<any>;
        delete: CustomEvent<any>;
        remove: CustomEvent<any>;
        mount: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
