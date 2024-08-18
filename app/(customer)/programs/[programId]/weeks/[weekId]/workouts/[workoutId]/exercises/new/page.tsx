import { requiredCurrentUser } from "@/auth/current-user";
import { Layout, LayoutTitle } from "@/components/layout";
import { prisma } from "@/prisma";
import type { PageParams } from "@/types/next";
import { AlertTriangle } from "lucide-react";
import { PricingSection } from "@/features/landing/PricingSection";
import { notFound } from "next/navigation";
import { ExerciseForm } from "../[exerciseId]/edit/ExerciseForm";

export default async function RoutePage(
  props: PageParams<{ weekId: string; workoutId: string; }>
) {
  const user = await requiredCurrentUser();

  // Vérification des autorisations
  const isAuthorized =
    user.plan === "PREMIUM"
      ? true
      : (await prisma.program.count({
          where: {
            userId: user.id,
          },
        })) < 1;
console.log(props)
  // Récupération de l'exercice et de l'entraînement associé
  const workout = await prisma.workout.findUnique({
    where: {
      id: props.params.workoutId,
    },
        include: {
          week: {
            include: {
              program: true, // Inclure le programme associé à la semaine
            },
          },
        },
  });

  // Vérification de l'existence de l'exercice et de l'autorisation
  if (!workout || workout.week.program.userId !== user.id) {
    notFound();
  }

  // Gestion des droits d'accès
  if (!isAuthorized) {
    return (
      <Layout>
        <LayoutTitle>Create Exercise</LayoutTitle>
        <p>
          <AlertTriangle className="inline" />
          Sorry, you need to upgrade to our premium plan to create more programs.
        </p>
        <PricingSection />
      </Layout>
    );
  }

  // Affichage du formulaire d'exercice
  return (
    <Layout>
      <LayoutTitle>Create Exercise</LayoutTitle>
      <ExerciseForm workoutId={props.params.workoutId} />
    </Layout>
  );
}
