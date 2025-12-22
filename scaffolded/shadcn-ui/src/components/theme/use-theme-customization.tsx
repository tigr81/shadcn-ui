import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';

export type ThemeColor =
    | 'zinc'
    | 'slate'
    | 'stone'
    | 'gray'
    | 'neutral'
    | 'red'
    | 'rose'
    | 'orange'
    | 'green'
    | 'blue'
    | 'yellow'
    | 'violet';
export type ThemeRadius = '0' | '0.3' | '0.5' | '0.75' | '1.0';
export type ThemeMode = 'system' | 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme-customization';

interface ThemeCustomization {
    color: ThemeColor;
    radius: ThemeRadius;
    mode: ThemeMode;
}

const defaultTheme: ThemeCustomization = {
    color: 'zinc',
    radius: '0.5',
    mode: 'system',
};

// Theme color definitions based on shadcn/ui color system
const themeColors: Record<
    ThemeColor,
    { light: Record<string, string>; dark: Record<string, string> }
> = {
    zinc: {
        light: {
            background: '0 0% 100%',
            foreground: '240 10% 3.9%',
            card: '0 0% 100%',
            'card-foreground': '240 10% 3.9%',
            popover: '0 0% 100%',
            'popover-foreground': '240 10% 3.9%',
            primary: '240 5.9% 10%',
            'primary-foreground': '0 0% 98%',
            secondary: '240 4.8% 95.9%',
            'secondary-foreground': '240 5.9% 10%',
            muted: '240 4.8% 95.9%',
            'muted-foreground': '240 3.8% 46.1%',
            accent: '240 4.8% 95.9%',
            'accent-foreground': '240 5.9% 10%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '0 0% 98%',
            border: '240 5.9% 90%',
            input: '240 5.9% 90%',
            ring: '240 10% 3.9%',
        },
        dark: {
            background: '240 10% 3.9%',
            foreground: '0 0% 98%',
            card: '240 10% 3.9%',
            'card-foreground': '0 0% 98%',
            popover: '240 10% 3.9%',
            'popover-foreground': '0 0% 98%',
            primary: '0 0% 98%',
            'primary-foreground': '240 5.9% 10%',
            secondary: '240 3.7% 15.9%',
            'secondary-foreground': '0 0% 98%',
            muted: '240 3.7% 15.9%',
            'muted-foreground': '240 5% 64.9%',
            accent: '240 3.7% 15.9%',
            'accent-foreground': '0 0% 98%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '0 0% 98%',
            border: '240 3.7% 15.9%',
            input: '240 3.7% 15.9%',
            ring: '240 4.9% 83.9%',
        },
    },
    slate: {
        light: {
            background: '0 0% 100%',
            foreground: '222.2 84% 4.9%',
            card: '0 0% 100%',
            'card-foreground': '222.2 84% 4.9%',
            popover: '0 0% 100%',
            'popover-foreground': '222.2 84% 4.9%',
            primary: '222.2 47.4% 11.2%',
            'primary-foreground': '210 40% 98%',
            secondary: '210 40% 96.1%',
            'secondary-foreground': '222.2 47.4% 11.2%',
            muted: '210 40% 96.1%',
            'muted-foreground': '215.4 16.3% 46.9%',
            accent: '210 40% 96.1%',
            'accent-foreground': '222.2 47.4% 11.2%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '210 40% 98%',
            border: '214.3 31.8% 91.4%',
            input: '214.3 31.8% 91.4%',
            ring: '222.2 84% 4.9%',
        },
        dark: {
            background: '222.2 84% 4.9%',
            foreground: '210 40% 98%',
            card: '222.2 84% 4.9%',
            'card-foreground': '210 40% 98%',
            popover: '222.2 84% 4.9%',
            'popover-foreground': '210 40% 98%',
            primary: '210 40% 98%',
            'primary-foreground': '222.2 47.4% 11.2%',
            secondary: '217.2 32.6% 17.5%',
            'secondary-foreground': '210 40% 98%',
            muted: '217.2 32.6% 17.5%',
            'muted-foreground': '215 20.2% 65.1%',
            accent: '217.2 32.6% 17.5%',
            'accent-foreground': '210 40% 98%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '210 40% 98%',
            border: '217.2 32.6% 17.5%',
            input: '217.2 32.6% 17.5%',
            ring: '212.7 26.8% 83.9%',
        },
    },
    stone: {
        light: {
            background: '0 0% 100%',
            foreground: '20 14.3% 4.1%',
            card: '0 0% 100%',
            'card-foreground': '20 14.3% 4.1%',
            popover: '0 0% 100%',
            'popover-foreground': '20 14.3% 4.1%',
            primary: '24 9.8% 10%',
            'primary-foreground': '60 9.1% 97.8%',
            secondary: '60 4.8% 95.9%',
            'secondary-foreground': '24 9.8% 10%',
            muted: '60 4.8% 95.9%',
            'muted-foreground': '25 5.3% 44.7%',
            accent: '60 4.8% 95.9%',
            'accent-foreground': '24 9.8% 10%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '60 9.1% 97.8%',
            border: '20 5.9% 90%',
            input: '20 5.9% 90%',
            ring: '20 14.3% 4.1%',
        },
        dark: {
            background: '20 14.3% 4.1%',
            foreground: '60 9.1% 97.8%',
            card: '20 14.3% 4.1%',
            'card-foreground': '60 9.1% 97.8%',
            popover: '20 14.3% 4.1%',
            'popover-foreground': '60 9.1% 97.8%',
            primary: '60 9.1% 97.8%',
            'primary-foreground': '24 9.8% 10%',
            secondary: '12 6.5% 15.1%',
            'secondary-foreground': '60 9.1% 97.8%',
            muted: '12 6.5% 15.1%',
            'muted-foreground': '24 5.4% 63.9%',
            accent: '12 6.5% 15.1%',
            'accent-foreground': '60 9.1% 97.8%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '60 9.1% 97.8%',
            border: '12 6.5% 15.1%',
            input: '12 6.5% 15.1%',
            ring: '24 5.7% 63.9%',
        },
    },
    gray: {
        light: {
            background: '0 0% 100%',
            foreground: '224 71.4% 4.1%',
            card: '0 0% 100%',
            'card-foreground': '224 71.4% 4.1%',
            popover: '0 0% 100%',
            'popover-foreground': '224 71.4% 4.1%',
            primary: '220.9 39.3% 11%',
            'primary-foreground': '210 20% 98%',
            secondary: '220 14.3% 95.9%',
            'secondary-foreground': '220.9 39.3% 11%',
            muted: '220 14.3% 95.9%',
            'muted-foreground': '220 8.9% 46.1%',
            accent: '220 14.3% 95.9%',
            'accent-foreground': '220.9 39.3% 11%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '210 20% 98%',
            border: '220 13% 91%',
            input: '220 13% 91%',
            ring: '224 71.4% 4.1%',
        },
        dark: {
            background: '224 71.4% 4.1%',
            foreground: '210 20% 98%',
            card: '224 71.4% 4.1%',
            'card-foreground': '210 20% 98%',
            popover: '224 71.4% 4.1%',
            'popover-foreground': '210 20% 98%',
            primary: '210 20% 98%',
            'primary-foreground': '220.9 39.3% 11%',
            secondary: '215 27.9% 16.9%',
            'secondary-foreground': '210 20% 98%',
            muted: '215 27.9% 16.9%',
            'muted-foreground': '217.9 10.6% 64.9%',
            accent: '215 27.9% 16.9%',
            'accent-foreground': '210 20% 98%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '210 20% 98%',
            border: '215 27.9% 16.9%',
            input: '215 27.9% 16.9%',
            ring: '216 12.2% 83.9%',
        },
    },
    neutral: {
        light: {
            background: '0 0% 100%',
            foreground: '0 0% 3.9%',
            card: '0 0% 100%',
            'card-foreground': '0 0% 3.9%',
            popover: '0 0% 100%',
            'popover-foreground': '0 0% 3.9%',
            primary: '0 0% 9%',
            'primary-foreground': '0 0% 98%',
            secondary: '0 0% 96.1%',
            'secondary-foreground': '0 0% 9%',
            muted: '0 0% 96.1%',
            'muted-foreground': '0 0% 45.1%',
            accent: '0 0% 96.1%',
            'accent-foreground': '0 0% 9%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '0 0% 98%',
            border: '0 0% 89.8%',
            input: '0 0% 89.8%',
            ring: '0 0% 3.9%',
        },
        dark: {
            background: '0 0% 3.9%',
            foreground: '0 0% 98%',
            card: '0 0% 3.9%',
            'card-foreground': '0 0% 98%',
            popover: '0 0% 3.9%',
            'popover-foreground': '0 0% 98%',
            primary: '0 0% 98%',
            'primary-foreground': '0 0% 9%',
            secondary: '0 0% 14.9%',
            'secondary-foreground': '0 0% 98%',
            muted: '0 0% 14.9%',
            'muted-foreground': '0 0% 63.9%',
            accent: '0 0% 14.9%',
            'accent-foreground': '0 0% 98%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '0 0% 98%',
            border: '0 0% 14.9%',
            input: '0 0% 14.9%',
            ring: '0 0% 83.1%',
        },
    },
    red: {
        light: {
            background: '0 0% 100%',
            foreground: '0 0% 3.9%',
            card: '0 0% 100%',
            'card-foreground': '0 0% 3.9%',
            popover: '0 0% 100%',
            'popover-foreground': '0 0% 3.9%',
            primary: '0 72.2% 50.6%',
            'primary-foreground': '0 0% 98%',
            secondary: '0 0% 96.1%',
            'secondary-foreground': '0 0% 9%',
            muted: '0 0% 96.1%',
            'muted-foreground': '0 0% 45.1%',
            accent: '0 0% 96.1%',
            'accent-foreground': '0 0% 9%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '0 0% 98%',
            border: '0 0% 89.8%',
            input: '0 0% 89.8%',
            ring: '0 72.2% 50.6%',
        },
        dark: {
            background: '0 0% 3.9%',
            foreground: '0 0% 98%',
            card: '0 0% 3.9%',
            'card-foreground': '0 0% 98%',
            popover: '0 0% 3.9%',
            'popover-foreground': '0 0% 98%',
            primary: '0 72.2% 50.6%',
            'primary-foreground': '0 0% 98%',
            secondary: '0 0% 14.9%',
            'secondary-foreground': '0 0% 98%',
            muted: '0 0% 14.9%',
            'muted-foreground': '0 0% 63.9%',
            accent: '0 0% 14.9%',
            'accent-foreground': '0 0% 98%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '0 0% 98%',
            border: '0 0% 14.9%',
            input: '0 0% 14.9%',
            ring: '0 72.2% 50.6%',
        },
    },
    rose: {
        light: {
            background: '0 0% 100%',
            foreground: '240 10% 3.9%',
            card: '0 0% 100%',
            'card-foreground': '240 10% 3.9%',
            popover: '0 0% 100%',
            'popover-foreground': '240 10% 3.9%',
            primary: '346.8 77.2% 49.8%',
            'primary-foreground': '355.7 100% 97.3%',
            secondary: '240 4.8% 95.9%',
            'secondary-foreground': '240 5.9% 10%',
            muted: '240 4.8% 95.9%',
            'muted-foreground': '240 3.8% 46.1%',
            accent: '240 4.8% 95.9%',
            'accent-foreground': '240 5.9% 10%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '0 0% 98%',
            border: '240 5.9% 90%',
            input: '240 5.9% 90%',
            ring: '346.8 77.2% 49.8%',
        },
        dark: {
            background: '240 10% 3.9%',
            foreground: '0 0% 98%',
            card: '240 10% 3.9%',
            'card-foreground': '0 0% 98%',
            popover: '240 10% 3.9%',
            'popover-foreground': '0 0% 98%',
            primary: '346.8 77.2% 49.8%',
            'primary-foreground': '355.7 100% 97.3%',
            secondary: '240 3.7% 15.9%',
            'secondary-foreground': '0 0% 98%',
            muted: '240 3.7% 15.9%',
            'muted-foreground': '240 5% 64.9%',
            accent: '240 3.7% 15.9%',
            'accent-foreground': '0 0% 98%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '0 0% 98%',
            border: '240 3.7% 15.9%',
            input: '240 3.7% 15.9%',
            ring: '346.8 77.2% 49.8%',
        },
    },
    orange: {
        light: {
            background: '0 0% 100%',
            foreground: '20 14.3% 4.1%',
            card: '0 0% 100%',
            'card-foreground': '20 14.3% 4.1%',
            popover: '0 0% 100%',
            'popover-foreground': '20 14.3% 4.1%',
            primary: '24.6 95% 53.1%',
            'primary-foreground': '60 9.1% 97.8%',
            secondary: '60 4.8% 95.9%',
            'secondary-foreground': '24 9.8% 10%',
            muted: '60 4.8% 95.9%',
            'muted-foreground': '25 5.3% 44.7%',
            accent: '60 4.8% 95.9%',
            'accent-foreground': '24 9.8% 10%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '60 9.1% 97.8%',
            border: '20 5.9% 90%',
            input: '20 5.9% 90%',
            ring: '24.6 95% 53.1%',
        },
        dark: {
            background: '20 14.3% 4.1%',
            foreground: '60 9.1% 97.8%',
            card: '20 14.3% 4.1%',
            'card-foreground': '60 9.1% 97.8%',
            popover: '20 14.3% 4.1%',
            'popover-foreground': '60 9.1% 97.8%',
            primary: '20.5 90.2% 48.2%',
            'primary-foreground': '60 9.1% 97.8%',
            secondary: '12 6.5% 15.1%',
            'secondary-foreground': '60 9.1% 97.8%',
            muted: '12 6.5% 15.1%',
            'muted-foreground': '24 5.4% 63.9%',
            accent: '12 6.5% 15.1%',
            'accent-foreground': '60 9.1% 97.8%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '60 9.1% 97.8%',
            border: '12 6.5% 15.1%',
            input: '12 6.5% 15.1%',
            ring: '20.5 90.2% 48.2%',
        },
    },
    green: {
        light: {
            background: '0 0% 100%',
            foreground: '240 10% 3.9%',
            card: '0 0% 100%',
            'card-foreground': '240 10% 3.9%',
            popover: '0 0% 100%',
            'popover-foreground': '240 10% 3.9%',
            primary: '142.1 76.2% 36.3%',
            'primary-foreground': '355.7 100% 97.3%',
            secondary: '240 4.8% 95.9%',
            'secondary-foreground': '240 5.9% 10%',
            muted: '240 4.8% 95.9%',
            'muted-foreground': '240 3.8% 46.1%',
            accent: '240 4.8% 95.9%',
            'accent-foreground': '240 5.9% 10%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '0 0% 98%',
            border: '240 5.9% 90%',
            input: '240 5.9% 90%',
            ring: '142.1 76.2% 36.3%',
        },
        dark: {
            background: '240 10% 3.9%',
            foreground: '0 0% 98%',
            card: '240 10% 3.9%',
            'card-foreground': '0 0% 98%',
            popover: '240 10% 3.9%',
            'popover-foreground': '0 0% 98%',
            primary: '142.1 70.6% 45.3%',
            'primary-foreground': '144.9 80.4% 10%',
            secondary: '240 3.7% 15.9%',
            'secondary-foreground': '0 0% 98%',
            muted: '240 3.7% 15.9%',
            'muted-foreground': '240 5% 64.9%',
            accent: '240 3.7% 15.9%',
            'accent-foreground': '0 0% 98%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '0 0% 98%',
            border: '240 3.7% 15.9%',
            input: '240 3.7% 15.9%',
            ring: '142.1 70.6% 45.3%',
        },
    },
    blue: {
        light: {
            background: '0 0% 100%',
            foreground: '222.2 84% 4.9%',
            card: '0 0% 100%',
            'card-foreground': '222.2 84% 4.9%',
            popover: '0 0% 100%',
            'popover-foreground': '222.2 84% 4.9%',
            primary: '221.2 83.2% 53.3%',
            'primary-foreground': '210 40% 98%',
            secondary: '210 40% 96.1%',
            'secondary-foreground': '222.2 47.4% 11.2%',
            muted: '210 40% 96.1%',
            'muted-foreground': '215.4 16.3% 46.9%',
            accent: '210 40% 96.1%',
            'accent-foreground': '222.2 47.4% 11.2%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '210 40% 98%',
            border: '214.3 31.8% 91.4%',
            input: '214.3 31.8% 91.4%',
            ring: '221.2 83.2% 53.3%',
        },
        dark: {
            background: '222.2 84% 4.9%',
            foreground: '210 40% 98%',
            card: '222.2 84% 4.9%',
            'card-foreground': '210 40% 98%',
            popover: '222.2 84% 4.9%',
            'popover-foreground': '210 40% 98%',
            primary: '217.2 91.2% 59.8%',
            'primary-foreground': '222.2 47.4% 11.2%',
            secondary: '217.2 32.6% 17.5%',
            'secondary-foreground': '210 40% 98%',
            muted: '217.2 32.6% 17.5%',
            'muted-foreground': '215 20.2% 65.1%',
            accent: '217.2 32.6% 17.5%',
            'accent-foreground': '210 40% 98%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '210 40% 98%',
            border: '217.2 32.6% 17.5%',
            input: '217.2 32.6% 17.5%',
            ring: '217.2 91.2% 59.8%',
        },
    },
    yellow: {
        light: {
            background: '0 0% 100%',
            foreground: '20 14.3% 4.1%',
            card: '0 0% 100%',
            'card-foreground': '20 14.3% 4.1%',
            popover: '0 0% 100%',
            'popover-foreground': '20 14.3% 4.1%',
            primary: '47.9 95.8% 53.1%',
            'primary-foreground': '26 83.3% 14.1%',
            secondary: '60 4.8% 95.9%',
            'secondary-foreground': '24 9.8% 10%',
            muted: '60 4.8% 95.9%',
            'muted-foreground': '25 5.3% 44.7%',
            accent: '60 4.8% 95.9%',
            'accent-foreground': '24 9.8% 10%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '60 9.1% 97.8%',
            border: '20 5.9% 90%',
            input: '20 5.9% 90%',
            ring: '47.9 95.8% 53.1%',
        },
        dark: {
            background: '20 14.3% 4.1%',
            foreground: '60 9.1% 97.8%',
            card: '20 14.3% 4.1%',
            'card-foreground': '60 9.1% 97.8%',
            popover: '20 14.3% 4.1%',
            'popover-foreground': '60 9.1% 97.8%',
            primary: '47.9 95.8% 53.1%',
            'primary-foreground': '26 83.3% 14.1%',
            secondary: '12 6.5% 15.1%',
            'secondary-foreground': '60 9.1% 97.8%',
            muted: '12 6.5% 15.1%',
            'muted-foreground': '24 5.4% 63.9%',
            accent: '12 6.5% 15.1%',
            'accent-foreground': '60 9.1% 97.8%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '60 9.1% 97.8%',
            border: '12 6.5% 15.1%',
            input: '12 6.5% 15.1%',
            ring: '47.9 95.8% 53.1%',
        },
    },
    violet: {
        light: {
            background: '0 0% 100%',
            foreground: '222.2 84% 4.9%',
            card: '0 0% 100%',
            'card-foreground': '222.2 84% 4.9%',
            popover: '0 0% 100%',
            'popover-foreground': '222.2 84% 4.9%',
            primary: '262.1 83.3% 57.8%',
            'primary-foreground': '210 40% 98%',
            secondary: '210 40% 96.1%',
            'secondary-foreground': '222.2 47.4% 11.2%',
            muted: '210 40% 96.1%',
            'muted-foreground': '215.4 16.3% 46.9%',
            accent: '210 40% 96.1%',
            'accent-foreground': '222.2 47.4% 11.2%',
            destructive: '0 84.2% 60.2%',
            'destructive-foreground': '210 40% 98%',
            border: '214.3 31.8% 91.4%',
            input: '214.3 31.8% 91.4%',
            ring: '262.1 83.3% 57.8%',
        },
        dark: {
            background: '222.2 84% 4.9%',
            foreground: '210 40% 98%',
            card: '222.2 84% 4.9%',
            'card-foreground': '210 40% 98%',
            popover: '222.2 84% 4.9%',
            'popover-foreground': '210 40% 98%',
            primary: '263.4 70% 50.4%',
            'primary-foreground': '210 40% 98%',
            secondary: '217.2 32.6% 17.5%',
            'secondary-foreground': '210 40% 98%',
            muted: '217.2 32.6% 17.5%',
            'muted-foreground': '215 20.2% 65.1%',
            accent: '217.2 32.6% 17.5%',
            'accent-foreground': '210 40% 98%',
            destructive: '0 62.8% 30.6%',
            'destructive-foreground': '210 40% 98%',
            border: '217.2 32.6% 17.5%',
            input: '217.2 32.6% 17.5%',
            ring: '263.4 70% 50.4%',
        },
    },
};

