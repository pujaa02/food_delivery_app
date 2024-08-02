export interface Props {
    show: boolean
    onHide: () => void
}

export interface SidebarProps {
    onNavigate: (path: string) => void;
}