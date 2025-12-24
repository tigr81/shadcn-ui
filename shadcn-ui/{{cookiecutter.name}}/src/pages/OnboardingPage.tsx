import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegisterUser } from '@/api/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { getApiErrorMessage } from '@/api/helpers';
import { ROUTE_PATHS } from '@/config/routes';

const onboardingSchema = z.object({
    firstname: z
        .string()
        .min(1, 'Nome è obbligatorio')
        .max(255, 'Nome deve essere meno di 255 caratteri'),
    lastname: z
        .string()
        .min(1, 'Cognome è obbligatorio')
        .max(255, 'Cognome deve essere meno di 255 caratteri'),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

export function OnboardingPage() {
    const [isMounted, setIsMounted] = useState(false);

    const navigate = useNavigate();
    const { registerUserMutation, isLoading, isError, isSuccess } = useRegisterUser(() => {
        navigate(ROUTE_PATHS.HOME);
    });
    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnboardingFormData>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
        },
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onSubmit = (data: OnboardingFormData) => {
        registerUserMutation.mutateAsync({
            firstname: data.firstname,
            lastname: data.lastname,
        });
    };

    return (
        <div className="flex flex-col h-full items-center justify-center gap-5 p-6">
            <Card
                className={cn(
                    'w-full max-w-md transition-all duration-700 ease-out transform',
                    isMounted ? 'opacity-100 -translate-y-28' : 'opacity-0 translate-y-28'
                )}
            >
                <CardHeader>
                    <CardTitle>Completa il tuo profilo</CardTitle>
                    <CardDescription>
                        Completa i tuoi dettagli per iniziare.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="firstname" className="text-sm font-medium">
                                Nome
                            </label>
                            <Input
                                id="firstname"
                                {...register('firstname')}
                                placeholder="Inserisci il tuo nome"
                                className={cn(
                                    errors.firstname &&
                                        'border-destructive focus-visible:ring-destructive'
                                )}
                            />
                            {errors.firstname && (
                                <p className="text-sm text-destructive">
                                    {errors.firstname.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lastname" className="text-sm font-medium">
                                Cognome
                            </label>
                            <Input
                                id="lastname"
                                {...register('lastname')}
                                placeholder="Inserisci il tuo cognome"
                                className={cn(
                                    errors.lastname &&
                                        'border-destructive focus-visible:ring-destructive'
                                )}
                            />
                            {errors.lastname && (
                                <p className="text-sm text-destructive">
                                    {errors.lastname.message}
                                </p>
                            )}
                        </div>

                        {isError && (
                            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                                {getApiErrorMessage(registerUserMutation.error, 'Si è verificato un errore durante la creazione del profilo.')}
                            </div>
                        )}

                        {isSuccess && (
                            <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                                Profilo creato con successo!
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Creazione profilo...' : 'Completa l\'onboarding'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
