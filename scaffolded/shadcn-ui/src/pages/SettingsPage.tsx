import { Typography } from '@/components/ui-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useUser } from '@/store/user-slice';
import CurrentUserAvatar from '@/components/app/CurrentUserAvatar';
import { User, Calendar, Key, Bell, Shield, Globe, Palette } from 'lucide-react';
import { ThemeCustomizer } from '@/components/theme';
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard';

/**
 * Settings page component - User profile and settings management
 */
export default function SettingsPage() {
    const user = useUser();

    // Format date for display
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
                <Typography variant="h1" className="font-bold text-foreground">
                    Settings
                </Typography>
                <Typography variant="p" className="text-muted-foreground">
                    Manage your account settings and preferences.
                </Typography>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="mt-6">
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Your personal information and profile details.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <CurrentUserAvatar className="h-24 w-24" />
                                    <div className="flex flex-col gap-1">
                                        <Typography variant="h3" className="font-semibold">
                                            {user.firstname} {user.lastname}
                                        </Typography>
                                        <Typography
                                            variant="p"
                                            className="text-muted-foreground text-sm"
                                        >
                                            {user.initials}
                                        </Typography>
                                        <Button variant="outline" size="sm" className="w-fit">
                                            Change Avatar
                                        </Button>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstname">First Name</Label>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="firstname"
                                                value={user.firstname}
                                                readOnly
                                                className="bg-muted"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastname">Last Name</Label>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="lastname"
                                                value={user.lastname}
                                                readOnly
                                                className="bg-muted"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="user-id">User ID</Label>
                                    <div className="flex items-center gap-2">
                                        <Key className="h-4 w-4 text-muted-foreground" />
                                        <div className="relative flex-1">
                                            <Input
                                                id="user-id"
                                                value={user.idx}
                                                readOnly
                                                className="bg-muted font-mono text-sm pr-10"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                <CopyToClipboard
                                                    textToCopy={user.idx}
                                                    mode="icon"
                                                    iconSize="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Account Tab */}
                <TabsContent value="account" className="mt-6">
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Details</CardTitle>
                                <CardDescription>
                                    View your account information and activity.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <Label className="text-sm font-medium">
                                                    Account Created
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatDate(user.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <Label className="text-sm font-medium">
                                                    Last Updated
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatDate(user.updated_at)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <div>
                                        <Typography variant="h4" className="mb-4 font-semibold">
                                            Security
                                        </Typography>
                                        <div className="space-y-3">
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start"
                                            >
                                                <Key className="mr-2 h-4 w-4" />
                                                Change Password
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start"
                                            >
                                                <Shield className="mr-2 h-4 w-4" />
                                                Two-Factor Authentication
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="mt-6">
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                                <CardDescription>
                                    Customize your application preferences and notifications.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <Typography variant="h4" className="mb-4 font-semibold">
                                            Theme
                                        </Typography>
                                        <div className="rounded-lg border p-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Palette className="h-5 w-5 text-muted-foreground" />
                                                <div>
                                                    <Label className="text-sm font-medium">
                                                        Customize Theme
                                                    </Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Adjust colors, radius, and mode to match
                                                        your preferences
                                                    </p>
                                                </div>
                                            </div>
                                            <ThemeCustomizer />
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <Typography variant="h4" className="mb-4 font-semibold">
                                            Notifications
                                        </Typography>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between rounded-lg border p-4">
                                                <div className="flex items-center gap-3">
                                                    <Bell className="h-5 w-5 text-muted-foreground" />
                                                    <div>
                                                        <Label className="text-sm font-medium">
                                                            Email Notifications
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Receive email updates about your account
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Configure
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <div>
                                            <Typography variant="h4" className="mb-4 font-semibold">
                                                Language & Region
                                            </Typography>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between rounded-lg border p-4">
                                                    <div className="flex items-center gap-3">
                                                        <Globe className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <Label className="text-sm font-medium">
                                                                Language
                                                            </Label>
                                                            <p className="text-sm text-muted-foreground">
                                                                English (US)
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm">
                                                        Change
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
