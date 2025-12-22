import { Typography } from '@/components/ui-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/store/auth-slice';

/**
 * Home page component - Template starter
 * Customize this page to fit your application needs
 */
export default function HomePage() {
    const user = useUser();


    const cardConfig = [
        {
            title: 'Getting Started',
            description: 'Start building your application by adding new routes and pages.',
            content: (
                <p className="text-sm text-muted-foreground">
                    Edit <code className="text-xs bg-muted px-1 py-0.5 rounded">src/config/routes.ts</code> to add new routes.
                </p>
            ),
        },
        {
            title: 'Components',
            description: 'Use shadcn/ui components to build your interface.',
            content: (
                <p className="text-sm text-muted-foreground">
                    Browse available components in <code className="text-xs bg-muted px-1 py-0.5 rounded">src/components/ui</code>.
                </p>
            ),
        },
        {
            title: 'Documentation',
            description: 'Check the documentation for more information.',
            content: (
                <p className="text-sm text-muted-foreground">
                    Visit the project README for setup and usage instructions.
                </p>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
                <Typography variant="h1" className="font-bold text-foreground">
                    Welcome{user?.firstname ? `, ${user.firstname}` : ''}!
                </Typography>
                <Typography variant="p" className="text-muted-foreground">
                    This is your home page. Customize it to fit your application needs.
                </Typography>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cardConfig.map((card) => (
                    <Card key={card.title} className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                            <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {card.content}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
