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
import { DeleteButton } from "../../../../DeleteButton";
import { deleteWorkoutAction } from "./edit/workout.action";

export default async function RoutePage(
  props: PageParams<{ workoutId: string, programId: string }>
) {
  const user = await requiredCurrentUser();

  const workout = await prisma.workout.findUnique({
    where: {
      id: props.params.workoutId,
      week:{
      program: {
        userId: user.id,
      },
    },
},
    include: {
      exercises: true, // Inclure les exercices associés au workout
    },
  });

  if (!workout) {
    notFound();
  }

  return (
    <Layout>
      <div className="flex justify-between">
        <div className="space-y-0.5">
          <LayoutTitle>
            <Link href={`../../${props.params.programId}`}>
              <TableCell>{workout.name}</TableCell>
            </Link>
          </LayoutTitle>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`${workout.id}/edit`}
            className={buttonVariants({ size: "sm", variant: "secondary" })}
          >
            Edit
          </Link>
          <DeleteButton id={workout.id} deleteAction={deleteWorkoutAction} />
        </div>
      </div>
      <div className="flex gap-4 max-lg:flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            <p>Order: {workout.order}</p>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workout.exercises.map((exercise) => (
                  <TableRow key={exercise.id}>
                    <TableCell>
                      <Link href={`${props.params.workoutId}/exercises/${exercise.id}`}>
                        {exercise.name}
                      </Link>
                    </TableCell>
                    <TableCell>{exercise.order}</TableCell>
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
