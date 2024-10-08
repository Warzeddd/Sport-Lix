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
import { Link2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "./DeleteButton";
import { deleteProgramAction } from "./edit/program.action";

export default async function RoutePage(
  props: PageParams<{
    programId: string;
  }>
) {
  const user = await requiredCurrentUser();

  const program = await prisma.program.findUnique({
    where: {
      id: props.params.programId,
      userId: user.id,
    },
    include: {
      weeks: true, // Assurez-vous que 'week' est bien inclus
    },
  });

  if (!program) {
    notFound();
  }

  return (
    <Layout>
      <div className="flex justify-between">
        <div className="space-y-0.5">
          <LayoutTitle>
            <Link href={`/programs`}>
              <TableCell>{program.name}</TableCell>
            </Link>
          </LayoutTitle>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/programs/${program.id}/edit`}
            className={buttonVariants({ size: "sm", variant: "secondary" })}
          >
            Edit
          </Link>
          <DeleteButton id={program.id} deleteAction={deleteProgramAction} />
        </div>
      </div>
      <div className="flex gap-4 max-lg:flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            <p>Slug : {program.slug}</p>
            <Link
              href={`/r/${program.slug}`}
              className={buttonVariants({
                size: "sm",
              })}
            >
              <Link2 size={16} className="mr-2" />
              Share week link
            </Link>
            <Link
              href={`/wall/${program.slug}`}
              className={buttonVariants({
                size: "sm",
              })}
            >
              <Link2 size={16} className="mr-2" />
              Wall link
            </Link>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Week</CardTitle>
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
                {program.weeks.map((week) => (
                  <TableRow key={week.id}>
                    <TableCell>
                      <Link href={`/programs/${program.id}/weeks/${week.id}`}>
                        {week.name}
                      </Link>
                    </TableCell>
                    <TableCell>{week.order}</TableCell>
                  </TableRow>
                ))}
                <TableCell>
                  <Link
                    href={`${props.params.programId}/weeks/new`}
                    className="rounded-md border-2 border-dashed border-primary transition-colors hover:bg-accent/40">
                    Create Week
                  </Link>
                </TableCell>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
