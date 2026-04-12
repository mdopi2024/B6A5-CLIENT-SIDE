import * as React from "react";

export const Field = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2">{children}</div>;
};

export const FieldGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-4">{children}</div>;
};

export const FieldLabel = ({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className="text-sm font-medium text-gray-700"
      {...props}
    >
      {children}
    </label>
  );
};

type FieldErrorProps = {
  errors?: unknown;
};

export const FieldError = ({ errors }: FieldErrorProps) => {
  if (!errors) return null;

  const message = Array.isArray(errors)
    ? String(errors[0] ?? "")
    : String(errors);

  if (!message) return null;

  return (
    <p className="text-sm text-red-500">
      {message}
    </p>
  );
};