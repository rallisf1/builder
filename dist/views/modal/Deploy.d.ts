export function push_site({ repo_name, create_new }: {
    repo_name: any;
    create_new?: boolean;
}): Promise<void>;
export function buildSiteBundle({ pages }: {
    pages: any;
}): Promise<any[]>;
