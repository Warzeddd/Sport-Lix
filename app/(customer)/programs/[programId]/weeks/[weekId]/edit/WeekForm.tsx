"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeekSchema, WeekType } from "./week.schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createWeekAction, updateWeekAction } from "./week.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type WeekFormProps = {
    defaultValues?: WeekType;  // Optional default values for editing
    weekId?: string;           // Optional week ID for updates       // Function to close the form
    programId?: string;        // Optional program ID, if needed
};

export const WeekForm = (props: WeekFormProps) => {
    const form = useZodForm({
        schema: WeekSchema,
        defaultValues: props.defaultValues,
    });

    const isCreate = !props.defaultValues;  // Check if creating a new week
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (values: WeekType) => {
            const weekData = { ...values, programId: props.programId };
            console.log(weekData)
            const { data, serverError } = isCreate
                ? await createWeekAction(weekData)
                : await updateWeekAction({
                    id: props.weekId ?? "-",  // Use provided weekId or fallback to "-"
                    data: weekData,
                });

            if (serverError || !data) {
                toast.error(serverError ?? "An error occurred");
                return;
            }
            router.push(`/programs/${weekData.programId}/weeks/${data.id}`);
            toast.success(isCreate ? "Week created successfully" : "Week updated successfully");
            router.refresh();  // Refresh page after mutation
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {isCreate
                        ? "Create week"
                        : `Edit week ${props.defaultValues?.name}`}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form
                    className="flex flex-col gap-4"
                    form={form}
                    onSubmit={async (values) => {
                        await mutation.mutateAsync(values);
                    }}>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Week name" {...field} />
                                </FormControl>
                                <FormDescription>The name of the week.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="order"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Order</FormLabel>
                                <FormControl>
                                    <Input placeholder="Week order" {...field} />
                                </FormControl>
                                <FormDescription>The order of the week.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="programId"
                        render={() => (
                            <FormItem className="hidden">
                                <FormControl>
                                    <Input type="hidden" value={props.programId} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {isCreate ? "Create week" : "Save week"}
                    </Button>
                </Form>
            </CardContent>
        </Card>
    );
};
