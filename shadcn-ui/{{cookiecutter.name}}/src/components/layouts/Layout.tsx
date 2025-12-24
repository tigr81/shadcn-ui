import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layouts/AppSidebar';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { ThemeSwitcher } from '@/components/theme';
import { CommandPalette } from '@/components/app/CommandPalette';

export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            {/* Make main a flex column that fills the screen and controls scrolling */}
            <main className="flex h-screen w-screen overflow-hidden flex-col">
                {/* Sticky top bar that does not scroll with content */}
                <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex h-12 items-center gap-2 px-4">
                        <SidebarTrigger className="m-0 -ml-2" />
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex-1">
                            <Breadcrumbs />
                        </div>
                        <ThemeSwitcher />
                    </div>
                </header>
                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="container mx-auto py-6 px-4">
                        <Outlet />
                    </div>
                </div>
            </main>
            {/* Global Command Palette - available via Cmd+K / Ctrl+K */}
            <CommandPalette />
        </SidebarProvider>
    );
}
