import { ReactNode } from 'react';
import { Typography } from '@/components/ui-system';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Inbox, FileX, Search, AlertCircle } from 'lucide-react';

type EmptyStateProps = Readonly<{
    imageSrc?: string;
    message?: ReactNode | null;
    title?: ReactNode;
    children?: ReactNode;
    className?: string;
    imageClassName?: string;
    hideImage?: boolean;
    icon?: ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    variant?: 'default' | 'search' | 'error' | 'file';
}>;

const defaultIcons = {
    default: Inbox,
    search: Search,
    error: AlertCircle,
    file: FileX,
};

export function EmptyState({
    imageSrc,
    message,
    title,
    children,
    className = '',
    imageClassName = 'w-40',
    hideImage = false,
    icon,
    action,
    variant = 'default',
}: EmptyStateProps) {
    const IconComponent = !icon && !imageSrc ? defaultIcons[variant] : null;

    return (
        <div
            className={cn('flex flex-col justify-center items-center gap-4 px-6 py-10', className)}
        >
            {!hideImage && (
                <>
                    {imageSrc && (
                        <img
                            src={imageSrc}
                            className={imageClassName}
                            alt="Empty state illustration"
                        />
                    )}
                    {!imageSrc && IconComponent && (
                        <IconComponent className={cn('text-muted-foreground', imageClassName)} />
                    )}
                    {!imageSrc && icon && <div className={imageClassName}>{icon}</div>}
                </>
            )}
            {title && (
                <Typography variant="h3" className="text-center">
                    {title}
                </Typography>
            )}
            {message && (
                <Typography variant="p" className="text-muted-foreground text-center max-w-md">
                    {message}
                </Typography>
            )}
            {action && (
                <Button onClick={action.onClick} variant="default">
                    {action.label}
                </Button>
            )}
            {children}
        </div>
    );
}
