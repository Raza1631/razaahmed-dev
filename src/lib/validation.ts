export type ContactValues = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

// Simple, permissive check: something@something.tld with no spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(
  field: keyof ContactValues,
  value: string,
): string | undefined {
  const v = value.trim();
  switch (field) {
    case "name":
      if (!v) return "Please enter your full name.";
      if (v.length < 2) return "Your name should be at least 2 characters.";
      return undefined;
    case "email":
      if (!v) return "Please enter your email address.";
      if (!EMAIL_PATTERN.test(v))
        return "Please enter a valid email address, like name@example.com.";
      return undefined;
    case "projectType":
      if (!v) return "Please choose a project type.";
      return undefined;
    case "message":
      if (!v) return "Please tell me a little about your project.";
      if (v.length < 10) return "Please write at least 10 characters.";
      return undefined;
  }
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(values) as (keyof ContactValues)[]).forEach((field) => {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
  });
  return errors;
}
