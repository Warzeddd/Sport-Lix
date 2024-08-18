import { requiredCurrentUser } from "@/auth/current-user";
import { Layout, LayoutTitle } from "@/components/layout";
import { prisma } from "@/prisma";
import type { PageParams } from "@/types/next";
import { AlertTriangle } from "lucide-react";
import { PricingSection } from "@/features/landing/PricingSection";
import { notFound } from "next/navigation";
import { WorkoutForm } from "../[workoutId]/edit/WorkoutForm";

export default async function RoutePage(props: PageParams<{ programId: string, weekId: string; }>) {

    const user = await requiredCurrentUser();

    const isAuthorized =
    user.plan === "PREMIUM"
        ? true
        : (await prisma.program.count({
            where: {
                userId: user.id,
            },
        })) < 1;

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

    if (!isAuthorized) {
        return (
            <Layout>
                <LayoutTitle>Create week</LayoutTitle>
                <p>
                    <AlertTriangle className="inline" />
                    Sorry, you need to upgrade to our premium plan to create more
                    program.
                </p>
                <PricingSection />
            </Layout>
        );
    }



    return (
        <Layout>
            <LayoutTitle>Create week</LayoutTitle>
            <WorkoutForm weekId={props.params.weekId} />
        </Layout>
    );
}
