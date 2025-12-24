import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton as SkeletonBase } from '@/components/ui/skeleton';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
    loading: boolean;
    children: React.ReactNode;
};

export default function Skeleton({ loading, children, className, ...props }: SkeletonProps) {
    return (
        <div className="relative inline-block" {...props}>
            {/* Render children (invisible when loading) so the container keeps its size */}
            <div className={cn(loading ? 'invisible' : 'visible', 'w-full h-full')}>{children}</div>
            {/* Overlay animated skeleton if loading */}
            {loading && <SkeletonBase className={cn('absolute inset-0', className)} />}
        </div>
    );
}
