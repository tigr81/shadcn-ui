import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from '@/components/layouts/Layout';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { AuthRoute } from '@/AuthRoute';
import { InitialAuthCheck } from '@/components/app/InitialAuthCheck';
import { OnboardingGuard } from '@/components/app/OnboardingGuard';
import { ROUTES, ROUTE_PATHS } from '@/config/routes';

const routes = [
    // Root route: check user status and redirect accordingly
    {
        path: ROUTE_PATHS.ROOT,
        element: <InitialAuthCheck />,
    },
    // Onboarding route: protected from authenticated users
    {
        path: ROUTE_PATHS.ONBOARDING,
        element: (
            <OnboardingGuard>
                <OnboardingPage />
            </OnboardingGuard>
        ),
    },
    // Protected routes: require authentication
    {
        element: (
            <AuthRoute>
                <Layout />
            </AuthRoute>
        ),
        children: ROUTES.map((route) => ({
            key: route.path,
            path: route.path,
            element: <route.component />,
        })),
    },
    // Catch all: redirect to root which will handle auth check
    {
        path: '*',
        element: <Navigate to={ROUTE_PATHS.ROOT} replace />,
    },
];

const router = createBrowserRouter(routes);

export default function Routers() {
    return (
        <RouterProvider router={router} />
    );
}
