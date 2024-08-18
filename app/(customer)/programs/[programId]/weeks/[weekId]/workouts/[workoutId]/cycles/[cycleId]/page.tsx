// import { requiredCurrentUser } from "@/auth/current-user";
// import { Layout, LayoutTitle } from "@/components/layout";
// import { buttonVariants } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { prisma } from "@/prisma";
// import type { PageParams } from "@/types/next";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { DeleteButton } from "../../DeleteButton";
// import { deleteWeekAction } from "./edit/week.action";

// export default async function RoutePage(
//   props: PageParams<{ weekId: string , programId: string}>
// ) {
//   const user = await requiredCurrentUser();

//   const week = await prisma.week.findUnique({
//     where: {
//       id: props.params.weekId,
//       program: {
//         userId: user.id,
//       },
//     },
//     include: {
//       workouts: true, // Inclure les entraînements associés à la semaine
//     },
//   });

//   if (!week) {
//     notFound();
//   }
//   console.log(props.params.weekId)

//   return (
//     <Layout>
//       <div className="flex justify-between">
//         <div className="space-y-0.5">
//         <LayoutTitle>
//             <Link href={`../../${props.params.programId}`}>
//               <TableCell>{week.name}</TableCell>
//             </Link>
//           </LayoutTitle>
//         </div>

//         <div className="flex items-center gap-2">
//           <Link
//             href={`${week.id}/edit`}
//             className={buttonVariants({ size: "sm", variant: "secondary" })}
//           >
//             Edit
//           </Link>
//           <DeleteButton id={week.id} deleteAction={deleteWeekAction} />
//         </div>
//       </div>
//       <div className="flex gap-4 max-lg:flex-col">
//         <Card className="flex-1">
//           <CardHeader>
//             <CardTitle>Details</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col items-start gap-2">
//             <p>Order: {week.order}</p>
//           </CardContent>
//         </Card>
//         <Card className="flex-1">
//           <CardHeader>
//             <CardTitle>Workouts</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Order</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {week.workouts.map((workout) => (
//                   <TableRow key={workout.id}>
//                     <TableCell>
//                       <Link href={`${props.params.weekId}/workouts/${workout.id}`}>
//                         {workout.name}
//                       </Link>
//                     </TableCell>
//                     <TableCell>{workout.order}</TableCell>
//                   </TableRow>
//                 ))}
//                 <TableCell>
//                 <Link
//                         href={`${props.params.weekId}/workouts/new`}
//                         className="rounded-md border-2 border-dashed border-primary transition-colors hover:bg-accent/40">
//                         Create Workout
//                     </Link>
//                     </TableCell>
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </Layout>
//   );
// }
