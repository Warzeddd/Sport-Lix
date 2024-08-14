// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { WeekSchema, WeekType } from "./week.schema";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useMutation } from "@tanstack/react-query";
// import { createWeekAction, updateWeekAction } from "./week.action";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// export type WeekFormProps = {
//     week?: WeekType;
//     programId?: string;
//     onClose: () => void;
// };

// export const WeekForm = ({ week, programId, onClose }: WeekFormProps) => {
//     const form = useZodForm({
//         schema: WeekSchema,
//         defaultValues: week,
//     });

//     const isCreate = !Boolean(week);
//     const router = useRouter();

//     const mutation = useMutation({
//         mutationFn: async (values: WeekType) => {
//             const weekData = { ...values, programId }; // Ensure programId is included
//             console.log(weekData)
//             const { data, serverError } = isCreate 
//                 ? await createWeekAction(weekData) 
//                 : await updateWeekAction({
//                     id: week?.id ?? "-",
//                     data: weekData,
//                 });

//             if (serverError || !data) {
//                 toast.error(serverError);
//                 return;
//             }

//             toast.success(isCreate ? "Week created successfully" : "Week updated successfully");
//             router.refresh();
//             onClose();
//         }
//     });



//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>
//                     {isCreate
//                         ? "Create week"
//                         : `Edit week ${week?.name}`}
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
//                                     <Input placeholder="week of push" {...field} />
//                                 </FormControl>
//                                 <FormDescription>The name of week.</FormDescription>
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
//                                     <Input placeholder="order.." {...field} value={field.value ?? ''} />
//                                 </FormControl>
//                                 <FormDescription>The order of the week</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <Button>
//                         {isCreate ? "Create week" : "Save week"}
//                     </Button>
//                     <Button type="button" onClick={onClose}>
//                         Cancel
//                     </Button>
//                 </Form>
//             </CardContent>
//         </Card>
//     );
// };