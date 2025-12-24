import { z } from 'zod';

/**
 * Common validation schemas for forms
 */

/**
 * Email validation schema
 */
export const emailSchema = z.string().email('Please enter a valid email address');

/**
 * Password validation schema
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

/**
 * Phone number validation schema (US format)
 */
export const phoneSchema = z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number')
    .or(
        z
            .string()
            .regex(
                /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                'Please enter a valid phone number'
            )
    );

/**
 * URL validation schema
 */
export const urlSchema = z.string().url('Please enter a valid URL');

/**
 * Non-empty string validation schema
 */
export const nonEmptyStringSchema = z.string().min(1, 'This field is required');

/**
 * Positive number validation schema
 */
export const positiveNumberSchema = z.number().positive('Must be a positive number');

/**
 * Non-negative number validation schema
 */
export const nonNegativeNumberSchema = z.number().nonnegative('Must be a non-negative number');

/**
 * Date validation schema (must be in the past)
 */
export const pastDateSchema = z.date().refine((date) => date < new Date(), {
    message: 'Date must be in the past',
});

/**
 * Date validation schema (must be in the future)
 */
export const futureDateSchema = z.date().refine((date) => date > new Date(), {
    message: 'Date must be in the future',
});

/**
 * Date range validation schema
 */
export const dateRangeSchema = z
    .object({
        from: z.date(),
        to: z.date(),
    })
    .refine((data) => data.from <= data.to, {
        message: 'Start date must be before or equal to end date',
        path: ['to'],
    });

/**
 * File validation schema
 * @param maxSize - Maximum file size in bytes (default: 5MB)
 * @param allowedTypes - Allowed MIME types (default: ['image/*'])
 */
export function fileSchema(
    maxSize: number = 5 * 1024 * 1024,
    allowedTypes: string[] = ['image/*']
) {
    return z
        .instanceof(File)
        .refine((file) => file.size <= maxSize, {
            message: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`,
        })
        .refine(
            (file) => {
                if (allowedTypes.length === 0) return true;
                return allowedTypes.some((type) => {
                    if (type.endsWith('/*')) {
                        const baseType = type.split('/')[0];
                        return file.type.startsWith(`${baseType}/`);
                    }
                    return file.type === type;
                });
            },
            {
                message: `File type must be one of: ${allowedTypes.join(', ')}`,
            }
        );
}

/**
 * Array validation schema (non-empty)
 */
export const nonEmptyArraySchema = <T extends z.ZodTypeAny>(schema: T) =>
    z.array(schema).min(1, 'At least one item is required');

/**
 * Optional string that becomes required if provided
 */
export const optionalStringSchema = z.string().optional().or(z.literal(''));

/**
 * Create a conditional validation schema
 * @param condition - Function that returns true if field should be required
 * @param schema - Schema to apply when condition is true
 */
export function conditionalSchema<T extends z.ZodTypeAny>(
    condition: (data: unknown) => boolean,
    schema: T
): z.ZodType<z.infer<T>> {
    return z.any().refine(
        (data) => {
            if (condition(data)) {
                return schema.safeParse(data).success;
            }
            return true;
        },
        {
            message: 'Validation failed',
        }
    ) as z.ZodType<z.infer<T>>;
}
