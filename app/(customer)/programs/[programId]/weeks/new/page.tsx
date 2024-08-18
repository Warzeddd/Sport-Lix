import { requiredCurrentUser } from "@/auth/current-user";
import { Layout, LayoutTitle } from "@/components/layout";
import { prisma } from "@/prisma";
import type { PageParams } from "@/types/next";
import { AlertTriangle } from "lucide-react";
import { WeekForm } from "../[weekId]/edit/WeekForm";
import { PricingSection } from "@/features/landing/PricingSection";
import { notFound } from "next/navigation";

export default async function RoutePage(props: PageParams<{ programId: string; }>) {
    const user = await requiredCurrentUser();

    const isAuthorized =
        user.plan === "PREMIUM"
            ? true
            : (await prisma.program.count({
                where: {
                    userId: user.id,
                },
            })) < 1;

    const program = await prisma.program.findUnique({
        where: {
            id: props.params.programId,
            userId: user.id,
        }
    });

    if (!program) {
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
            <WeekForm programId={props.params.programId} />
        </Layout>
    );
}
