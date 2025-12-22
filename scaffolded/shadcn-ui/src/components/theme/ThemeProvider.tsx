import { useThemeCustomization } from '@/components/theme/use-theme-customization';

/**
 * Global theme customization provider component that applies theme customization
 * This ensures the theme is applied throughout the app, not just on the Settings page
 */
export function ThemeCustomizationProvider() {
    useThemeCustomization();
    return null;
}
