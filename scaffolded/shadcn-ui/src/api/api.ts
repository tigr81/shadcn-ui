import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/api/helpers';


/**
 * Hook to create API mutations with automatic toast notifications
 * @param mutationFn - The mutation function that performs the API call
 * @param options - Configuration options for the mutation
 * @returns A hook that returns the mutation with toast notifications
 */
export function useMakeApi<TData = unknown, TVariables = unknown>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options?: {
        successMessage?: string | ((data: TData) => string);
        errorMessage?: string | ((error: unknown) => string);
        onSuccess?: (data: TData, variables: TVariables) => void;
        onError?: (error: unknown, variables: TVariables) => void;
        invalidateQueries?: string[][];
    }
) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn,
        onSuccess: (data, variables) => {
            const successMsg =
                typeof options?.successMessage === 'function'
                    ? options.successMessage(data)
                    : options?.successMessage || 'Operation completed successfully';
            toast.success(successMsg);

            // Invalidate queries if specified
            if (options?.invalidateQueries) {
                for (const queryKey of options.invalidateQueries) {
                    queryClient.invalidateQueries({ queryKey });
                }
            }

            // Call custom onSuccess if provided
            options?.onSuccess?.(data, variables);
        },
        onError: (error, variables) => {
            const errorMsg =
                typeof options?.errorMessage === 'function'
                    ? options.errorMessage(error)
                    : options?.errorMessage || getApiErrorMessage(error, 'An error occurred while performing the operation.');
            toast.error(errorMsg);

            // Call custom onError if provided
            options?.onError?.(error, variables);
        },
    });

    return {
        mutation,
        mutate: mutation.mutate,
        mutateAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
        data: mutation.data,
    };
}
