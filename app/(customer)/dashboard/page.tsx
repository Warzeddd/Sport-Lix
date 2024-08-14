import { requiredCurrentUser } from "@/auth/current-user";
import { Layout, LayoutTitle } from "@/components/layout";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { prisma } from "@/prisma";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  const user = await requiredCurrentUser();

  const programsCount = await prisma.program.count({
    where: {
      userId: user.id,
    },
  });

  return (
    <Layout>
      <LayoutTitle>Dashboard</LayoutTitle>
      <h2 className="text-xl font-bold">Welcome back, {user.name}</h2>
      <div className="flex flex-wrap items-start gap-4">
        <Card className="min-w-52">
          <CardHeader>
            <CardDescription>Programs</CardDescription>
            <CardTitle>{programsCount}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="min-w-52">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link
              href="/programs/new"
              className={buttonVariants({ size: "lg" })}
            >
              Create a program
            </Link>
            <Link href="/programs" className={buttonVariants({ size: "lg" })}>
              Programs list
            </Link>
          </CardContent>
        </Card>

        <Card className="min-w-52">
          <CardHeader>
            <CardTitle>Plan</CardTitle>
            <CardDescription>{user.plan}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>Max {user.plan === "FREE" ? 1 : "Infinity"} programs</p>
            <Progress value={(programsCount * 100) / 1} />
            {programsCount === 1}
            {user.plan === "FREE" && programsCount === 1 && (
              <Alert>
                <AlertTitle>
                  You reached the limit of your free plan, please upgrade
                </AlertTitle>
                <Link
                  className={buttonVariants({ size: "sm" })}
                  href="/upgrade"
                >
                  Upgrade
                </Link>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}