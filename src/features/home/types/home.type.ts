export interface MenuItem {
    path: string;
    label: string;
    icon: React.ComponentType<{ stroke: string }>;
}