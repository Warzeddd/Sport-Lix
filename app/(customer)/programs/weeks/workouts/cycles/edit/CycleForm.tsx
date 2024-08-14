// "use client"

import { DatePickerWithRange } from "./DatePickerWithRange";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CycleSchema, CycleType } from "./cycle.schema";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// export type CycleFormProps = {
//     defaultValues?: CycleType
// };

// export const CycleForm = (props: CycleFormProps) => {
    // const [date, setDate] = React.useState<DateRange | undefined>()

    
//     const form = useZodForm({
//         schema: CycleSchema,
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
//                         name="cycleId"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Select cycle</FormLabel>
//                               
{/* <DatePickerWithRange date = {date} setDate = {setDate} /> */}
//                             </FormItem>
//                         )}
//                     />
//                     <Button>
//                         {isCreate ? "Create cycle" : "Save cycle"}
//                     </Button>
//                 </Form>
//             </CardContent>
//         </Card>
//     )
// }
