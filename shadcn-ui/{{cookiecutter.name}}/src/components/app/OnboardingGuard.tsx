import { useUser } from '@/api/api';
import { Navigate } from 'react-router-dom';
import { LoadingScreen } from './LoadingScreen';
import { ROUTE_PATHS } from '@/config/routes';

type OnboardingGuardProps = Readonly<{
    children: React.ReactNode;
}>;

/**
 * Guard component that prevents authenticated users from accessing onboarding.
 * If user has completed onboarding, redirects to home page.
 */
export function OnboardingGuard({ children }: OnboardingGuardProps) {
    const { data: user, isLoading, isSuccess } = useUser();

    // Show loading while checking user status
    if (isLoading) {
        return <LoadingScreen />;
    }

    // If user exists and is successfully loaded, they've already completed onboarding
    // Redirect them to home page
    if (isSuccess && user) {
        return <Navigate to={ROUTE_PATHS.HOME} replace />;
    }

    // If no user or error, allow access to onboarding page
    return <>{children}</>;
}
