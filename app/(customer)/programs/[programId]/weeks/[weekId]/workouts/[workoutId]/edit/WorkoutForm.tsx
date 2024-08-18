"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkoutSchema, WorkoutType } from "./workout.schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createWorkoutAction, updateWorkoutAction } from "./workout.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type WorkoutFormProps = {
    defaultValues?: WorkoutType;  // Optional default values for editing
    workoutId?: string;           // Optional workout ID for updates       // Function to close the form
    weekId?: string;        // Optional week ID, if needed
};

export const WorkoutForm = (props: WorkoutFormProps) => {
    const form = useZodForm({
        schema: WorkoutSchema,
        defaultValues: props.defaultValues,
    });

    const isCreate = !props.defaultValues;  // Check if creating a new workout
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (values: WorkoutType) => {
            const workoutData = { ...values, weekId: props.weekId };
            console.log(workoutData)
            const { data, serverError } = isCreate
                ? await createWorkoutAction(workoutData)
                : await updateWorkoutAction({
                    id: props.workoutId ?? "-",  // Use provided workoutId or fallback to "-"
                    data: workoutData,
                });

            if (serverError || !data) {
                toast.error(serverError ?? "An error occurred");
                return;
            }

            toast.success(isCreate ? "Workout created successfully" : "Workout updated successfully");
            router.refresh();  // Refresh page after mutation
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {isCreate
                        ? "Create workout"
                        : `Edit workout ${props.defaultValues?.name}`}
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
                                    <Input placeholder="Workout name" {...field} />
                                </FormControl>
                                <FormDescription>The name of the workout.</FormDescription>
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
                                    <Input placeholder="Workout order" {...field} />
                                </FormControl>
                                <FormDescription>The order of the workout.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="weekId"
                        render={() => (
                            <FormItem className="hidden">
                                <FormControl>
                                    <Input type="hidden" value={props.weekId} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {isCreate ? "Create workout" : "Save workout"}
                    </Button>
                </Form>
            </CardContent>
        </Card>
    );
};
