import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/app/EmptyState';
import { ROUTE_PATHS } from '@/config/routes';

type NotFoundPageProps = Readonly<{
    title?: string;
    redirectTo?: string;
    message?: string;
    imageSrc?: string;
    backToSiteText?: string;
}>;

export default function NotFoundPage({
    redirectTo = ROUTE_PATHS.HOME,
    message = 'Non siamo riusciti a trovare la pagina che stavi cercando. Potrebbe essere stata spostata o eliminata.',
    title = '404 Pagina Non Trovata',
    imageSrc = '/pug.svg',
    backToSiteText = 'Torna al sito',
}: NotFoundPageProps) {
    return (
        <div className="flex flex-col items-center h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <EmptyState
                imageSrc={imageSrc}
                imageClassName="w-48 md:w-56 lg:w-64 mb-2"
                className="text-center"
                title={title}
                message={message}
            >
                <Link
                    to={redirectTo}
                    className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                    {backToSiteText}
                </Link>
            </EmptyState>
        </div>
    );
}
