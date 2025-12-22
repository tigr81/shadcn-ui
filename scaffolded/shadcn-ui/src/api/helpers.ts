import { AxiosError } from 'axios';
import { getErrorMessage } from '@/lib/error';

/**
 * Type for API error response
 */
export interface ApiErrorResponse {
    message?: string;
    error?: string;
    errors?: Record<string, string[]>;
    statusCode?: number;
}

/**
 * Extract error message from API error
 * @param error - Error object (AxiosError or generic Error)
 * @param defaultMessage - Default message if error cannot be extracted
 * @returns Error message string
 */
export function getApiErrorMessage(
    error: unknown,
    defaultMessage: string = 'An error occurred'
): string {
    if (error instanceof AxiosError) {
        const response = error.response?.data as ApiErrorResponse | undefined;

        if (response?.message) {
            return response.message;
        }

        if (response?.error) {
            return response.error;
        }

        if (response?.errors) {
            // Return first error message from validation errors
            const firstErrorKey = Object.keys(response.errors)[0];
            const firstError = response.errors[firstErrorKey];
            if (firstError && firstError.length > 0) {
                return firstError[0];
            }
        }

        if (error.message) {
            return error.message;
        }

        // Handle HTTP status codes
        if (error.response?.status) {
            switch (error.response.status) {
                case 400:
                    return 'Bad request. Please check your input.';
                case 401:
                    return 'Unauthorized. Please log in again.';
                case 403:
                    return 'Forbidden. You do not have permission to perform this action.';
                case 404:
                    return 'Resource not found.';
                case 409:
                    return 'Conflict. This resource already exists.';
                case 422:
                    return 'Validation error. Please check your input.';
                case 429:
                    return 'Too many requests. Please try again later.';
                case 500:
                    return 'Internal server error. Please try again later.';
                case 502:
                case 503:
                case 504:
                    return 'Service unavailable. Please try again later.';
                default:
                    return `Error ${error.response.status}. ${defaultMessage}`;
            }
        }
    }

    return getErrorMessage(error, defaultMessage);
}

/**
 * Extract validation errors from API error response
 * @param error - Error object (AxiosError or generic Error)
 * @returns Record of field names to error messages
 */
export function getValidationErrors(error: unknown): Record<string, string> {
    if (error instanceof AxiosError) {
        const response = error.response?.data as ApiErrorResponse | undefined;

        if (response?.errors) {
            const validationErrors: Record<string, string> = {};
            Object.entries(response.errors).forEach(([key, messages]) => {
                if (messages && messages.length > 0) {
                    validationErrors[key] = messages[0];
                }
            });
            return validationErrors;
        }
    }

    return {};
}

/**
 * Check if error is a network error
 * @param error - Error object
 * @returns True if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return !error.response && error.request;
    }
    return false;
}

/**
 * Check if error is a timeout error
 * @param error - Error object
 * @returns True if error is a timeout error
 */
export function isTimeoutError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return error.code === 'ECONNABORTED' || error.message.includes('timeout');
    }
    return false;
}

/**
 * Check if error is a 401 Unauthorized error
 * @param error - Error object
 * @returns True if error is 401
 */
export function isUnauthorizedError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return error.response?.status === 401;
    }
    return false;
}

/**
 * Check if error is a 403 Forbidden error
 * @param error - Error object
 * @returns True if error is 403
 */
export function isForbiddenError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return error.response?.status === 403;
    }
    return false;
}

/**
 * Check if error is a 404 Not Found error
 * @param error - Error object
 * @returns True if error is 404
 */
export function isNotFoundError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return error.response?.status === 404;
    }
    return false;
}

/**
 * Check if error is a validation error (422)
 * @param error - Error object
 * @returns True if error is 422
 */
export function isValidationError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return error.response?.status === 422;
    }
    return false;
}
