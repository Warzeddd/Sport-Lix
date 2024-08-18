import { requiredCurrentUser } from "@/auth/current-user";
import { Layout, LayoutTitle } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { prisma } from "@/prisma";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "../../../../../../DeleteButton";
import { deleteExerciseAction } from "./edit/exercise.action";

export default async function RoutePage(
    props: PageParams<{ exerciseId: string, programId: string }>
) {
    const user = await requiredCurrentUser();

    const exercise = await prisma.exercise.findUnique({
        where: {
            id: props.params.exerciseId,
            workout: {
                week: {
                    program: {
                        userId: user.id,
                    },
                },
            },
        },
        include: {
            series: true,
        },
    });

    if (!exercise) {
        notFound();
    }

    return (
        <Layout>
            <div className="flex justify-between">
                <div className="space-y-0.5">
                    <LayoutTitle>
                        <Link href={`../../${props.params.programId}`}>
                            <TableCell>{exercise.name}</TableCell>
                        </Link>
                    </LayoutTitle>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href={`${exercise.id}/edit`}
                        className={buttonVariants({ size: "sm", variant: "secondary" })}
                    >
                        Edit
                    </Link>
                    <DeleteButton id={exercise.id} deleteAction={deleteExerciseAction} />
                </div>
            </div>
            <div className="flex gap-4 max-lg:flex-col">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-start gap-2">
                        <p>Order: {exercise.order}</p>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Exercises</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Serie Number</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Movement</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {exercise.series.map((serie) => (
                                    <TableRow key={serie.id}>
                                        <TableCell>
                                            <Link href={`${props.params.exerciseId}/exercises/${exercise.id}`}>
                                                {serie.seriesCount}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{serie.order}</TableCell>
                                        <TableCell>{serie.movementId}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Link
                                            href={`${props.params.programId}/exercises/new`}
                                            className="rounded-md border-2 border-dashed border-primary transition-colors hover:bg-accent/40"
                                        >
                                            Create Exercise
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
