import { useState } from 'react';
import { Typography } from '@/components/ui-system';
import { Button } from '@/components/ui/button';
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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from '@/components/ui/calendar';
import { Info, CheckCircle2, XCircle, Bold, Italic, Underline, Star } from 'lucide-react';

/**
 * Components showcase page
 * Displays all available shadcn UI components with examples
 */
export default function ComponentsPage() {
    const [switchChecked, setSwitchChecked] = useState(false);
    const [sliderValue, setSliderValue] = useState([50]);
    const [radioValue, setRadioValue] = useState('option1');

    return (
        <div className="flex flex-col gap-8 p-6">
            <div className="flex flex-col gap-2">
                <Typography variant="h1" className="font-bold text-foreground">
                    Components Showcase
                </Typography>
                <Typography variant="p" className="text-muted-foreground">
                    Browse all available shadcn UI components with live examples.
                </Typography>
            </div>

            <Tabs defaultValue="buttons" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
                    <TabsTrigger value="buttons">Buttons</TabsTrigger>
                    <TabsTrigger value="forms">Forms</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    <TabsTrigger value="overlays">Overlays</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                </TabsList>

                {/* Buttons Tab */}
                <TabsContent value="buttons" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Buttons</CardTitle>
                            <CardDescription>Various button styles and variants</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <Button>Default</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="link">Link</Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button size="sm">Small</Button>
                                <Button size="default">Default</Button>
                                <Button size="lg">Large</Button>
                                <Button size="icon">
                                    <Star className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button disabled>Disabled</Button>
                                <Button variant="outline" disabled>
                                    Disabled Outline
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Toggle</CardTitle>
                            <CardDescription>Toggle button component</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <Toggle aria-label="Toggle bold">
                                    <Bold className="h-4 w-4" />
                                </Toggle>
                                <Toggle aria-label="Toggle italic">
                                    <Italic className="h-4 w-4" />
                                </Toggle>
                                <Toggle aria-label="Toggle underline">
                                    <Underline className="h-4 w-4" />
                                </Toggle>
                            </div>
                            <ToggleGroup type="multiple" defaultValue={['bold']}>
                                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                                    <Bold className="h-4 w-4" />
                                </ToggleGroupItem>
                                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                                    <Italic className="h-4 w-4" />
                                </ToggleGroupItem>
                                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                                    <Underline className="h-4 w-4" />
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Forms Tab */}
                <TabsContent value="forms" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Form Inputs</CardTitle>
                            <CardDescription>Text inputs and form controls</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="input-example">Input</Label>
                                <Input id="input-example" placeholder="Enter text..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="textarea-example">Textarea</Label>
                                <Textarea
                                    id="textarea-example"
                                    placeholder="Enter multiline text..."
                                    rows={4}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="select-example">Select</Label>
                                <Select>
                                    <SelectTrigger id="select-example">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="option1">Option 1</SelectItem>
                                        <SelectItem value="option2">Option 2</SelectItem>
                                        <SelectItem value="option3">Option 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Checkboxes & Switches</CardTitle>
                            <CardDescription>Selection controls</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="checkbox-example" />
                                <Label htmlFor="checkbox-example">
                                    Accept terms and conditions
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="switch-example"
                                    checked={switchChecked}
                                    onCheckedChange={setSwitchChecked}
                                />
                                <Label htmlFor="switch-example">Enable notifications</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Radio Group</CardTitle>
                            <CardDescription>Radio button selection</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option1" id="option1" />
                                    <Label htmlFor="option1">Option 1</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option2" id="option2" />
                                    <Label htmlFor="option2">Option 2</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option3" id="option3" />
                                    <Label htmlFor="option3">Option 3</Label>
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Slider</CardTitle>
                            <CardDescription>Range input slider</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Slider
                                value={sliderValue}
                                onValueChange={setSliderValue}
                                max={100}
                                step={1}
                            />
                            <Typography variant="p" className="text-sm text-muted-foreground">
                                Value: {sliderValue[0]}
                            </Typography>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Feedback Tab */}
                <TabsContent value="feedback" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Alerts</CardTitle>
                            <CardDescription>Alert messages and notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>Info</AlertTitle>
                                <AlertDescription>
                                    This is an informational alert message.
                                </AlertDescription>
                            </Alert>
                            <Alert variant="default">
                                <CheckCircle2 className="h-4 w-4" />
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>
                                    Operation completed successfully.
                                </AlertDescription>
                            </Alert>
                            <Alert variant="destructive">
                                <XCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    Something went wrong. Please try again.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Progress</CardTitle>
                            <CardDescription>Progress indicators</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Progress value={33} />
                            <Progress value={66} />
                            <Progress value={100} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Skeleton</CardTitle>
                            <CardDescription>Loading placeholders</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <Skeleton className="h-12 w-12 rounded-full" />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Overlays Tab */}
                <TabsContent value="overlays" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dialog</CardTitle>
                            <CardDescription>Modal dialogs</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Open Dialog</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Dialog Title</DialogTitle>
                                        <DialogDescription>
                                            This is a dialog description. You can add any content
                                            here.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <Typography variant="p">
                                            Dialog content goes here.
                                        </Typography>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline">Cancel</Button>
                                        <Button>Confirm</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Alert Dialog</CardTitle>
                            <CardDescription>Confirmation dialogs</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Delete Item</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently
                                            delete the item.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Popover</CardTitle>
                            <CardDescription>Popover tooltips</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">Open Popover</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Typography variant="p" className="text-sm">
                                        This is a popover content. You can add any content here.
                                    </Typography>
                                </PopoverContent>
                            </Popover>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tooltip</CardTitle>
                            <CardDescription>Tooltip hints</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline">Hover me</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>This is a tooltip</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Hover Card</CardTitle>
                            <CardDescription>Hover card component</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="link">@username</Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <div className="flex justify-between space-x-4">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <Typography
                                                variant="h4"
                                                className="text-sm font-semibold"
                                            >
                                                @username
                                            </Typography>
                                            <Typography
                                                variant="p"
                                                className="text-xs text-muted-foreground"
                                            >
                                                User description goes here.
                                            </Typography>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Data Tab */}
                <TabsContent value="data" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Badges</CardTitle>
                            <CardDescription>Status badges and labels</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                <Badge>Default</Badge>
                                <Badge variant="secondary">Secondary</Badge>
                                <Badge variant="destructive">Destructive</Badge>
                                <Badge variant="outline">Outline</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Avatar</CardTitle>
                            <CardDescription>User avatars</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Accordion</CardTitle>
                            <CardDescription>Collapsible content sections</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It adheres to the WAI-ARIA design pattern.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It comes with default styles that match the other
                                        components.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It's animated by default, but you can disable it if
                                        needed.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Calendar</CardTitle>
                            <CardDescription>Date picker calendar</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Calendar mode="single" className="rounded-md border" />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Layout Tab */}
                <TabsContent value="layout" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Separator</CardTitle>
                            <CardDescription>Visual dividers</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Typography variant="p">Content above</Typography>
                                <Separator className="my-4" />
                                <Typography variant="p">Content below</Typography>
                            </div>
                            <Separator orientation="vertical" className="h-12" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Scroll Area</CardTitle>
                            <CardDescription>Custom scrollable area</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-32 w-full rounded border p-4">
                                <div className="space-y-2">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <Typography key={i} variant="p" className="text-sm">
                                            Item {i + 1}
                                        </Typography>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Cards</CardTitle>
                            <CardDescription>Card container component</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Typography variant="p">Card content goes here.</Typography>
                                </CardContent>
                                <CardFooter>
                                    <Button>Action</Button>
                                </CardFooter>
                            </Card>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
