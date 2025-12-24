import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export type SelectComboboxProps<T, TItem = unknown> = Readonly<{
    className?: string;
    contentClassName?: string;
    placeholder?: string;
    value?: T;
    onChange?: (newValue: T | undefined) => void;
    items: readonly TItem[];
    disabled?: boolean;
    itemToValue: (item: TItem) => T;
    itemToKey: (item: TItem) => string | number;
    renderItem?: (item: TItem) => ReactNode;
    withPlaceholder?: boolean;
    isItemDisabled?: (item: TItem) => boolean;
}>;

export default function SelectCombobox<T, TItem = unknown>({
    className,
    contentClassName,
    placeholder = 'Select an option',
    value,
    onChange,
    items,
    disabled = false,
    itemToValue,
    itemToKey,
    renderItem,
    withPlaceholder = true,
    isItemDisabled,
}: SelectComboboxProps<T, TItem>) {
    const stringValue = value !== undefined ? String(value) : withPlaceholder ? "__placeholder__" : undefined;
    
    const handleValueChange = (newValue: string) => {
        if (onChange) {
            if (newValue === "__placeholder__") {
                onChange(undefined);
            } else {
                // Find the item that matches the value
                const item = items.find(item => String(itemToValue(item)) === newValue);
                if (item) {
                    onChange(itemToValue(item));
                }
            }
        }
    };

    return (
        <Select 
            value={stringValue} 
            onValueChange={handleValueChange} 
            disabled={disabled}
        >
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={cn('', contentClassName)}>
                {withPlaceholder && (
                    <SelectItem value="__placeholder__" className="text-muted-foreground cursor-pointer">
                        {placeholder}
                    </SelectItem>
                )}
                {items.map((item) => (
                    <SelectItem 
                        key={itemToKey(item)} 
                        value={String(itemToValue(item))} 
                        disabled={isItemDisabled ? isItemDisabled(item) : false}
                        className="cursor-pointer"
                    >
                        {renderItem ? renderItem(item) : String(itemToValue(item))}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
} 