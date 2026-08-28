This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# User Management System

A modern multi-step user management form built with **Next.js, React, TypeScript, React Hook Form, Zod, TanStack Query, Tailwind CSS, shadcn/ui, and Atomic Design principles**.

The project focuses on building a reusable and scalable frontend architecture while implementing a fully validated multi-step form with asynchronous country selection, search, pagination, and proper loading and error handling.

---

## Features

- Multi-step user registration form
- Three-step form flow
- Step-by-step form validation
- Back and Next navigation
- Form data persistence between steps
- Final review before submission
- Success page after successful submission
- React Hook Form for form state management
- Zod for schema validation
- TanStack Query for server state management
- Async country selection
- Searchable country list
- Pagination / infinite scroll for countries
- Reusable generic AsyncSelect component
- Reusable CustomSelect component
- Single and multiple selection support
- Maximum selection limit
- Loading states
- Empty states
- API error handling
- Route-level loading state
- Route-level error handling with retry
- Reusable Icon atom
- Atomic Design architecture
- Responsive UI
- Accessibility considerations
- Full TypeScript support
- No `any` types used in the implementation

---

## Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Base UI**
- **Lucide Icons**
- **React Hook Form**
- **Zod**
- **TanStack Query**
- **Class Variance Authority**

---

# Architecture

The project follows the **Atomic Design** methodology to create reusable and maintainable UI components.

```text
components/
│
├── atoms/
│   ├── button/
│   ├── input/
│   ├── icon/
│   ├── step-circle/
│   └── step-connector/
│
├── molecules/
│   ├── step-item/
│   └── ...
│
├── organisms/
│   ├── custom-select/
│   ├── async-select/
│   ├── multi-step-progress/
│   ├── success-modal/
│   └── ...
│
└── forms/
    └── user-form/
        ├── steps/
        ├── hooks/
        ├── schemas/
        └── types/
```
