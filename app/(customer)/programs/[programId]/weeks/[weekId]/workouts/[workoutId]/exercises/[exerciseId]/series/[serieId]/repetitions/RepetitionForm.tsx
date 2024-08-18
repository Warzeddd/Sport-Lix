"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RepetitionSchema, RepetitionType } from "./repetition.schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createRepetitionAction, updateRepetitionAction } from "./repetition.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type RepetitionFormProps = {
    defaultValues?: RepetitionType;  // Optional default values for editing
    repetitionId?: string;           // Optional repetition ID for updates
    seriesId?: string;               // Optional series ID, if needed
};

export const RepetitionForm = (props: RepetitionFormProps) => {
    const form = useZodForm({
        schema: RepetitionSchema,
        defaultValues: props.defaultValues,
    });

    const isCreate = !props.defaultValues;  // Check if creating a new repetition
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (values: RepetitionType) => {
            const repetitionData = { ...values, seriesId: props.seriesId };
            console.log(repetitionData)
            const { data, serverError } = isCreate
                ? await createRepetitionAction(repetitionData)
                : await updateRepetitionAction({
                    id: props.repetitionId ?? "-",  // Use provided repetitionId or fallback to "-"
                    data: repetitionData,
                });

            if (serverError || !data) {
                toast.error(serverError ?? "An error occurred");
                return;
            }

            toast.success(isCreate ? "Repetition created successfully" : "Repetition updated successfully");
            router.refresh();  // Refresh page after mutation
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {isCreate
                        ? "Create repetition"
                        : `Edit repetition ${props.defaultValues?.repetition}`}
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
                        name="repetition"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Repetition number" {...field} />
                                </FormControl>
                                <FormDescription>The number of the repetition.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Order</FormLabel>
                                <FormControl>
                                    <Input placeholder="Repetition description" {...field} />
                                </FormControl>
                                <FormDescription>The description of the repetition.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="seriesId"
                        render={() => (
                            <FormItem className="hidden">
                                <FormControl>
                                    <Input type="hidden" value={props.seriesId} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {isCreate ? "Create repetition" : "Save repetition"}
                    </Button>
                </Form>
            </CardContent>
        </Card>
    );
};
