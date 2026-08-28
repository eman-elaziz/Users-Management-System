"use client";

import { MultiStepForm } from "@/components/forms/user-form/multi-step-form";

export default function Home() {
  return (
    <div className=" container mx-auto ">
      <h1 className="text-heading-1 py-20">Live Multi-Step Form</h1>
      <div className="flex flex-col flex-1 gap-4 items-center justify-center bg-zinc-50  dark:bg-black">
        <MultiStepForm />
      </div>
    </div>
  );
}
