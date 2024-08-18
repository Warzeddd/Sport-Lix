// import { Layout, LayoutTitle } from "@/components/layout";
// import { requiredCurrentUser } from "@/auth/current-user";
// import { prisma } from "@/prisma";
// import { notFound } from "next/navigation";
// import { PageParams } from "@/types/next";
// import { WorkoutForm } from "./WorkoutForm";

// export default async function RoutePage(
//     props: PageParams<{ weekId: string; workoutId: string; }>
// ) {
//     const user = await requiredCurrentUser();

//     const workout = await prisma.workout.findUnique({
//         where: {
//             id: props.params.workoutId,
//             weekId: props.params.weekId,
//         },
//         include: {
//             week: true,
//         },
//     });
    
//     if (!workout) {
//         notFound();
//     }

//     return (
//         <Layout>
//             <LayoutTitle>Edit Workout</LayoutTitle>
//                 <WorkoutForm defaultValues={workout} workoutId={workout.id} />
//         </Layout>
//     );
// }
