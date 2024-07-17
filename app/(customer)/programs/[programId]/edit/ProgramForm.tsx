"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgramSchema, ProgramType } from "./program.schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createProgramAction, updateProgramAction } from "./program.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { uploadImageAction } from "@/features/upload/upload.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

export type ProgramFormProps = {
    defaultValues?: ProgramType;
    programId?: string;
};

export const ProgramForm = (props: ProgramFormProps) => {
    const form = useZodForm({
        schema: ProgramSchema,
        defaultValues: props.defaultValues,
    });

    const isCreate = !Boolean(props.defaultValues);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (values: ProgramType) => {
            const { data, serverError } = isCreate 
                ? await createProgramAction(values) 
                : await updateProgramAction({
                    id: props.programId ?? "-",
                    data: values,
                });
            if (serverError || !data) {
                toast.error(serverError);
                return;
            }

            router.push(`/programs/${data.id}`);
            router.refresh();
        }
    });

    const submitImage = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.set("file", file);
            const { data, serverError } = await uploadImageAction(formData);

            if (!data || serverError) {
                toast.error(serverError);
                return;
            }

            const url = data.url;
            form.setValue("image", url);
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {isCreate ? "Create program" : `Edit program ${props.defaultValues?.name}`}
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
                                <FormDescription>The slug is used in the URL of the program</FormDescription>
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
                                <div className="flex items-center gap-4">
                                    <FormControl className="flex-1">
                                        <Input type="file" placeholder="url image" onChange={e => {
                                            const file = e.target.files?.[0];

                                            if (!file) {
                                                return;
                                            }

                                            if (file.size > 1024 * 1024) {
                                                toast.error("File is too big");
                                                return;
                                            }

                                            if (!file.type.includes("image")) {
                                                toast.error("File is not an image");
                                                return;
                                            }

                                            submitImage.mutate(file);
                                        }} />
                                    </FormControl>
                                    {submitImage.isPending ? (
                        <Loader2 className="h-6 animate-spin" />
                      ) : null}
                                    {field.value ? (
                                        <Avatar className="rounded-sm">
                                        <AvatarFallback>{field.value[0]}</AvatarFallback>
                                        <AvatarImage src={field.value} />
                                      </Avatar>
                                    ) : null}
                                </div>
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
                                    <Input placeholder="description.." {...field} value={field.value ?? ''} />
                                </FormControl>
                                <FormDescription>The description of the program</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">
                        {isCreate ? "Create program" : "Save program"}
                    </Button>
                </Form>
            </CardContent>
        </Card>
    );
};
