/**
 * Example usage of the form utilities
 *
 * This file demonstrates how to use:
 * 1. useMakeApi hook for API mutations with toast notifications
 * 2. DialogForm component for forms in dialogs
 * 3. FormTextField and other form utilities
 */

import { z } from 'zod';
import { DialogForm, FormTextField } from './index';
import { useMakeApi } from '@/api/api';

// Example 1: Using DialogForm with useMakeApi
const createTagSchema = z.object({
    label: z.string().min(1, 'Label is required'),
    description: z.string().optional(),
});

type CreateTagForm = z.infer<typeof createTagSchema>;

export function CreateTagDialogForm() {
    // Use the makeApi hook with toast notifications
    const { mutateAsync, isLoading } = useMakeApi(
        (data: CreateTagForm) => Promise.resolve({ label: data.label }),
        {
            successMessage: (data: { label: string }) => `Tag "${data.label}" created successfully`,
            errorMessage: 'Failed to create tag',
            invalidateQueries: [['tags']],
        }
    );

    return (
        <DialogForm<CreateTagForm>
            schema={createTagSchema}
            defaultValues={{
                label: '',
                description: '',
            }}
            title="Create New Tag"
            description="Add a new tag to organize your meetings"
            triggerButton={{
                label: 'Create Tag',
                variant: 'default',
            }}
            submitLabel="Create"
            isLoading={isLoading}
            onSubmit={async (values) => {
                await mutateAsync(values);
            }}
        >
            {(form) => (
                <>
                    <FormTextField
                        form={form}
                        name="label"
                        label="Tag Label"
                        placeholder="Enter tag label"
                        description="A short name for this tag"
                    />
                    <FormTextField
                        form={form}
                        name="description"
                        label="Description"
                        placeholder="Enter description (optional)"
                    />
                </>
            )}
        </DialogForm>
    );
}

// Example 2: Using useMakeApi directly in a component
// eslint-disable-next-line react-refresh/only-export-components
export function useCreateTagWithToast() {
    return useMakeApi(
        (data: CreateTagForm) => Promise.resolve({ label: data.label }),
        {
            successMessage: (data: { label: string }) => `Tag "${data.label}" created successfully`,
            errorMessage: 'Failed to create tag',
            invalidateQueries: [['tags']],
            onSuccess: (data) => {
                // Additional custom logic after success
                console.log('Tag created:', data);
            },
        }
    );
}
