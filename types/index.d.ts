interface SidebarGroup {
    text: string;
    items: SidebarItem[];
    collapsible?: boolean;
    collapsed?: boolean;
}
interface SidebarItem {
    text: string;
    link: string;
}
/**
 * Returns `sidebar` configuration for VitePress calculated using structrue of directory and files in given path.
 * @param   {String}    rootDir   - Directory to get configuration for.
 */
export declare const getSideBar: (rootDir?: string) => SidebarGroup[];
export {};
