"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValues } from "@/components/forms/types/user-form.types";
import {
  UserFormInput,
  UserFormOutput,
  userFormSchema,
} from "@/components/forms/schemas/user-form.schema";

const defaultValues: UserFormValues = {
  fullName: "",
  email: "",
  gender: "",
  country: "",
  countryName: "",
  age: undefined,
  category: "",
  interests: [],
};

const stepFields = {
  1: ["fullName", "email", "gender", "country", "age"],
  2: ["category", "interests"],
} as const;

export function useMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<UserFormInput, unknown, UserFormOutput>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const {
    trigger,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleNext = async () => {
    if (currentStep === 1 || currentStep === 2) {
      const fields = stepFields[currentStep];

      const isValid = await trigger(fields);

      if (!isValid) {
        return;
      }
    }

    setCurrentStep((step) => step + 1);
  };

  const handleBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  const handleFormSubmit = async (data: UserFormValues) => {
    console.log("SUBMIT USER:", data);
  };

  const submit = handleSubmit(handleFormSubmit);

  return {
    form,
    currentStep,
    data: getValues(),
    isSubmitting,
    handleNext,
    handleBack,
    submit,
  };
}
