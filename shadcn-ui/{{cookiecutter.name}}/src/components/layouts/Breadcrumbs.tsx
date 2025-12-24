import { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getNavItemByPath, ROUTE_PATHS, matchRoute } from '@/config/routes';
import { Home } from 'lucide-react';

type BreadcrumbItemData = {
    title: string;
    path: string;
};

/**
 * Formats a segment into a readable title
 */
function formatSegmentTitle(segment: string): string {
    return segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Generates breadcrumbs from the current route path
 */
export function Breadcrumbs() {
    const location = useLocation();
    const pathname = location.pathname;

    const breadcrumbs = useMemo(() => {
        const segments = pathname.split('/').filter(Boolean);
        const items: BreadcrumbItemData[] = [];

        // Always include Home as the first breadcrumb
        items.push({
            title: 'Home',
            path: ROUTE_PATHS.HOME,
        });

        // Build path segments incrementally
        let currentPath = '';
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            currentPath += `/${segment}`;

            // First, try to find an exact nav item match
            const navItem = getNavItemByPath(currentPath);

            if (navItem) {
                items.push({
                    title: navItem.title,
                    path: navItem.path,
                });
                continue;
            }

            // If no exact match, check if this matches a dynamic route pattern
            const matchedRoute = matchRoute(currentPath);

            if (matchedRoute) {
                // Extract the parent path from the matched route
                // e.g., /chatbot/:conversationId -> /chatbot
                const routeSegments = matchedRoute.path.split('/').filter(Boolean);
                const parentSegments = routeSegments.slice(0, -1);
                const parentPath = parentSegments.length > 0 ? `/${parentSegments.join('/')}` : '/';

                // Try to find a nav item for the parent path
                const parentNavItem = getNavItemByPath(parentPath);

                if (parentNavItem && i === segments.length - 1) {
                    // This is a dynamic route with a known parent
                    // Use the segment value (e.g., conversation ID) as the title
                    const dynamicValue = segment;
                    items.push({
                        title: dynamicValue,
                        path: currentPath,
                    });
                    continue;
                }
            }

            // If this is the last segment and we haven't matched anything,
            // use the segment as title (formatted)
            if (i === segments.length - 1) {
                items.push({
                    title: formatSegmentTitle(segment),
                    path: currentPath,
                });
            }
        }

        return items;
    }, [pathname]);

    // Don't show breadcrumbs on home or root page
    if (pathname === ROUTE_PATHS.HOME || pathname === ROUTE_PATHS.ROOT) {
        return null;
    }

    // Don't show breadcrumbs if we only have Home
    if (breadcrumbs.length <= 1) {
        return null;
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    const isFirst = index === 0;

                    return (
                        <div key={`${item.path}-${index}`} className="flex items-center">
                            {!isFirst && <BreadcrumbSeparator className="-ml-1 mr-1" />}
                            <BreadcrumbItem>
                                {isFirst ? (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            to={item.path}
                                            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                                        >
                                            <Home className="h-3.5 w-3.5" />
                                            <span className="sr-only">{item.title}</span>
                                        </Link>
                                    </BreadcrumbLink>
                                ) : isLast ? (
                                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            to={item.path}
                                            className="transition-colors hover:text-foreground"
                                        >
                                            {item.title}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
