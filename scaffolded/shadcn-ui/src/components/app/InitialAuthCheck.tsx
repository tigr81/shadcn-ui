import { useUser } from '@/api/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setUser } from '@/store/auth-slice';
import { LoadingScreen } from './LoadingScreen';
import { ROUTE_PATHS } from '@/config/routes';

/**
 * Component that checks user authentication status on app mount.
 * Redirects to appropriate route based on user status.
 */
export function InitialAuthCheck() {
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

    // If user exists and is successfully loaded, redirect to home
    if (isSuccess && user) {
        return <Navigate to={ROUTE_PATHS.HOME} replace />;
    }

    // If no user or error, redirect to onboarding
    if (isError || !user) {
        return <Navigate to={ROUTE_PATHS.ONBOARDING} replace />;
    }

    // Fallback to onboarding
    return <Navigate to={ROUTE_PATHS.ONBOARDING} replace />;
}
