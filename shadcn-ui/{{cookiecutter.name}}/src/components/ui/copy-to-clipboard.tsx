import React, { useState } from 'react';
import { Copy, CheckCircle2, Clipboard } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from './button';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

// Clear separation of mode-specific styling
const copyButtonVariants = cva('', {
    variants: {
        iconPosition: {
            left: '',
            right: 'flex-row-reverse',
        },
    },
    defaultVariants: {
        iconPosition: 'right',
    },
});

// Button size variants for icon-only mode
const iconButtonSizeVariants = {
    sm: 'h-4 w-4 p-3', // Small button with padding
    md: '', // Default icon button size
};

// Define icon type options
type IconType = 'copy' | 'clipboard';

export interface CopyToClipboardProps extends Omit<ButtonProps, 'asChild'> {
    /** The text to be copied to clipboard */
    textToCopy: string | undefined | null;

    /** Display mode - 'icon' for icon-only or 'button' for text with icon */
    mode?: 'icon' | 'button';

    /** Icon position in button mode - 'left' or 'right' */
    iconPosition?: 'left' | 'right';

    /** Icon size - 'sm' (h-4 w-4) or 'md' (default size) */
    iconSize?: keyof typeof iconButtonSizeVariants;

    /** Icon type to use - 'copy' or 'clipboard' */
    iconType?: IconType;

    /** Duration in milliseconds to show the copied state */
    copiedStateDuration?: number;

    /** Custom tooltip text when copied */
    tooltipText?: string;

    /** Whether to show a tooltip when copied */
    showTooltip?: boolean;

    /** Custom text to display when not copied (only for button mode) */
    copyText?: string;

    /** Custom text to display when copied (only for button mode) */
    copiedText?: string;
}

export const CopyToClipboard = React.forwardRef<HTMLButtonElement, CopyToClipboardProps>(
    (
        {
            textToCopy,
            mode = 'button',
            size = 'default',
            iconPosition = 'right',
            variant = 'secondary',
            iconSize = 'md',
            iconType = 'copy',
            className,
            copiedStateDuration = 2000,
            tooltipText = 'Copiato!',
            showTooltip = true,
            copyText = 'Copia',
            copiedText = 'Copiato',
            ...props
        },
        ref
    ) => {
        const [isCopied, setIsCopied] = useState(false);
        const isEmpty = !textToCopy || textToCopy.trim() === '';

        const handleCopy = async () => {
            if (isEmpty) return;

            try {
                await navigator.clipboard.writeText(textToCopy || '');
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), copiedStateDuration);
            } catch (error) {
                console.error('Failed to copy text: ', error);
            }
        };

        // Icon component based on iconType and copied state
        const getIcon = () => {
            if (isCopied) return CheckCircle2;
            return iconType === 'clipboard' ? Clipboard : Copy;
        };

        const IconComponent = getIcon();

        // Render icon-only mode
        if (mode === 'icon') {
            const buttonSizeClass = iconButtonSizeVariants[iconSize];

            const iconButton = (
                <Button
                    ref={ref}
                    type="button"
                    size="icon"
                    variant={variant}
                    onClick={handleCopy}
                    disabled={isEmpty}
                    className={cn(buttonSizeClass, className)}
                    {...props}
                >
                    <IconComponent />
                </Button>
            );

            if (isCopied && showTooltip) {
                return (
                    <Tooltip open={true}>
                        <TooltipTrigger asChild>{iconButton}</TooltipTrigger>
                        <TooltipContent>{tooltipText}</TooltipContent>
                    </Tooltip>
                );
            }

            return iconButton;
        }

        // Render button mode
        const buttonClasses = copyButtonVariants({ iconPosition });

        const textButton = (
            <Button
                ref={ref}
                type="button"
                size={size}
                variant={variant}
                onClick={handleCopy}
                disabled={isEmpty}
                className={cn(buttonClasses, className)}
                {...props}
            >
                <IconComponent className="h-5 w-5" />
                <span>{isCopied ? copiedText : copyText}</span>
            </Button>
        );

        if (isCopied && showTooltip) {
            return (
                <Tooltip open={true}>
                    <TooltipTrigger asChild>{textButton}</TooltipTrigger>
                    <TooltipContent>{tooltipText}</TooltipContent>
                </Tooltip>
            );
        }

        return textButton;
    }
);

CopyToClipboard.displayName = 'CopyToClipboard';
