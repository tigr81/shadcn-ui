import { useMemo } from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import NavMain from './NavMain';
import NavUser from './NavUser';
import { AppLogoIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import packageJSON from '@/../package.json';
import { getNavItems, ROUTE_PATHS } from '@/config/routes';

export function AppSidebar() {
    const navItems = useMemo(() => {
        return getNavItems({ showInNav: true, enabledOnly: true });
    }, []);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            tooltip="APP_NAME"
                            asChild
                        >
                            <Link
                                to={ROUTE_PATHS.HOME}
                                className="flex items-center gap-2"
                                reloadDocument
                            >
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg p-1 text-sidebar-primary-foreground">
                                    <AppLogoIcon />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">APP_NAME</span>
                                    <div className="flex items-center gap-1">
                                        <span className="truncate text-xs text-sidebar-foreground/60 font-mono">
                                            v{packageJSON.version}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
