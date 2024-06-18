import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react";
// import { Form } from "@/components/ui/form"

export const SigninButton = () => {
    return (
        <form>
            <Button
            variant="secondary"
            size="sm"
            formAction={async () => {
                "use server";
                await signIn();
            }}>
                <LogIn size={16} className="mr-2" />
                Sign In
            </Button>
        </form>
    )
    
}