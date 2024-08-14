// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { RepetitionSchema, RepetitionType } from "./repetition.schema";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// export type RepetitionFormProps = {
//     defaultValues?: RepetitionType
// };

// export const RepetitionForm = (props: RepetitionFormProps) => {
//     const form = useZodForm({
//         schema: RepetitionSchema,
//         defaultValues: props.defaultValues,
//     })

//     const isCreate = !Boolean(props.defaultValues);

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>
//                     {isCreate
//                         ? "Create product"
//                         : `Edit product ${props.defaultValues.name}`}
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <Form
//                     className="flex flex-col gap-4"
//                     form={form}
//                     onSubmit={async (values) => {
//                         console.log(values);
//                     }}>

//                     <FormField
//                         control={form.control}
//                         name="name"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Name</FormLabel>
//                                 <FormControl>
//                                     <Input placeholder="Push Pull Leg" {...field} />
//                                 </FormControl>
//                                 <FormDescription>The name of the program</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={form.control}
//                         name="repetitionId"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Repetitions</FormLabel>
//                                 <Select value={field.Value} onValueChange={field.onChange}>
//                                     <SelectTrigger>
//                                         <SelectValue></SelectValue>
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         {/* {Repetition.map(id) => (
//                                             <SelectItem value={id} key={id}>Repetition.movementid.name</SelectItem>
                                            
//     )} */}
//                                     </SelectContent>
//                                 </Select>
//                             </FormItem>
//                         )}
//                     />
//                     <Button>
//                         {isCreate ? "Create repetition" : "Save repetition"}
//                     </Button>
//                 </Form>
//             </CardContent>
//         </Card>
//     )
// }
