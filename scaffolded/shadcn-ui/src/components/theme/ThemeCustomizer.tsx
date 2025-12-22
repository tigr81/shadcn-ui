import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui-system';
import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    useThemeCustomization,
    type ThemeColor,
    type ThemeMode,
    type ThemeRadius,
} from '@/components/theme/use-theme-customization';

const colors: { value: ThemeColor; label: string; class: string }[] = [
    { value: 'zinc', label: 'Zinc', class: 'bg-zinc-500' },
    { value: 'slate', label: 'Slate', class: 'bg-slate-500' },
    { value: 'stone', label: 'Stone', class: 'bg-stone-500' },
    { value: 'gray', label: 'Gray', class: 'bg-gray-500' },
    { value: 'neutral', label: 'Neutral', class: 'bg-neutral-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'rose', label: 'Rose', class: 'bg-rose-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
    { value: 'violet', label: 'Violet', class: 'bg-violet-500' },
];

const radiusOptions: { value: ThemeRadius; label: string }[] = [
    { value: '0', label: '0' },
    { value: '0.3', label: '0.3' },
    { value: '0.5', label: '0.5' },
    { value: '0.75', label: '0.75' },
    { value: '1.0', label: '1.0' },
];

const modes: { value: ThemeMode; label: string; icon: typeof Monitor }[] = [
    { value: 'system', label: 'System', icon: Monitor },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
];

export function ThemeCustomizer() {
    const { color, radius, mode, updateColor, updateRadius, updateMode, mounted } =
        useThemeCustomization();

    if (!mounted) {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Color Selection */}
            <div className="space-y-3">
                <div>
                    <Label className="text-sm font-medium">Color</Label>
                    <Typography variant="p" className="text-sm text-muted-foreground">
                        Choose a color scheme for your theme
                    </Typography>
                </div>
                <div className="grid grid-cols-6 gap-3">
                    {colors.map((colorOption) => (
                        <button
                            key={colorOption.value}
                            type="button"
                            onClick={() => updateColor(colorOption.value)}
                            className={cn(
                                'relative flex h-10 w-full items-center justify-center rounded-md border-2 transition-all',
                                color === colorOption.value
                                    ? 'border-foreground ring-2 ring-ring ring-offset-2'
                                    : 'border-border hover:border-foreground/50'
                            )}
                            aria-label={`Select ${colorOption.label} color`}
                        >
                            <div className={cn('h-6 w-6 rounded-full', colorOption.class)} />
                            {color === colorOption.value && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-2 w-2 rounded-full bg-foreground" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">Selected:</span>
                    <span className="capitalize">{color}</span>
                </div>
            </div>

            {/* Radius Selection */}
            <div className="space-y-3">
                <div>
                    <Label className="text-sm font-medium">Radius</Label>
                    <Typography variant="p" className="text-sm text-muted-foreground">
                        Adjust the border radius of components
                    </Typography>
                </div>
                <div className="flex gap-2">
                    {radiusOptions.map((radiusOption) => (
                        <Button
                            key={radiusOption.value}
                            type="button"
                            variant={radius === radiusOption.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateRadius(radiusOption.value)}
                            className="flex-1"
                        >
                            {radiusOption.label}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">Selected:</span>
                    <span>{radius}</span>
                </div>
            </div>

            {/* Mode Selection */}
            <div className="space-y-3">
                <div>
                    <Label className="text-sm font-medium">Mode</Label>
                    <Typography variant="p" className="text-sm text-muted-foreground">
                        Choose your preferred theme mode
                    </Typography>
                </div>
                <div className="flex gap-2">
                    {modes.map((modeOption) => {
                        const Icon = modeOption.icon;
                        return (
                            <Button
                                key={modeOption.value}
                                type="button"
                                variant={mode === modeOption.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateMode(modeOption.value)}
                                className="flex-1"
                            >
                                <Icon className="mr-2 h-4 w-4" />
                                {modeOption.label}
                            </Button>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">Selected:</span>
                    <span className="capitalize">{mode}</span>
                </div>
            </div>
        </div>
    );
}
