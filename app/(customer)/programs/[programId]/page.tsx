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
// import { DeleteButton } from "./DeleteButton";

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
    // include: {
    //   reviews: {
    //     where: {
    //       text: {
    //         not: null,
    //       },
    //       name: {
    //         not: null,
    //       },
    //     },
    //   },
    // },
  });

  if (!program) {
    notFound();
  }

  return (
    <Layout>
      <div className="flex justify-between">
        <div className="space-y-0.5">
          <LayoutTitle>{program.name}</LayoutTitle>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/programs/${program.id}/edit`}
            className={buttonVariants({ size: "sm", variant: "secondary" })}
          >
            Edit
          </Link>
          {/* <DeleteButton productId={product.id} /> */}
        </div>
      </div>
      <div className="flex gap-4 max-lg:flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>{program.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            <p>Program : {program.slug}</p>
            <Link
              href={`/r/${program.slug}`}
              className={buttonVariants({
                size: "sm",
              })}
            >
              <Link2 size={16} className="mr-2" />
              Share review link
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
        {/* <Card className="flex-1">
          <CardHeader>
            <CardTitle>Exercices</CardTitle>
          </CardHeader>
           <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Text</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.reviews.map((review) => (
                  <TableRow key={review.id}>
                    <Link href={`/reviews/${review.id}`} key={review.id}>
                      <TableCell>{review.name}</TableCell>
                    </Link>
                    <TableCell>{review.text}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card> */}
      </div>
    </Layout>
  );
}