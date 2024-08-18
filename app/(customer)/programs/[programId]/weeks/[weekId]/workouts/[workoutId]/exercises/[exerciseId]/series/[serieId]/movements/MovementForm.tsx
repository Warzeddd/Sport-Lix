// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { MovementSchema, MovementType } from "./movement.schema";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useMutation } from "@tanstack/react-query";
// import { createMovementAction, updateMovementAction } from "./movement.action";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// export type MovementFormProps = {
//     defaultValues?: MovementType;  // Optional default values for editing
//     movementId?: string;           // Optional movement ID for updates
//     seriesId?: string;             // Optional series ID, if needed
// };

// export const MovementForm = (props: MovementFormProps) => {
//     const form = useZodForm({
//         schema: MovementSchema,
//         defaultValues: props.defaultValues,
//     });

//     const isCreate = !props.defaultValues;  // Check if creating a new movement
//     const router = useRouter();

//     const mutation = useMutation({
//         mutationFn: async (values: MovementType) => {
//             const movementData = { ...values, seriesId: props.seriesId };
//             console.log(movementData)
//             const { data, serverError } = isCreate
//                 ? await createMovementAction(movementData)
//                 : await updateMovementAction({
//                     id: props.movementId ?? "-",  // Use provided movementId or fallback to "-"
//                     data: movementData,
//                 });

//             if (serverError || !data) {
//                 toast.error(serverError ?? "An error occurred");
//                 return;
//             }

//             toast.success(isCreate ? "Movement created successfully" : "Movement updated successfully");
//             router.refresh();  // Refresh page after mutation
//         }
//     });

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>
//                     {isCreate
//                         ? "Create movement"
//                         : `Edit movement ${props.defaultValues?.name}`}
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
//                                     <Input placeholder="Movement name" {...field} />
//                                 </FormControl>
//                                 <FormDescription>The name of the movement.</FormDescription>
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
//                                     <Input placeholder="Movement order" {...field} />
//                                 </FormControl>
//                                 <FormDescription>The order of the movement.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={form.control}
//                         name="seriesId"
//                         render={() => (
//                             <FormItem className="hidden">
//                                 <FormControl>
//                                     <Input type="hidden" value={props.seriesId} />
//                                 </FormControl>
//                             </FormItem>
//                         )}
//                     />
//                     <Button type="submit">
//                         {isCreate ? "Create movement" : "Save movement"}
//                     </Button>
//                 </Form>
//             </CardContent>
//         </Card>
//     );
// };
