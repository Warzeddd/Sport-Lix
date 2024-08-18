import { Layout, LayoutTitle } from "@/components/layout";
import { requiredCurrentUser } from "@/auth/current-user";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import { PageParams } from "@/types/next";
import { WeekForm } from "./WeekForm";

export default async function RoutePage(
    props: PageParams<{ programId: string; weekId: string; }>
) {
    const user = await requiredCurrentUser();

    const week = await prisma.week.findUnique({
        where: {
            id: props.params.weekId,
            programId: props.params.programId,
        },
        include: {
            program: true,
        },
    });
    
    if (!week || week.program.userId !== user.id) {
        notFound();
    }

    return (
        <Layout>
            <LayoutTitle>Edit Week</LayoutTitle>
                <WeekForm defaultValues={week} weekId={week.id} />
        </Layout>
    );
}
