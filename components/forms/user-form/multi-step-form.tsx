"use client";

import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

import { MultiStepProgress } from "@/components/organisms/multi-step-progress";

import { PersonalInfoStep } from "./steps/personal-info-step";
import { PreferencesStep } from "./steps/preferences-step";
import { ReviewStep } from "./steps/review-step";
import { useMultiStepForm } from "@/app/hooks/use-multi-step-form";

const steps = [
  { label: "Personal Information" },
  { label: "Preferences" },
  { label: "Review & Submit" },
];

export function MultiStepForm() {
  const router = useRouter();

  const { form, currentStep, data, isSubmitting, handleNext, handleBack } =
    useMultiStepForm();

  const handleSubmit = async () => {
    try {
      console.log("SUBMIT", data);
      router.push("/success");
    } catch (error) {
      console.error("Failed to submit user:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="w-2/3 bg-white p-8 rounded-lg shadow-md">
        <MultiStepProgress
          steps={steps}
          currentStep={currentStep}
          className="mb-10"
        />

        {currentStep === 1 && <PersonalInfoStep onNext={handleNext} />}

        {currentStep === 2 && (
          <PreferencesStep onNext={handleNext} onBack={handleBack} />
        )}

        {currentStep === 3 && (
          <ReviewStep
            data={data}
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </form>
    </FormProvider>
  );
}
