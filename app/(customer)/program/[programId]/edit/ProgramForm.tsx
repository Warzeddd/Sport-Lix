"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgramSchema, ProgramType } from "./program.schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createProgramAction, updateProgramAction } from "./program.action";
import { toast } from "sonner";
import { useRouter } from "next/router";

export type ProgramFormProps = {
    defaultValues?: ProgramType
    programId?: string;
};

export const ProgramForm = (props: ProgramFormProps) => {
    const form = useZodForm({
        schema: ProgramSchema,
        defaultValues: props.defaultValues,
    })

    const isCreate = !Boolean(props.defaultValues);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (values: ProgramType) => {
            const {data, serverError} = isCreate ? await createProgramAction(values) : 
            await updateProgramAction({
                id: props.programId ?? "-",
                data: values,
        });
            if(serverError || !data) {
                toast.error(serverError);
                return;
            }

            toast.success("Program created");

            router.push(`/program/${data.id}`)
        }
        
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {isCreate
                        ? "Create product"
                        : `Edit product ${props.defaultValues?.name}`}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form
                    className="flex flex-col gap-4"
                    form={form}
                    onSubmit={async (values) => {
                        await mutation.mutateAsync(values)
                    }}>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Push Pull Leg" {...field} />
                                </FormControl>
                                <FormDescription>The name of program.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="Push Pull Leg" {...field} onChange={e => {
                                        const value = e.target.value
                                        .replaceAll(" ", "-")
                                        .toLowerCase();

                                        field.onChange(value);
                                    }} />
                                </FormControl>
                                <FormDescription>The slug is used in the URL of the program </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input placeholder="url image" {...field} value={field.value ?? ''}  />
                                </FormControl>
                                <FormDescription>The URL of your image</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="description.." {...field} value={field.value ?? ''}  />
                                </FormControl>
                                <FormDescription>The description of the program</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button>
                        {isCreate ? "Create program" : "Save program"}
                    </Button>
                </Form>
            </CardContent>
        </Card>
    )
}