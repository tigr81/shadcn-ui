import * as React from 'react';
import { UseFormReturn, FieldValues, DefaultValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button, ButtonProps } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormSubmitButton } from './form-utils';
import { cn } from '@/lib/utils';

export interface DialogFormProps<TFieldValues extends FieldValues = FieldValues> {
    /** The schema for form validation */
    schema: z.ZodType<TFieldValues>;
    /** Default values for the form */
    defaultValues?: DefaultValues<TFieldValues>;
    /** Title of the dialog */
    title: string;
    /** Description of the dialog */
    description?: string;
    /** Trigger button configuration */
    triggerButton?: {
        label: string;
        variant?: ButtonProps['variant'];
        size?: ButtonProps['size'];
        className?: string;
    };
    /** Custom trigger element (overrides triggerButton) */
    trigger?: React.ReactNode;
    /** Submit button label */
    submitLabel?: string;
    /** Loading state for submit button */
    isLoading?: boolean;
    /** Loading text for submit button */
    loadingText?: string;
    /** Callback when form is submitted */
    onSubmit: (values: TFieldValues) => Promise<void> | void;
    /** Callback when dialog is opened */
    onOpenChange?: (open: boolean) => void;
    /** Callback when form is successfully submitted (after onSubmit) */
    onSuccess?: (values: TFieldValues) => void;
    /** Custom form content */
    children: (form: UseFormReturn<TFieldValues>) => React.ReactNode;
    /** Additional dialog content props */
    dialogContentClassName?: string;
    /** Whether to close dialog on successful submit */
    closeOnSuccess?: boolean;
}

/**
 * Dialog form component that combines a dialog with a form
 * Includes a trigger button and handles form submission
 */
export function DialogForm<TFieldValues extends FieldValues = FieldValues>({
    schema,
    defaultValues,
    title,
    description,
    triggerButton,
    trigger,
    submitLabel = 'Submit',
    isLoading = false,
    loadingText = 'Submitting...',
    onSubmit,
    onOpenChange,
    onSuccess,
    children,
    dialogContentClassName,
    closeOnSuccess = true,
}: Readonly<DialogFormProps<TFieldValues>>) {
    const [open, setOpen] = React.useState(false);

    // Type assertion needed due to react-hook-form and zod type inference limitations
    const form = useForm<TFieldValues>({
        // @ts-expect-error - zodResolver type inference issue with generics
        resolver: zodResolver(schema),
        defaultValues,
    });

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            form.reset();
        }
        onOpenChange?.(newOpen);
    };

    const handleSubmit = async (values: TFieldValues) => {
        await onSubmit(values);
        onSuccess?.(values);
        if (closeOnSuccess) {
            handleOpenChange(false);
        }
    };

    const defaultTrigger = triggerButton ? (
        <Button
            variant={triggerButton.variant}
            size={triggerButton.size}
            className={triggerButton.className}
        >
            {triggerButton.label}
        </Button>
    ) : null;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
            <DialogContent className={cn('sm:max-w-[425px]', dialogContentClassName)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <Form {...form}>
                    {/* @ts-expect-error - Type inference issue with react-hook-form generics */}
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        {/* @ts-expect-error - Type inference issue with react-hook-form generics */}
                        {children(form)}
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleOpenChange(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <FormSubmitButton
                                isLoading={isLoading}
                                loadingText={loadingText}
                                className="min-w-[100px]"
                            >
                                {submitLabel}
                            </FormSubmitButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
