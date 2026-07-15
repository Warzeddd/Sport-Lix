# Sport-Lix : Plateforme SaaS de Planification Athlétique Avancée

Sport-Lix est une application web moderne (SaaS) de planification d'entraînements et de suivi morphologique de niveau athlétique. Elle permet de structurer des programmes sportifs complexes à l'aide d'une architecture relationnelle hautement modulaire.

---

## 🛠️ Stack Technique & Architecture Logicielle

* **Framework** : Next.js (App Router) exploitant pleinement les **React Server Components (RSC)** pour un rendu ultra-rapide et l'optimisation SEO du portail public.
* **Gestion des Formulaires & Mutations** : Utilisation intensive de **React Server Actions** sécurisés par la bibliothèque `next-safe-action` et validés côté serveur à l'aide de schémas de typage stricts avec **Zod**.
* **Persistance & ORM** : Base de données relationnelle modélisée sous **Prisma ORM**, permettant des requêtes performantes et des migrations d'infrastructure fluides.
* **Authentification** : Gestion sécurisée des sessions utilisateur et des workflows d'onboarding via **NextAuth.js** (OAuth & Credentials).
* **Monétisation (SaaS)** : Intégration de **Stripe Billing** couplée à un point de terminaison de **Webhooks Stripe** pour synchroniser en temps réel les statuts d'abonnements premium.
* **UI/UX Library** : Composants hautement accessibles (WAI-ARIA) conçus via **Shadcn UI**, **Tailwind CSS** et un système de basculement de thème natif (sombre/clair).

---

## 📊 Modélisation de Données & Schéma Relationnel

La puissance de la plateforme repose sur une structure de base de données relationnelle complexe et rigoureuse découpée en deux piliers :

### 1. Le Moteur de Planification (Hiérarchie d'Entraînement)
Le schéma de base de données modélise l'architecture sportive selon un emboîtement logique de type parent/enfant :
$$\text{Programme (Program)} \longrightarrow \text{Semaines (Weeks)} \longrightarrow \text{Séances (Workouts)} \longrightarrow \text{Cycles (Cycles)} \longrightarrow \text{Exercices} \longrightarrow \text{Séries (Series/Reps)}$$

Chaque entité possède ses propres contrôles d'accès et Server Actions de mutation (`create`, `edit`, `delete`) garantissant une intégrité transactionnelle totale lors des modifications en cascade.

### 2. Le Moteur Anatomique & Morphologique
Pour adapter le programme aux particularités physiques de l'utilisateur :
* **Mouvements & Exercices** : Typés selon les groupes musculaires agonistes et antagonistes ciblés.
* **Morphologie** : Profil de l'utilisateur stocké en base pour recommander ou restreindre certains angles de travail physiques.

---

## 📂 Organisation du Code Source (Feature-Driven Architecture)

Le projet applique les principes du Clean Code en isolant le code par domaines fonctionnels dans le dossier `src/features` :

```text
.
├── app/                       # Routage Next.js (Dashboard, Landing Page, Portails Clients, API Webhooks)
├── prisma/                    # Schéma relationnel Prisma et historique des migrations d'infrastructure
├── src/
│   ├── auth/                  # Configuration NextAuth.js et utilitaires de contexte utilisateur
│   ├── components/            # Composants graphiques atomiques d'UI (Shadcn)
│   ├── features/              # Modules métiers isolés (contenant actions, formulaires et logique locale)
│   │   ├── auth/              # Boutons de connexion et mutations d'authentification
│   │   ├── landing/           # Sections dynamiques de la page de vente (Hero, FAQ, Tarifs Stripe)
│   │   ├── theme/             # Provider de thème d'interface (Light/Dark mode)
│   │   └── upload/            # Gestion et upload d'assets externes
│   ├── lib/                   # Utilitaires système (gestion des classes CSS Tailwind, helpers)
│   └── types/                 # Typages TypeScript globaux, environnements et wrapper Stripe
