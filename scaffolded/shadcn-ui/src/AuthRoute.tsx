import { useUser } from '@/api/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setUser } from '@/store/user-slice';
import { LoadingScreen } from '@/components/app/LoadingScreen';
import { ROUTE_PATHS } from '@/config/routes';

type AuthRouteProps = Readonly<{
    children: React.ReactNode;
}>;

/**
 * Protected route wrapper that ensures user is authenticated.
 * Assumes user data is already cached from InitialAuthCheck.
 */
export function AuthRoute({ children }: AuthRouteProps) {
    const { data: user, isLoading, isError, isSuccess } = useUser();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess && user) {
            dispatch(setUser(user));
        }
    }, [isSuccess, user, dispatch]);

    // Show loading while checking user status
    if (isLoading) {
        return <LoadingScreen />;
    }

    // If no user or error, redirect to onboarding
    if (isError || !user || !isSuccess) {
        return <Navigate to={ROUTE_PATHS.ONBOARDING} replace />;
    }

    return <>{children}</>;
}
