import * as React from 'react';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/**
 * Common form field props
 */
export interface BaseFormFieldProps<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    description?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

/**
 * Text input form field component
 */
export function FormTextField<TFieldValues extends FieldValues>({
    form,
    name,
    label,
    description,
    placeholder,
    className,
    disabled,
}: Readonly<BaseFormFieldProps<TFieldValues>>) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input placeholder={placeholder} disabled={disabled} {...field} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

/**
 * Generic form field wrapper for custom components
 */
export function FormFieldWrapper<TFieldValues extends FieldValues>({
    form,
    name,
    label,
    description,
    className,
    children,
}: Readonly<
    BaseFormFieldProps<TFieldValues> & {
        children: (field: {
            value: unknown;
            onChange: (value: unknown) => void;
            onBlur: () => void;
            name: string;
            ref: React.Ref<unknown>;
        }) => React.ReactNode;
    }
>) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>{children(field)}</FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

/**
 * Form submit button component with loading state
 */
export interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
}

export const FormSubmitButton = React.forwardRef<HTMLButtonElement, FormSubmitButtonProps>(
    ({ isLoading, loadingText = 'Loading...', children, disabled, className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="submit"
                disabled={disabled || isLoading}
                className={cn(className)}
                {...props}
            >
                {isLoading ? loadingText : children}
            </button>
        );
    }
);
FormSubmitButton.displayName = 'FormSubmitButton';
