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

// next-safe-action v7
// class ActionError extends Error {
//     constructor(message: string) {
//         super(message);
//         this.name = "ActionError";
//     }
// }

// const handleReturnedServerError = (error: Error) => {
//     if (error instanceof ActionError) {
//         return error.message;
//     } else {
//         return "An unexpected error occurred";
//     }
// }

// // Base client avec gestion des erreurs
// export const actionClient = createSafeActionClient({
//     handleReturnedServerError: handleReturnedServerError,
// });

// // Auth client avec vérification de session et gestion des erreurs
// export const userAction = actionClient.use(async ({ next, ctx }) => {
//     const user = await currentUser();

//     if (!user) {
//         throw new ActionError("You must be logged in");
//     }

//     return next({ ctx: { user } });
// });