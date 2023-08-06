export function deploy_subscribe(fn: any): void;
export function deploy_unsubscribe(): void;
/**
 * Runs when deploying the site
 * @param {{
 *  [files]: obj,
 *  site_id: string,
 *  repo_name: string,
 *  create_new?: boolean,
 * }} payload - The data that changed
 */
export function deploy(payload: {
    [files]: obj;
    site_id: string;
    repo_name: string;
    create_new?: boolean;
}): Promise<void>;
