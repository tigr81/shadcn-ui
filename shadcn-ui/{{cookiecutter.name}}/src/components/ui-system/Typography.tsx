import React from 'react';
import { cn } from '@/lib/utils';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'note';

type TypographyProps = Readonly<{
    variant?: TypographyVariant;
    children: React.ReactNode;
    className?: string;
}>;

const defaultTypographyStyles: Record<TypographyVariant, string> = {
    h1: 'font-medium text-4xl font-sans',
    h2: 'font-regular text-3xl font-sans',
    h3: 'font-regular text-2xl font-sans',
    h4: 'font-regular text-xl font-sans',
    p: 'font-regular text-base font-sans',
    note: 'font-regular text-base font-mono',
};

const variantElements: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    p: 'p',
    note: 'small',
};

export default function Typography({ variant = 'p', children, className = '' }: TypographyProps) {
    const Component = variantElements[variant];

    return (
        <Component className={cn(defaultTypographyStyles[variant], className)}>
            {children}
        </Component>
    );
}