const radiusMap: Record<ThemeRadius, string> = {
    '0': '0px',
    '0.3': '0.3rem',
    '0.5': '0.5rem',
    '0.75': '0.75rem',
    '1.0': '1rem',
};

// Accent color mappings - derived from theme primary colors
const accentColorMap: Record<
    ThemeColor,
    { light: { primary: string; secondary: string; tertiary: string }; dark: { primary: string; secondary: string; tertiary: string } }
> = {
    zinc: {
        light: { primary: '221.2 83.2% 53.3%', secondary: '142.1 76.2% 36.3%', tertiary: '217.2 91.2% 59.8%' },
        dark: { primary: '217.2 91.2% 59.8%', secondary: '142.1 70.6% 45.3%', tertiary: '217.2 91.2% 59.8%' },
    },
    slate: {
        light: { primary: '221.2 83.2% 53.3%', secondary: '142.1 76.2% 36.3%', tertiary: '217.2 91.2% 59.8%' },
        dark: { primary: '217.2 91.2% 59.8%', secondary: '142.1 70.6% 45.3%', tertiary: '217.2 91.2% 59.8%' },
    },
    stone: {
        light: { primary: '24.6 95% 53.1%', secondary: '142.1 76.2% 36.3%', tertiary: '47.9 95.8% 53.1%' },
        dark: { primary: '20.5 90.2% 48.2%', secondary: '142.1 70.6% 45.3%', tertiary: '47.9 95.8% 53.1%' },
    },
    gray: {
        light: { primary: '221.2 83.2% 53.3%', secondary: '142.1 76.2% 36.3%', tertiary: '217.2 91.2% 59.8%' },
        dark: { primary: '217.2 91.2% 59.8%', secondary: '142.1 70.6% 45.3%', tertiary: '217.2 91.2% 59.8%' },
    },
    neutral: {
        light: { primary: '221.2 83.2% 53.3%', secondary: '142.1 76.2% 36.3%', tertiary: '217.2 91.2% 59.8%' },
        dark: { primary: '217.2 91.2% 59.8%', secondary: '142.1 70.6% 45.3%', tertiary: '217.2 91.2% 59.8%' },
    },
    red: {
        light: { primary: '0 72.2% 50.6%', secondary: '0 84.2% 60.2%', tertiary: '346.8 77.2% 49.8%' },
        dark: { primary: '0 72.2% 50.6%', secondary: '0 62.8% 30.6%', tertiary: '346.8 77.2% 49.8%' },
    },
    rose: {
        light: { primary: '346.8 77.2% 49.8%', secondary: '0 84.2% 60.2%', tertiary: '346.8 77.2% 49.8%' },
        dark: { primary: '346.8 77.2% 49.8%', secondary: '0 62.8% 30.6%', tertiary: '346.8 77.2% 49.8%' },
    },
    orange: {
        light: { primary: '24.6 95% 53.1%', secondary: '47.9 95.8% 53.1%', tertiary: '20.5 90.2% 48.2%' },
        dark: { primary: '20.5 90.2% 48.2%', secondary: '47.9 95.8% 53.1%', tertiary: '20.5 90.2% 48.2%' },
    },
    green: {
        light: { primary: '142.1 76.2% 36.3%', secondary: '142.1 76.2% 36.3%', tertiary: '142.1 70.6% 45.3%' },
        dark: { primary: '142.1 70.6% 45.3%', secondary: '142.1 70.6% 45.3%', tertiary: '142.1 70.6% 45.3%' },
    },
    blue: {
        light: { primary: '221.2 83.2% 53.3%', secondary: '142.1 76.2% 36.3%', tertiary: '217.2 91.2% 59.8%' },
        dark: { primary: '217.2 91.2% 59.8%', secondary: '142.1 70.6% 45.3%', tertiary: '217.2 91.2% 59.8%' },
    },
    yellow: {
        light: { primary: '47.9 95.8% 53.1%', secondary: '24.6 95% 53.1%', tertiary: '47.9 95.8% 53.1%' },
        dark: { primary: '47.9 95.8% 53.1%', secondary: '20.5 90.2% 48.2%', tertiary: '47.9 95.8% 53.1%' },
    },
    violet: {
        light: { primary: '262.1 83.3% 57.8%', secondary: '346.8 77.2% 49.8%', tertiary: '263.4 70% 50.4%' },
        dark: { primary: '263.4 70% 50.4%', secondary: '346.8 77.2% 49.8%', tertiary: '263.4 70% 50.4%' },
    },
};

