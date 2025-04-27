import { Archive, Columns, Flag, Github, Monitor, PanelLeft, Settings, Users } from "lucide-react";

export const DASHBOARD_SIDEBAR_HEADER_MENU = [
    {
        id: 'join_or_create_team',
        label: 'Join or create team',
        icon: Users,
        path: '/teams/create'
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        path: '/settings'
    },
];

export const DASHBOARD_SIDEBAR_FOOTER_ITEMS = [
    {
        id: 'archive',
        label: 'Archives',
        icon: Archive,
        path: '/archive'
    },
];

export const LAYOUT_MODES = {
    EDITOR: 'editor',
    BOTH: 'both',
    CANVAS: 'canvas'
}
