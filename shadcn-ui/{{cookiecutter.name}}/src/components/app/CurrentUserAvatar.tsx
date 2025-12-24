import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useUser } from '@/store/user-slice';

type CurrentUserAvatarProps = Readonly<{
    className?: string;
    avatarFallbackClassName?: string;
}>;

export default function CurrentUserAvatar({ className, avatarFallbackClassName }: CurrentUserAvatarProps) {
    const user = useUser();

    return (
        <Avatar className={cn('h-8 w-8 rounded-lg', className)}>
            <AvatarFallback className={cn("rounded-lg text-xs", avatarFallbackClassName)}>
                {user.initials}
            </AvatarFallback>
        </Avatar>
    );
}