import { requiredCurrentUser } from "@/auth/current-user";
import { Layout, LayoutTitle } from "@/components/layout";
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
            <LayoutTitle>Program</LayoutTitle>
            <Card className="p-4">
                {programs.length ? (
                    <Table>
                        <TableHeader>
                            <TableHead>Name</TableHead><TableHead>Slug</TableHead>
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