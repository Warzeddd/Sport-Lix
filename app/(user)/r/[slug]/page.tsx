/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/prisma";
import { PageParams } from "@/types/next";
import { notFound } from "next/navigation";
import { ReviewsStep } from "./ReviewsStep";

export default async function RoutePage(props: PageParams<{slug: string }>) {
    const program = await prisma.program.findFirst({
        where: {
            slug: props.params.slug,
        },
    });
    
    if(!program) {
        notFound();
    }

    return (
    <div className="flex size-full flex-col items-center py-4">
        <div className="flex items-center gap-2">
        {program.image ? <img className="size-8" src={program.image} alt={program.image} /> : null}
        <h1 className="text-lg font-bold">
        {program.name}
        </h1>
        </div>
        <div className="flex-1">
            <ReviewsStep program={program} />
        </div>
    </div>)
}