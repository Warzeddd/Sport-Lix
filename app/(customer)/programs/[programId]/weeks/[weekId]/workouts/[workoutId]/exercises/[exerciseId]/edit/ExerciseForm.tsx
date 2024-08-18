"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExerciseSchema, ExerciseType } from "./exercise.schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createExerciseAction, updateExerciseAction } from "./exercise.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type ExerciseFormProps = {
    defaultValues?: ExerciseType;  // Optional default values for editing
    exerciseId?: string;           // Optional exercise ID for updates
    workoutId?: string;            // Optional workout ID, if needed
};

export const ExerciseForm = (props: ExerciseFormProps) => {
    const form = useZodForm({
        schema: ExerciseSchema,
        defaultValues: props.defaultValues,
    });

    const isCreate = !props.defaultValues;  // Check if creating a new exercise
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (values: ExerciseType) => {
            const exerciseData = { ...values, workoutId: props.workoutId };
            console.log(exerciseData)
            const { data, serverError } = isCreate
                ? await createExerciseAction(exerciseData)
                : await updateExerciseAction({
                    id: props.exerciseId ?? "-",  // Use provided exerciseId or fallback to "-"
                    data: exerciseData,
                });

            if (serverError || !data) {
                toast.error(serverError ?? "An error occurred");
                return;
            }

            toast.success(isCreate ? "Exercise created successfully" : "Exercise updated successfully");
            router.refresh();  // Refresh page after mutation
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {isCreate
                        ? "Create exercise"
                        : `Edit exercise ${props.defaultValues?.name}`}
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
                                    <Input placeholder="Exercise name" {...field} />
                                </FormControl>
                                <FormDescription>The name of the exercise.</FormDescription>
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
                                    <Input placeholder="Exercise order" {...field} />
                                </FormControl>
                                <FormDescription>The order of the exercise.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="workoutId"
                        render={() => (
                            <FormItem className="hidden">
                                <FormControl>
                                    <Input type="hidden" value={props.workoutId} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {isCreate ? "Create exercise" : "Save exercise"}
                    </Button>
                </Form>
            </CardContent>
        </Card>
    );
};
