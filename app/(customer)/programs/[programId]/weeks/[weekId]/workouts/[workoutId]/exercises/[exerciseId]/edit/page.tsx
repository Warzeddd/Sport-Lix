import { Layout, LayoutTitle } from "@/components/layout";
import { requiredCurrentUser } from "@/auth/current-user";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import { PageParams } from "@/types/next";
import { ExerciseForm } from "./ExerciseForm";

export default async function RoutePage(
    props: PageParams<{ workoutId: string; exerciseId: string; }>
) {
    const user = await requiredCurrentUser();

    const exercise = await prisma.exercise.findUnique({
        where: {
            id: props.params.exerciseId,
            workoutId: props.params.workoutId,
        },
        include: {
            workout: true,
        },
    });
    
    if (!exercise) {
        notFound();
    }

    return (
        <Layout>
            <LayoutTitle>Edit Exercise</LayoutTitle>
                <ExerciseForm defaultValues={exercise} exerciseId={exercise.id} />
        </Layout>
    );
}
