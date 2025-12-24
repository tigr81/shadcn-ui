import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { Link, useMatch } from 'react-router-dom';
import { Typography } from '@/components/ui-system';
import { NavItem } from '@/config/routes';

type TNavMainProps = Readonly<{
    items: NavItem[];
}>;

const NavMainItem = ({ item }: { item: NavItem }) => {
    const match = useMatch(`${item.path}/*`);
    const isActive = !!match;
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                data-active={isActive}
                data-disabled={item.disabled}
                tooltip={item.title}
                className="data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
                <Link
                    to={item.path}
                    className={cn(
                      "flex items-center justify-between gap-2 w-full px-2 py-1.5 text-sm",
                      item.external && "underline"
                    )}
                    {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                    {item.icon && (
                        <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4 shrink-0" />
                            <Typography className='truncate text-medium'>{item.title}</Typography>
                        </div>
                    )}
                    {!item.icon && <span>{item.title}</span>}
                    {item.external && <ExternalLink className="h-4 w-4 shrink-0" />}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

export default function NavMain({ items }: TNavMainProps) {
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <NavMainItem key={item.title} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
