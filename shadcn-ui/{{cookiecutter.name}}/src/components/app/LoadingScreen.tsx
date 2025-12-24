import { Skeleton } from '@/components/ui/skeleton';

export function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex flex-col gap-2 items-center">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    );
}
