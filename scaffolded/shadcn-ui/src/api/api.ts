import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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


export function useUser() {
    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            // Mocked user data
            return {
                firstname: 'John',
                lastname: 'Doe',
                initials: 'JD',
                idx: 'mocked-user-id',
                created_at: '2021-01-01',
                updated_at: '2021-01-01',
            };
        },
    });

    return {
        userQuery,
        isLoading: userQuery.isPending,
        isError: userQuery.isError,
        isSuccess: userQuery.isSuccess,
        error: userQuery.error,
        data: userQuery.data,
    }
}


export function useRegisterUser(onSuccess?: () => void) {
    const registerUserMutation = useMutation({
        mutationFn: (data: { firstname: string; lastname: string }) => Promise.resolve({ firstname: data.firstname, lastname: data.lastname }),
        onSuccess: () => {
            toast.success('Profilo creato con successo');
            onSuccess?.();
        },
        onError: (error) => {
            toast.error(getApiErrorMessage(error, 'Si è verificato un errore durante la creazione del profilo.'));
        },
    });

    return {
        registerUserMutation,
        isLoading: registerUserMutation.isPending,
        isError: registerUserMutation.isError,
        isSuccess: registerUserMutation.isSuccess,
        error: registerUserMutation.error,
        data: registerUserMutation.data,
    }
}   