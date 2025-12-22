import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value?: number;
    indicatorClassName?: ClassValue;
    indeterminate?: boolean;
};

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
    (
        {
            className,
            value,
            indicatorClassName = 'bg-accent-secondary',
            indeterminate = false,
            ...props
        },
        ref
    ) => (
        <ProgressPrimitive.Root
            ref={ref}
            className={cn(
                'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
                className
            )}
            {...props}
        >
            <ProgressPrimitive.Indicator
                className={cn(
                    'h-full w-full flex-1 transition-all',
                    indeterminate ? 'animate-progress origin-left' : '',
                    indicatorClassName
                )}
                style={!indeterminate ? { transform: `translateX(-${100 - (value ?? 0)}%)` } : {}}
            />
        </ProgressPrimitive.Root>
    )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
