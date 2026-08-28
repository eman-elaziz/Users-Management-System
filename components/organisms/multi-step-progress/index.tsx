import { StepConnector } from "@/components/atoms/step-connector ";
import { StepItem } from "@/components/molecules/step-item";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
}

interface MultiStepProgressProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

function MultiStepProgress({
  steps,
  currentStep,
  className,
}: MultiStepProgressProps) {
  const progress = Math.floor((currentStep / steps.length) * 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex w-full items-start">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const status =
            stepNumber < currentStep
              ? "completed"
              : stepNumber === currentStep
                ? "active"
                : "default";

          const isLastStep = index === steps.length - 1;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={step.label} className="flex flex-1 items-start">
              <StepItem step={stepNumber} label={step.label} status={status} />

              {!isLastStep && (
                <StepConnector
                  status={isCompleted ? "completed" : "default"}
                  className="mt-5"
                />
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-12 text-center text-base text-neutral-600">
        Step {currentStep} of {steps.length} - {progress}% complete
      </p>
    </div>
  );
}

export { MultiStepProgress };
