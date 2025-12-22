import { Typography } from '@/components/ui-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';

/**
 * Dashboard page component - Data visualization and metrics
 * Demonstrates charts, cards, and dashboard patterns
 */
export default function DashboardPage() {
    // Sample data for charts
    const revenueData = [
        { name: 'Jan', value: 4000 },
        { name: 'Feb', value: 3000 },
        { name: 'Mar', value: 2000 },
        { name: 'Apr', value: 2780 },
        { name: 'May', value: 1890 },
        { name: 'Jun', value: 2390 },
    ];

    const salesData = [
        { name: 'Mon', sales: 4000, orders: 2400 },
        { name: 'Tue', sales: 3000, orders: 1398 },
        { name: 'Wed', sales: 2000, orders: 9800 },
        { name: 'Thu', sales: 2780, orders: 3908 },
        { name: 'Fri', sales: 1890, orders: 4800 },
        { name: 'Sat', sales: 2390, orders: 3800 },
        { name: 'Sun', sales: 3490, orders: 4300 },
    ];

    const stats = [
        {
            title: 'Total Revenue',
            value: '$45,231',
            change: '+20.1%',
            trend: 'up',
            icon: DollarSign,
        },
        { title: 'Active Users', value: '2,350', change: '+12.5%', trend: 'up', icon: Users },
        { title: 'Orders', value: '1,234', change: '-2.3%', trend: 'down', icon: ShoppingCart },
        { title: 'Activity', value: '89.2%', change: '+5.4%', trend: 'up', icon: Activity },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
                <Typography variant="h1" className="font-bold text-foreground">
                    Dashboard
                </Typography>
                <Typography variant="p" className="text-muted-foreground">
                    Overview of your metrics and analytics.
                </Typography>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    {stat.trend === 'up' ? (
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                    ) : (
                                        <TrendingDown className="h-3 w-3 text-red-500" />
                                    )}
                                    <span
                                        className={
                                            stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                        }
                                    >
                                        {stat.change}
                                    </span>
                                    <span>from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Charts */}
            <Tabs defaultValue="revenue" className="w-full">
                <TabsList>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="revenue" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Overview</CardTitle>
                            <CardDescription>Monthly revenue trends</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.6}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="sales" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales & Orders</CardTitle>
                            <CardDescription>Weekly sales and order comparison</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="sales" fill="#8884d8" />
                                    <Bar dataKey="orders" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Analytics</CardTitle>
                            <CardDescription>Performance metrics and trends</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Additional Cards */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Progress Overview</CardTitle>
                        <CardDescription>Task completion status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Project Alpha</span>
                                <span>75%</span>
                            </div>
                            <Progress value={75} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Project Beta</span>
                                <span>45%</span>
                            </div>
                            <Progress value={45} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Project Gamma</span>
                                <span>90%</span>
                            </div>
                            <Progress value={90} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates and events</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Typography variant="p" className="text-sm font-medium">
                                    New user registered
                                </Typography>
                                <Typography variant="p" className="text-xs text-muted-foreground">
                                    2 minutes ago
                                </Typography>
                            </div>
                            <Badge>New</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Typography variant="p" className="text-sm font-medium">
                                    Order completed
                                </Typography>
                                <Typography variant="p" className="text-xs text-muted-foreground">
                                    15 minutes ago
                                </Typography>
                            </div>
                            <Badge variant="secondary">Done</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Typography variant="p" className="text-sm font-medium">
                                    Payment received
                                </Typography>
                                <Typography variant="p" className="text-xs text-muted-foreground">
                                    1 hour ago
                                </Typography>
                            </div>
                            <Badge variant="outline">Success</Badge>
                        </div>
                        <Button variant="outline" className="w-full">
                            View All Activity
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
