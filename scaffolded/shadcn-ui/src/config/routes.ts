import { LucideIcon, Home, FileText, Database, Settings, Package, LayoutDashboard } from 'lucide-react';
import { ComponentType } from 'react';
import HomePage from '@/pages/HomePage';
import FormPage from '@/pages/FormPage';
import CRUDPage from '@/pages/CRUDPage';
import SettingsPage from '@/pages/SettingsPage';
import ComponentsPage from '@/pages/ComponentsPage';
import DashboardPage from '@/pages/DashboardPage';

/**
 * ============================================================================
 * ROUTE CONFIGURATION SYSTEM - SINGLE SOURCE OF TRUTH
 * ============================================================================
 *
 * This file implements a best-practice route configuration pattern where:
 * 1. Each route is defined ONCE in APP_ROUTES with all its metadata
 * 2. ROUTE_PATHS, NAV_ITEMS, and ROUTES are automatically derived
 * 3. Type-safe path builders for dynamic routes
 *
 * HOW TO ADD A NEW ROUTE:
 *
 * 1. Add a route config to APP_ROUTES:
 *    {
 *        id: 'MY_ROUTE',
 *        path: '/my-route',
 *        component: MyRoutePage,
 *        title: 'My Route',
 *        icon: MyIcon,
 *        showInNav: true,
 *        requiresAuth: true,
 *        requiresOnboarding: true,
 *    }
 *
 * 2. That's it! The route is now available as:
 *    - ROUTE_PATHS.MY_ROUTE (for navigation)
 *    - Automatically included in NAV_ITEMS (if showInNav: true)
 *    - Automatically included in ROUTES (for React Router)
 *
 * HOW TO ADD A DYNAMIC ROUTE:
 *
 * {
 *     id: 'USER_DETAIL',
 *     path: '/users/:userId',
 *     component: UserDetailPage,
 *     title: 'User Details',
 *     showInNav: false,
 *     requiresAuth: true,
 *     buildPath: (params) => `/users/${params.userId}`,
 * }
 *
 * ============================================================================
 */

/**
 * Route parameter definitions for type-safe path building
 */
export type RouteParams = {
    [key: string]: string | number;
};

/**
 * Complete route configuration
 */
export type RouteConfig = {
    /** Unique route identifier (used as key in ROUTE_PATHS) */
    id: string;
    /** Route path pattern (supports :param for dynamic routes) */
    path: string;
    /** React component to render */
    component: ComponentType;
    /** Display title for navigation */
    title?: string;
    /** Icon component from lucide-react (for navigation) */
    icon?: LucideIcon;
    /** Whether this item should be shown in navigation */
    showInNav?: boolean;
    /** Whether this route requires authentication */
    requiresAuth?: boolean;
    /** Whether this route requires onboarding completion */
    requiresOnboarding?: boolean;
    /** Whether the route is external */
    external?: boolean;
    /** Whether the route is disabled */
    disabled?: boolean;
    /** Route-specific metadata */
    meta?: Record<string, unknown>;
    /** Type-safe path builder function (for dynamic routes) */
    buildPath?: (params: RouteParams) => string;
};

/**
 * System routes (not in main navigation, but needed for routing)
 */
const SYSTEM_ROUTES: RouteConfig[] = [
    {
        id: 'ROOT',
        path: '/',
        component: () => null, // Handled separately in Routers.tsx
        requiresAuth: false,
        requiresOnboarding: false,
    },
    {
        id: 'ONBOARDING',
        path: '/onboarding',
        component: () => null, // Handled separately in Routers.tsx
        requiresAuth: false,
        requiresOnboarding: false,
    },
];

/**
 * Application routes - SINGLE SOURCE OF TRUTH
 * Add new routes here. Everything else is automatically derived.
 */
const APP_ROUTES: RouteConfig[] = [
    {
        id: 'HOME',
        path: '/home',
        component: HomePage,
        title: 'Home',
        icon: Home,
        showInNav: true,
        requiresAuth: true,
        requiresOnboarding: true,
    },
    {
        id: 'FORM',
        path: '/form',
        component: FormPage,
        title: 'Forms',
        icon: FileText,
        showInNav: true,
        requiresAuth: true,
        requiresOnboarding: true,
    },
    {
        id: 'CRUD',
        path: '/crud',
        component: CRUDPage,
        title: 'CRUD API',
        icon: Database,
        showInNav: true,
        requiresAuth: true,
        requiresOnboarding: true,
    },
    {
        id: 'SETTINGS',
        path: '/settings',
        component: SettingsPage,
        title: 'Settings',
        icon: Settings,
        showInNav: false,
        requiresAuth: true,
        requiresOnboarding: true,
    },
    {
        id: 'COMPONENTS',
        path: '/components',
        component: ComponentsPage,
        title: 'Components',
        icon: Package,
        showInNav: true,
        requiresAuth: true,
        requiresOnboarding: true,
    },
    {
        id: 'DASHBOARD',
        path: '/dashboard',
        component: DashboardPage,
        title: 'Dashboard',
        icon: LayoutDashboard,
        showInNav: true,
        requiresAuth: true,
        requiresOnboarding: true,
    },
    // {
    //     id: 'ABOUT',
    //     path: '/about',
    //     component: AboutPage, // Import and use actual component
    //     title: 'About',
    //     icon: Info,
    //     showInNav: true,
    //     requiresAuth: false,
    //     requiresOnboarding: false,
    // },
    // Example: Dynamic route with type-safe path builder
    // {
    //     id: 'USER_DETAIL',
    //     path: '/users/:userId',
    //     component: UserDetailPage,
    //     title: 'User Details',
    //     showInNav: false,
    //     requiresAuth: true,
    //     requiresOnboarding: true,
    //     buildPath: (params) => `/users/${params.userId}`,
    // },
    // Example: Nested dynamic route
    // {
    //     id: 'CHATBOT_CONVERSATION',
    //     path: '/chatbot/:conversationId',
    //     component: ChatbotPage,
    //     title: 'Chatbot',
    //     showInNav: true,
    //     requiresAuth: true,
    //     requiresOnboarding: true,
    //     buildPath: (params) => `/chatbot/${params.conversationId}`,
    // },
];

