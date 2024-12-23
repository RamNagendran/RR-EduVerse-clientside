export interface MenuItem {
    path: string;
    label: string;
    icon: React.ComponentType<{ stroke: string }>;
}
export interface Iuser {
    user_id: string;
    email: string;
    phone: number;
    username: string;
    firstname: string;
    lastname: string;
    role_id: number;
    status: string;
}

export interface UserDrawerProps {
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    user: Iuser;
}