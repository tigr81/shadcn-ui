import { useEffect, useRef, type RefObject } from 'react';

/**
 * Custom hook that detects clicks outside of a referenced element
 * @param handler - Callback function to execute when click outside is detected
 * @returns A ref to attach to the element
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
    handler: () => void
): RefObject<T> {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [handler]);

    return ref;
}
