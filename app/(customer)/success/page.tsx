import { Layout, LayoutTitle } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout>
      <LayoutTitle>Yeah ! You are now a premium user</LayoutTitle>
      <div className="flex gap-4">
        <Link
          className={buttonVariants({ size: "lg", variant: "secondary" })}
          href="/programs"
        >
          Go to programs
        </Link>
        <Link className={buttonVariants({ size: "lg" })} href="/programs/new">
          Create your next program
        </Link>
      </div>
    </Layout>
  );
}
