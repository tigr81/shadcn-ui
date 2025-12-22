import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from '@/components/ui/command';
import { NAV_ITEMS, ROUTE_PATHS } from '@/config/routes';
import { Home, Settings } from 'lucide-react';

interface CommandPaletteProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

/**
 * Global command palette component with cmd+k shortcut
 * Provides quick navigation and actions
 */
export function CommandPalette({ open: controlledOpen, onOpenChange }: CommandPaletteProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : open;

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                if (isControlled && onOpenChange) {
                    onOpenChange(!isOpen);
                } else {
                    setOpen((prev) => !prev);
                }
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [isControlled, isOpen, onOpenChange]);

    const handleSelect = (path: string) => {
        navigate(path);
        if (isControlled && onOpenChange) {
            onOpenChange(false);
        } else {
            setOpen(false);
        }
    };

    const navigationItems = NAV_ITEMS.filter((item) => item.showInNav !== false);

    const handleOpenChange = (open: boolean) => {
        if (isControlled && onOpenChange) {
            onOpenChange(open);
        } else {
            setOpen(open);
        }
    };

    return (
        <CommandDialog open={isOpen} onOpenChange={handleOpenChange}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <CommandItem key={item.path} onSelect={() => handleSelect(item.path)}>
                                <Icon className="mr-2 h-4 w-4" />
                                <span>{item.title}</span>
                                <CommandShortcut>⌘{item.path}</CommandShortcut>
                            </CommandItem>
                        );
                    })}
                </CommandGroup>
                <CommandGroup heading="Quick Actions">
                    <CommandItem onSelect={() => handleSelect(ROUTE_PATHS.HOME)}>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Go to Home</span>
                    </CommandItem>
                    <CommandItem onSelect={() => handleSelect(ROUTE_PATHS.SETTINGS)}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Open Settings</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}

/**
 * Hook to use command palette programmatically
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useCommandPalette() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return { open, setOpen };
}
