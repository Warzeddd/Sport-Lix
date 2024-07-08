import { Layout, LayoutTitle } from "@/components/layout"
import { ProgramForm } from "../[programId]/edit/ProgramForm"

export default async function RoutePage() {
    return (
        <Layout>
        <LayoutTitle>
            Create Program
        </LayoutTitle>
        <ProgramForm />
        </Layout>
    )
}