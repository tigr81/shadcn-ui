import {
    format as dateFnsFormat,
    formatDistance,
    formatRelative,
    isValid,
    parseISO,
} from 'date-fns';

/**
 * Format a date to a string
 * @param date - Date to format
 * @param formatString - Format string (default: 'PP')
 * @returns Formatted date string
 */
export function formatDate(date: Date | string | number, formatString: string = 'PP'): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
    if (!isValid(dateObj)) {
        return 'Invalid Date';
    }
    return dateFnsFormat(dateObj, formatString);
}

/**
 * Format a date as relative time (e.g., "2 hours ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | string | number): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
    if (!isValid(dateObj)) {
        return 'Invalid Date';
    }
    return formatDistance(dateObj, new Date(), { addSuffix: true });
}

/**
 * Format a date as relative to now (e.g., "today at 3:00 PM")
 * @param date - Date to format
 * @returns Relative date string
 */
export function formatRelativeDate(date: Date | string | number): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
    if (!isValid(dateObj)) {
        return 'Invalid Date';
    }
    return formatRelative(dateObj, new Date());
}

/**
 * Format a number as currency
 * @param amount - Amount to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
}

/**
 * Format a number with thousand separators
 * @param number - Number to format
 * @param locale - Locale string (default: 'en-US')
 * @param minimumFractionDigits - Minimum fraction digits (default: 0)
 * @param maximumFractionDigits - Maximum fraction digits (default: 2)
 * @returns Formatted number string
 */
export function formatNumber(
    number: number,
    locale: string = 'en-US',
    minimumFractionDigits: number = 0,
    maximumFractionDigits: number = 2
): string {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(number);
}

/**
 * Format a number as a percentage
 * @param number - Number to format (0-1 or 0-100)
 * @param isDecimal - Whether the number is in decimal format (0-1) or percentage (0-100) (default: false)
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted percentage string
 */
export function formatPercentage(
    number: number,
    isDecimal: boolean = false,
    locale: string = 'en-US'
): string {
    const value = isDecimal ? number * 100 : number;
    return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(value / 100);
}

/**
 * Format file size in bytes to human-readable format
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Format duration in milliseconds to human-readable format
 * @param milliseconds - Duration in milliseconds
 * @returns Formatted duration string
 */
export function formatDuration(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d ${hours % 24}h`;
    }
    if (hours > 0) {
        return `${hours}h ${minutes % 60}m`;
    }
    if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
}
