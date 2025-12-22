import { useState } from 'react';
import { Typography } from '@/components/ui-system';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DialogForm, FormTextField } from '@/components/forms';
import { z } from 'zod';
import { Pencil, Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

/**
 * Example CRUD page - Template boilerplate
 *
 * This demonstrates a complete CRUD (Create, Read, Update, Delete) interface
 * Customize this to fit your application needs
 */

// Example data type
type Item = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
};

// Form schema for create/update
const itemSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
});

type ItemForm = z.infer<typeof itemSchema>;

// Mock data store (replace with your API calls)
const useItems = () => {
    const [items, setItems] = useState<Item[]>([
        {
            id: '1',
            name: 'Example Item 1',
            description: 'This is an example item',
            createdAt: new Date().toISOString(),
        },
        {
            id: '2',
            name: 'Example Item 2',
            description: 'Another example item',
            createdAt: new Date().toISOString(),
        },
    ]);

    const createItem = async (data: ItemForm): Promise<void> => {
        const newItem: Item = {
            id: Date.now().toString(),
            name: data.name,
            description: data.description || '',
            createdAt: new Date().toISOString(),
        };
        setItems((prev) => [...prev, newItem]);
    };

    const updateItem = async (id: string, data: ItemForm): Promise<void> => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, name: data.name, description: data.description || '' }
                    : item
            )
        );
    };

    const deleteItem = async (id: string): Promise<void> => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return { items, createItem, updateItem, deleteItem };
};

export default function CRUDPage() {
    const { items, createItem, updateItem, deleteItem } = useItems();
    const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

    const handleCreate = async (values: ItemForm) => {
        await createItem(values);
    };

    const handleUpdate = (id: string) => {
        return async (values: ItemForm) => {
            await updateItem(id, values);
        };
    };

    const handleDelete = async () => {
        if (deletingItemId) {
            await deleteItem(deletingItemId);
            setDeletingItemId(null);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <Typography variant="h1" className="font-bold text-foreground">
                        CRUD API
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground">
                        A complete CRUD (Create, Read, Update, Delete) interface example
                    </Typography>
                </div>
                <DialogForm<ItemForm>
                    schema={itemSchema}
                    defaultValues={{
                        name: '',
                        description: '',
                    }}
                    title="Create New Item"
                    description="Add a new item to the list"
                    triggerButton={{
                        label: 'Create Item',
                        variant: 'default',
                    }}
                    submitLabel="Create"
                    onSubmit={handleCreate}
                >
                    {(form) => (
                        <>
                            <FormTextField
                                form={form}
                                name="name"
                                label="Name"
                                placeholder="Enter item name"
                                description="A unique name for this item"
                            />
                            <FormTextField
                                form={form}
                                name="description"
                                label="Description"
                                placeholder="Enter description (optional)"
                            />
                        </>
                    )}
                </DialogForm>
            </div>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border rounded-md">
                    <Typography variant="p" className="text-muted-foreground mb-4">
                        No items found
                    </Typography>
                    <DialogForm<ItemForm>
                        schema={itemSchema}
                        defaultValues={{
                            name: '',
                            description: '',
                        }}
                        title="Create New Item"
                        description="Add a new item to get started"
                        triggerButton={{
                            label: 'Create First Item',
                            variant: 'default',
                        }}
                        submitLabel="Create"
                        onSubmit={handleCreate}
                    >
                        {(form) => (
                            <>
                                <FormTextField
                                    form={form}
                                    name="name"
                                    label="Name"
                                    placeholder="Enter item name"
                                />
                                <FormTextField
                                    form={form}
                                    name="description"
                                    label="Description"
                                    placeholder="Enter description (optional)"
                                />
                            </>
                        )}
                    </DialogForm>
                </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {item.description || '-'}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <DialogForm<ItemForm>
                                                schema={itemSchema}
                                                defaultValues={{
                                                    name: item.name,
                                                    description: item.description,
                                                }}
                                                title="Edit Item"
                                                description="Update the item details"
                                                trigger={
                                                    <Button variant="ghost" size="icon">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                }
                                                submitLabel="Update"
                                                onSubmit={handleUpdate(item.id)}
                                            >
                                                {(form) => (
                                                    <>
                                                        <FormTextField
                                                            form={form}
                                                            name="name"
                                                            label="Name"
                                                            placeholder="Enter item name"
                                                        />
                                                        <FormTextField
                                                            form={form}
                                                            name="description"
                                                            label="Description"
                                                            placeholder="Enter description (optional)"
                                                        />
                                                    </>
                                                )}
                                            </DialogForm>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setDeletingItemId(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Delete confirmation dialog */}
            <AlertDialog
                open={deletingItemId !== null}
                onOpenChange={(open) => !open && setDeletingItemId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the item.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
