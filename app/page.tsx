"use client";

import { Button } from "@/components/atoms/button";
import { Icon } from "@/components/atoms/icon";
import { Input } from "@/components/atoms/input";
import { StepCircle } from "@/components/atoms/step-circle";
import { CheckboxGroup } from "@/components/molecules/checkbox-group";
import { InputField } from "@/components/molecules/input-field";
import { RadioGroup } from "@/components/molecules/radio-group";
import { CustomSelect } from "@/components/organisms/select";
import { AsyncSelect } from "@/components/organisms/select/async-select";

import { MultiStepProgress } from "@/components/organisms/multi-step-progress";
import { Mail, Search } from "lucide-react";
import { useState } from "react";
import { ComponentFeatures } from "@/components/organisms/component-features";
import { SuccessModal } from "@/components/organisms/success-modal";

export default function Home() {
  const [country, setCountry] = useState("");
  return (
    <div className="flex flex-col flex-1 gap-4 items-center justify-center bg-zinc-50  dark:bg-black">
      <Button>Continue</Button>
      <Button variant="secondary">Save</Button>
      <div className="w-1/2">
        <Input type="email" placeholder="Enter your email" />
        <StepCircle status="default" step={1} />
        <StepCircle status="active" step={2} />
        <StepCircle status="completed" />
        <StepCircle status="default" size="sm" step={1} />
        <StepCircle status="default" size="lg" step={1} />
        <Icon icon={Search} size="lg" className="text-primary-600" />

        <InputField
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          helperText="We'll never share your email."
        />
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          error="Password must be at least 8 characters."
        />
        <CheckboxGroup
          label="Select your interests"
          options={[
            { label: "Technology", value: "technology" },
            { label: "Design", value: "design" },
            { label: "Business", value: "business" },
            { label: "Marketing", value: "marketing" },
            { label: "Other", value: "other" },
          ]}
        />
        <RadioGroup
          label="Select your gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />

        <MultiStepProgress
          currentStep={3}
          steps={[
            { label: "Personal Info" },
            { label: "Preferences" },
            { label: "Review" },
            { label: "done" },
          ]}
        />
        <CustomSelect
          label="Gender"
          hint="Static List"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          value="male"
          onValueChange={(value) => {
            console.log(value);
          }}
        />

        <AsyncSelect
          endpoint="/api/countries"
          label="Country"
          hint="Async API with Pagination"
          placeholder="Select country"
          value={country}
          onValueChange={setCountry}
        />
      </div>
      <ComponentFeatures />
      <SuccessModal />
    </div>
  );
}
