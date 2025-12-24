import { Provider as ReduxProvider } from 'react-redux';
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { ThemeCustomizationProvider } from '@/components/theme';
import Routers from '@/Routers';
// import { OpenAPI } from '@/api/client';
import axios from 'axios';

// OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL;

const queryClient = new QueryClient();

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.clear();
            window.location.replace('/');
        }
        return Promise.reject(
            error instanceof Error ? error : new Error(error?.message || 'Unknown error')
        );
    }
);

function App() {
    return (
        <div className="w-screen h-screen">
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            <ThemeCustomizationProvider />
                            <TooltipProvider>
                                <Toaster />
                                <Routers />
                            </TooltipProvider>
                        </ThemeProvider>
                    </QueryClientProvider>
                </PersistGate>
            </ReduxProvider>
        </div>
    );
}

export default App;
