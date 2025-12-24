import * as React from 'react';

/**
 * Breakpoints:
 * - mobile: < 768px (phones / small devices)
 * - tablet: 768px to 1023px (medium screens)
 * - desktop: >= 1024px (large / desktop screens)
 */

const MOBILE_MAX_WIDTH = 767; // <768px
const DESKTOP_MIN_WIDTH = 1024; // >=1024px

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const getBreakpoint = (): Breakpoint => {
    if (typeof window === 'undefined') return 'mobile';
    const width = window.innerWidth;
    if (width < MOBILE_MAX_WIDTH + 1) return 'mobile';
    if (width >= DESKTOP_MIN_WIDTH) return 'desktop';
    return 'tablet';
};

export function useBreakpoint() {
    const [breakpoint, setBreakpoint] = React.useState<Breakpoint>(getBreakpoint);

    React.useEffect(() => {
        const handleResize = () => setBreakpoint(getBreakpoint());
        window.addEventListener('resize', handleResize);
        // Sync once on mount in case of hydration mismatch
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = breakpoint === 'mobile';
    const isTablet = breakpoint === 'tablet';
    const isDesktop = breakpoint === 'desktop';

    return { breakpoint, isMobile, isTablet, isDesktop };
}
