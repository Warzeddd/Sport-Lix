import { createSafeActionClient } from "next-safe-action";
import { currentUser } from "./auth/current-user";
// permert de trouver des erreurs dans notre projet v6
export class ActionError extends Error {
    constructor( message: string) {
        super(message);
        this.name = "ActionError";
    }
}

const handleReturnedServerError = (error: Error) => {
    if (error instanceof ActionError) {
        return error.message
    } else {
        return "An unexpected error occurred"
    }
}

export const actionClient = createSafeActionClient(
    {
        handleReturnedServerError: handleReturnedServerError,
    }
);

export const userAction = createSafeActionClient({
    handleReturnedServerError: handleReturnedServerError,
    middleware : async () => {
        const user = await currentUser();

        if(!user) {
            throw new ActionError("You must be logged in");
        }

        return {user};
    }
})