export function useThemeCustomization() {
    const { theme: currentMode, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [customization, setCustomization] = useState<ThemeCustomization>(defaultTheme);
    const [isInitialized, setIsInitialized] = useState(false);
    const isUpdatingModeRef = useRef(false);

    // Load theme from localStorage on mount
    // Wait for currentMode to be available from next-themes before initializing
    useEffect(() => {
        if (isInitialized) return;
        // Wait for currentMode to be resolved (it might be undefined initially)
        // If we have a stored preference, we can initialize, otherwise wait for currentMode
        const stored = localStorage.getItem(THEME_STORAGE_KEY);

        if (stored) {
            try {
                const parsed = JSON.parse(stored) as ThemeCustomization;
                // If currentMode is available and differs from stored mode,
                // respect the currentMode (it was changed by ThemeSwitcher)
                if (currentMode && currentMode !== parsed.mode) {
                    // Update stored customization to match current theme
                    const updated = { ...parsed, mode: (currentMode as ThemeMode) || 'system' };
                    setCustomization(updated);
                    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updated));
                } else {
                    setCustomization(parsed);
                    // Only set theme if currentMode is not available yet
                    if (parsed.mode && !currentMode) {
                        setTheme(parsed.mode);
                    }
                }
                setIsInitialized(true);
                setMounted(true);
            } catch {
                // Invalid stored data, use defaults
                if (currentMode) {
                    setCustomization((prev) => ({
                        ...prev,
                        mode: (currentMode as ThemeMode) || 'system',
                    }));
                    setIsInitialized(true);
                    setMounted(true);
                }
            }
        } else if (currentMode) {
            // No stored preference, use currentMode from next-themes
            setCustomization((prev) => ({ ...prev, mode: (currentMode as ThemeMode) || 'system' }));
            setIsInitialized(true);
            setMounted(true);
        }
    }, [currentMode, setTheme, isInitialized]);

    // Sync mode when currentMode changes (e.g., from ThemeSwitcher)
    useEffect(() => {
        if (!isInitialized || isUpdatingModeRef.current) {
            isUpdatingModeRef.current = false;
            return;
        }

        // If currentMode changed externally (e.g., from ThemeSwitcher), update our stored preference
        if (currentMode && currentMode !== customization.mode) {
            setCustomization((prev) => {
                const updated = { ...prev, mode: (currentMode as ThemeMode) || 'system' };
                localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updated));
                return updated;
            });
        }
    }, [currentMode, isInitialized, customization.mode]);

    // Apply theme to CSS variables
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        const isDark =
            currentMode === 'dark' ||
            (currentMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        const colorScheme = isDark
            ? themeColors[customization.color].dark
            : themeColors[customization.color].light;

        // Apply color variables
        Object.entries(colorScheme).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        // Apply accent colors based on theme
        const accentColors = isDark
            ? accentColorMap[customization.color].dark
            : accentColorMap[customization.color].light;
        root.style.setProperty('--accent-primary', accentColors.primary);
        root.style.setProperty('--accent-secondary', accentColors.secondary);
        root.style.setProperty('--accent-tertiary', accentColors.tertiary);

        // Apply radius
        root.style.setProperty('--radius', radiusMap[customization.radius]);

        // Store in localStorage
        if (isInitialized) {
            localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(customization));
        }
    }, [customization, currentMode, mounted, isInitialized]);

    const updateColor = (color: ThemeColor) => {
        setCustomization((prev) => ({ ...prev, color }));
    };

    const updateRadius = (radius: ThemeRadius) => {
        setCustomization((prev) => ({ ...prev, radius }));
    };

    const updateMode = (mode: ThemeMode) => {
        isUpdatingModeRef.current = true;
        setCustomization((prev) => ({ ...prev, mode }));
        setTheme(mode);
    };

    return {
        color: customization.color,
        radius: customization.radius,
        mode: customization.mode,
        updateColor,
        updateRadius,
        updateMode,
        mounted,
    };
}