/**
 * All routes combined
 */
const ALL_ROUTES: RouteConfig[] = [...SYSTEM_ROUTES, ...APP_ROUTES];

/**
 * ============================================================================
 * DERIVED EXPORTS - Automatically generated from route configurations above
 * ============================================================================
 */

/**
 * Route paths as constants - automatically derived from route configs
 * Usage: ROUTE_PATHS.HOME, ROUTE_PATHS.USER_DETAIL, etc.
 */
export const ROUTE_PATHS = ALL_ROUTES.reduce(
    (acc, route) => {
        acc[route.id] = route.path;
        return acc;
    },
    {} as Record<string, string>
) as {
    [K in (typeof ALL_ROUTES)[number]['id']]: (typeof ALL_ROUTES)[number]['path'];
};

/**
 * Navigation item definition for sidebar/main navigation
 */
export type NavItem = {
    /** Display title for the navigation item */
    title: string;
    /** Route path */
    path: string;
    /** Icon component from lucide-react */
    icon: LucideIcon;
    /** Whether this item should be shown in navigation */
    showInNav?: boolean;
    /** Whether this route requires authentication */
    requiresAuth?: boolean;
    /** Whether this route requires onboarding completion */
    requiresOnboarding?: boolean;
    /** Whether the route is external */
    external?: boolean;
    /** Whether the route is disabled */
    disabled?: boolean;
};

/**
 * Navigation items - automatically derived from route configs
 */
export const NAV_ITEMS: NavItem[] = APP_ROUTES.filter((route) => route.title && route.icon).map(
    (route) => ({
        title: route.title!,
        path: route.path,
        icon: route.icon!,
        showInNav: route.showInNav,
        requiresAuth: route.requiresAuth,
        requiresOnboarding: route.requiresOnboarding,
        external: route.external,
        disabled: route.disabled,
    })
);

/**
 * Route definition for React Router
 */
export type RouteDefinition = {
    /** Route path */
    path: string;
    /** React component to render */
    component: ComponentType;
    /** Whether this route requires authentication */
    requiresAuth?: boolean;
    /** Whether this route requires onboarding completion */
    requiresOnboarding?: boolean;
    /** Route-specific metadata */
    meta?: Record<string, unknown>;
};

/**
 * Route definitions for React Router - automatically derived from route configs
 */
export const ROUTES: RouteDefinition[] = APP_ROUTES.map((route) => ({
    path: route.path,
    component: route.component,
    requiresAuth: route.requiresAuth,
    requiresOnboarding: route.requiresOnboarding,
    meta: route.meta,
}));

/**
 * ============================================================================
 * HELPER FUNCTIONS
 * ============================================================================
 */

/**
 * Get navigation items filtered by criteria
 */
export function getNavItems(options?: {
    /** Only return items shown in navigation */
    showInNav?: boolean;
    /** Only return enabled items */
    enabledOnly?: boolean;
    /** Only return items requiring auth */
    requiresAuth?: boolean;
}): NavItem[] {
    let items = NAV_ITEMS;

    if (options?.showInNav) {
        items = items.filter((item) => item.showInNav !== false);
    }
    if (options?.enabledOnly) {
        items = items.filter((item) => item.disabled !== true);
    }
    if (options?.requiresAuth) {
        items = items.filter((item) => item.requiresAuth !== false);
    }

    return items;
}

/**
 * Get a navigation item by path
 */
export function getNavItemByPath(path: string): NavItem | undefined {
    return NAV_ITEMS.find((item) => item.path === path);
}

/**
 * Get a route configuration by ID
 */
export function getRouteById(id: string): RouteConfig | undefined {
    return ALL_ROUTES.find((route) => route.id === id);
}

/**
 * Get a route configuration by path
 */
export function getRouteByPath(path: string): RouteConfig | undefined {
    return ALL_ROUTES.find((route) => route.path === path);
}

/**
 * Check if a path matches a route pattern (supports dynamic routes)
 */
export function matchRoute(path: string): RouteConfig | undefined {
    const pathSegments = path.split('/').filter(Boolean);

    return ALL_ROUTES.find((route) => {
        const routeSegments = route.path.split('/').filter(Boolean);

        if (routeSegments.length !== pathSegments.length) return false;

        return routeSegments.every((routeSegment, index) => {
            const pathSegment = pathSegments[index];
            // Match dynamic segments (e.g., :userId, :conversationId)
            return routeSegment.startsWith(':') || routeSegment === pathSegment;
        });
    });
}
