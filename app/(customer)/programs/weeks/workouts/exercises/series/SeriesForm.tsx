"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeriesSchema, SeriesType } from "./series.schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type SeriesFormProps = {
    defaultValues?: SeriesType
};

export const SeriesForm = (props: SeriesFormProps) => {
    const form = useZodForm({
        schema: SeriesSchema,
        defaultValues: props.defaultValues,
    })

    const isCreate = !Boolean(props.defaultValues);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {isCreate
                        ? "Create product"
                        : `Edit product ${props.defaultValues.name}`}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form
                    className="flex flex-col gap-4"
                    form={form}
                    onSubmit={async (values) => {
                        console.log(values);
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
                                <FormDescription>The name of the program</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button>
                        {isCreate ? "Create series" : "Save series"}
                    </Button>
                </Form>
            </CardContent>
        </Card>
    )
}
