import { useState } from 'react';
import { CreateTagDialogForm } from '@/components/forms/example-usage';
import { Typography } from '@/components/ui-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Form page component - Comprehensive form examples
 * Demonstrates various form field types and patterns
 */
export default function FormPage() {
    const [switchValue, setSwitchValue] = useState(false);
    const [radioValue, setRadioValue] = useState('option1');

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
                <Typography variant="h1" className="font-bold text-foreground">
                    Forms
                </Typography>
                <Typography variant="p" className="text-muted-foreground">
                    Examples of form components and patterns.
                </Typography>
            </div>

            <Tabs defaultValue="basic" className="w-full">
                <TabsList>
                    <TabsTrigger value="basic">Basic Form</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced Form</TabsTrigger>
                    <TabsTrigger value="dialog">Dialog Form</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Form Fields</CardTitle>
                            <CardDescription>Standard form input components</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First Name</Label>
                                    <Input id="first-name" placeholder="Enter first name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last Name</Label>
                                    <Input id="last-name" placeholder="Enter last name" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter email address" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Enter your message" rows={4} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Select>
                                    <SelectTrigger id="country">
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us">United States</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                        <SelectItem value="ca">Canada</SelectItem>
                                        <SelectItem value="au">Australia</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button>Submit</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Advanced Form Fields</CardTitle>
                            <CardDescription>Additional form controls and patterns</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="notifications"
                                        checked={switchValue}
                                        onCheckedChange={setSwitchValue}
                                    />
                                    <Label htmlFor="notifications">
                                        Enable email notifications
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <Label htmlFor="terms">
                                        I agree to the terms and conditions
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="marketing" />
                                    <Label htmlFor="marketing">Receive marketing emails</Label>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <Label>Preferred Contact Method</Label>
                                <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="email" id="email" />
                                        <Label htmlFor="email">Email</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="phone" id="phone" />
                                        <Label htmlFor="phone">Phone</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="sms" id="sms" />
                                        <Label htmlFor="sms">SMS</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Separator />

                            <div className="flex gap-2">
                                <Button>Save Changes</Button>
                                <Button variant="outline">Cancel</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="dialog" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dialog Form Example</CardTitle>
                            <CardDescription>Form inside a dialog modal</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CreateTagDialogForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
