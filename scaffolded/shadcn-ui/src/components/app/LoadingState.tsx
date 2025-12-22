import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui-system';

type LoadingStateProps = {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
    className?: string;
    children?: ReactNode;
};

/**
 * Loading state component with spinner
 */
export function LoadingState({
    message = 'Loading...',
    size = 'md',
    fullScreen = false,
    className,
    children,
}: LoadingStateProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    const content = (
        <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
            <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
            {message && (
                <Typography variant="p" className="text-muted-foreground">
                    {message}
                </Typography>
            )}
            {children}
        </div>
    );

    if (fullScreen) {
        return <div className="flex min-h-screen items-center justify-center p-4">{content}</div>;
    }

    return content;
}

/**
 * Skeleton loading component for content placeholders
 */
export function SkeletonLoader({ className, count = 1 }: { className?: string; count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={cn('animate-pulse rounded-md bg-muted', className)}
                    aria-label="Loading..."
                />
            ))}
        </>
    );
}

/**
 * Inline loading spinner
 */
export function InlineLoader({
    size = 'sm',
    className,
}: {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
    };

    return (
        <Loader2
            className={cn('animate-spin text-primary', sizeClasses[size], className)}
            aria-label="Loading"
        />
    );
}
