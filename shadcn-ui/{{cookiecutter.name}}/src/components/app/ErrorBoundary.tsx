import React, { Component, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Typography } from '@/components/ui-system';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * Enhanced Error Boundary component with better UI
 * Catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to console in development
        if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }

        // Call optional error handler
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // In production, you might want to log to an error reporting service
        // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
        });
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="flex min-h-screen items-center justify-center p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                                <CardTitle>Something went wrong</CardTitle>
                            </div>
                            <CardDescription>
                                An unexpected error occurred. Please try again or contact support if
                                the problem persists.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {import.meta.env.DEV && this.state.error && (
                                <div className="rounded-md bg-muted p-3">
                                    <Typography variant="note" className="font-mono text-xs">
                                        {this.state.error.toString()}
                                    </Typography>
                                    {this.state.error.stack && (
                                        <details className="mt-2">
                                            <summary className="cursor-pointer text-xs text-muted-foreground">
                                                Stack trace
                                            </summary>
                                            <pre className="mt-2 overflow-auto text-xs">
                                                {this.state.error.stack}
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button onClick={this.handleReset} variant="default" className="flex-1">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Try Again
                            </Button>
                            <Button
                                onClick={this.handleGoHome}
                                variant="outline"
                                className="flex-1"
                            >
                                <Home className="mr-2 h-4 w-4" />
                                Go Home
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}
