// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { SeriesSchema, SeriesType } from "./series.schema";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useMutation } from "@tanstack/react-query";
// import { createSeriesAction, updateSeriesAction } from "./series.action";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// export type SeriesFormProps = {
//     defaultValues?: SeriesType;  // Optional default values for editing
//     seriesId?: string;           // Optional series ID for updates
//     exerciseId?: string;         // Optional exercise ID, if needed
// };

// export const SeriesForm = (props: SeriesFormProps) => {
//     const form = useZodForm({
//         schema: SeriesSchema,
//         defaultValues: props.defaultValues,
//     });

//     const isCreate = !props.defaultValues;  // Check if creating a new series
//     const router = useRouter();

//     const mutation = useMutation({
//         mutationFn: async (values: SeriesType) => {
//             const seriesData = { ...values, exerciseId: props.exerciseId };
//             console.log(seriesData)
//             const { data, serverError } = isCreate
//                 ? await createSeriesAction(seriesData)
//                 : await updateSeriesAction({
//                     id: props.seriesId ?? "-",  // Use provided seriesId or fallback to "-"
//                     data: seriesData,
//                 });

//             if (serverError || !data) {
//                 toast.error(serverError ?? "An error occurred");
//                 return;
//             }

//             toast.success(isCreate ? "Series created successfully" : "Series updated successfully");
//             router.refresh();  // Refresh page after mutation
//         }
//     });

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>
//                     {isCreate
//                         ? "Create series"
//                         : `Edit series ${props.defaultValues?.name}`}
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <Form
//                     className="flex flex-col gap-4"
//                     form={form}
//                     onSubmit={async (values) => {
//                         await mutation.mutateAsync(values);
//                     }}>

//                     <FormField
//                         control={form.control}
//                         name="name"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Name</FormLabel>
//                                 <FormControl>
//                                     <Input placeholder="Series name" {...field} />
//                                 </FormControl>
//                                 <FormDescription>The name of the series.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={form.control}
//                         name="order"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Order</FormLabel>
//                                 <FormControl>
//                                     <Input placeholder="Series order" {...field} />
//                                 </FormControl>
//                                 <FormDescription>The order of the series.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={form.control}
//                         name="exerciseId"
//                         render={() => (
//                             <FormItem className="hidden">
//                                 <FormControl>
//                                     <Input type="hidden" value={props.exerciseId} />
//                                 </FormControl>
//                             </FormItem>
//                         )}
//                     />
//                     <Button type="submit">
//                         {isCreate ? "Create series" : "Save series"}
//                     </Button>
//                 </Form>
//             </CardContent>
//         </Card>
//     );
// };
