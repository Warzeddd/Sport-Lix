import { requiredCurrentUser } from "@/auth/current-user";
import { Layout, LayoutDescription, LayoutTitle } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/prisma";
import { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
    const user = await requiredCurrentUser();

    const programs = await prisma.program.findMany({
        where: {
            userId: user.id,
        }
    })
    return (
        <Layout>
            <div className="flex justify-between">
                <div className="space-y-0.5">
                    <LayoutTitle>
                        <Link href={`/home`}>
                            <TableCell>Program</TableCell>
                        </Link>
                    </LayoutTitle>
                    <LayoutDescription>Create program to sporty</LayoutDescription>
                </div>
                <Link
                    href={`/programs/new`}
                    className={buttonVariants({ size: "sm", variant: "secondary" })}
                >
                    Create
                </Link>
            </div>
            <Card className="p-4">
                {programs.length ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead><TableHead>Slug</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {programs.map((program) => (
                                <TableRow key={program.id}>
                                    <Link href={`/programs/${program.id}`} key={program.id}>
                                        <TableCell>{program.name}</TableCell>
                                    </Link>
                                    <TableCell className="font-mono">{program.slug}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Link
                        href="/programs/new"
                        className="flex w-full items-center justify-center rounded-md border-2 border-dashed border-primary p-12 transition-colors hover:bg-accent/40">
                        Create Program
                    </Link>
                )}
            </Card>
        </Layout>
    )
}