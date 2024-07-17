// import { Layout, LayoutTitle } from "@/components/layout"
// import { WeekForm } from "./WeekForm";
// import { prisma } from "@/prisma";
// import { notFound } from "next/navigation";
// import { PageParams } from "@/types/next";
// import { requiredCurrentUser } from "@/auth/current-user";

// export default async function RoutePage(
//     props: PageParams<{
//     programId: string;
// }>) {

//     const user = await requiredCurrentUser();

//     const program = await prisma.program.findUnique({
//         where: {
//             id: props.params.programId,
//             userId: user.id,
//         }
//     });

//     if(!program) {
//         notFound();
//     }

//     return (
//         <Layout>
//         <LayoutTitle>
//             Create week
//         </LayoutTitle>
//         <WeekForm programId={program.id} />
//         </Layout>
//     )
// }