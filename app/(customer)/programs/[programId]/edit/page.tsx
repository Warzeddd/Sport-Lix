import { Layout, LayoutTitle } from "@/components/layout";
import { ProgramForm } from "./ProgramForm";
import { requiredCurrentUser } from "@/auth/current-user";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import { PageParams } from "@/types/next";
import { Button } from "@/components/ui/button";

export default async function RoutePage(
    props: PageParams<{ programId: string; }>
) {
    const user = await requiredCurrentUser();

    const program = await prisma.program.findUnique({
        where: {
            id: props.params.programId,
            userId: user.id,
        }
    });

    if (!program) {
        notFound();
    }


    return (
        <Layout>
            <LayoutTitle>Edit Program</LayoutTitle>
            <ProgramForm defaultValues={program} programId={program.id} />
        </Layout>
    );
}
