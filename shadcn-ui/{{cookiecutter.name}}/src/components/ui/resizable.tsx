import * as React from 'react';
import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
    type PanelProps,
    type PanelGroupProps,
} from 'react-resizable-panels';

import { cn } from '@/lib/utils';

const ResizablePanelGroup = ({ className, ...props }: PanelGroupProps) => (
    <PanelGroup
        className={cn(
            'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
            className
        )}
        {...props}
    />
);

const ResizablePanel = ({ className, ...props }: PanelProps) => (
    <Panel
        className={cn(
            'data-[panel-group-direction=vertical]:data-[state=collapsed]:min-h-0',
            className
        )}
        {...props}
    />
);

const ResizableHandle = ({
    withHandle,
    className,
    ...props
}: {
    withHandle?: boolean;
    className?: string;
} & React.ComponentPropsWithoutRef<typeof PanelResizeHandle>) => (
    <PanelResizeHandle
        className={cn(
            'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
            className
        )}
        {...props}
    >
        {withHandle && (
            <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
            </div>
        )}
    </PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
