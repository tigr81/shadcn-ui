import React from 'react';
import { cn } from '@/lib/utils';

export const AppLogoIcon = React.forwardRef<
    HTMLImageElement,
    React.HTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => {
    return (
        <img
            ref={ref}
            src="/logo_icon.svg"
            className={cn('w-6 h-6', className)}
            alt="{{cookiecutter.app_name}} Logo Icon"
            {...props}
        />
    );
});

AppLogoIcon.displayName = 'AppLogoIcon';

export default AppLogoIcon;
