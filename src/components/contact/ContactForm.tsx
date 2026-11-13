"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CircleAlert,
  CircleCheck,
  Info,
  LoaderCircle,
  Send,
} from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { contactConfig, otherProjectType } from "@/data/contact";
import { socials } from "@/data/profile";
import { services } from "@/data/services";
import {
  validateContact,
  validateField,
  type ContactErrors,
  type ContactValues,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

const emptyValues: ContactValues = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

const projectTypes = [...services.map((s) => s.title), otherProjectType];

const fieldClasses =
  "bg-surface text-foreground placeholder:text-muted/70 w-full rounded-xl border px-4 py-3 text-base transition-colors focus:border-primary focus:outline-none";

function mailtoFallback(values: ContactValues) {
  const subject = `Project inquiry${values.projectType ? `: ${values.projectType}` : ""}`;
  const body = `Name: ${values.name}\nEmail: ${values.email}\nProject type: ${values.projectType}\n\n${values.message}`;
  return `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function contactAlternative(values: ContactValues) {
  if (contactConfig.email) {
    return (
      <a className="underline" href={mailtoFallback(values)}>
        email me directly
      </a>
    );
  }
  return (
    <>
      contact me on{" "}
      <a
        className="underline"
        href={socials.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>{" "}
      or{" "}
      <a
        className="underline"
        href={socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactValues, boolean>>
  >({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const submitting = status === "submitting";

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const field = e.target.name as keyof ContactValues;
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    // Re-check a field as it is edited once it has shown an error.
    if (touched[field] || errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
    if (
      status === "success" ||
      status === "error" ||
      status === "unconfigured"
    ) {
      setStatus("idle");
    }
  }

  function handleBlur(field: keyof ContactValues) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, values[field]),
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, projectType: true, message: true });

    const firstInvalid = (Object.keys(found) as (keyof ContactValues)[])[0];
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      setStatus("idle");
      return;
    }

    // No backend configured: say so instead of pretending the message was sent.
    if (!contactConfig.endpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("submitting");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(contactConfig.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          projectType: values.projectType,
          message: values.message.trim(),
        }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      setStatus("success");
      setValues(emptyValues);
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }

  function field(name: keyof ContactValues) {
    const invalid = Boolean(errors[name]);
    return {
      id: `contact-${name}`,
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: () => handleBlur(name),
      disabled: submitting,
      "aria-required": true as const,
      "aria-invalid": invalid,
      "aria-describedby": invalid ? `contact-${name}-error` : undefined,
      className: cn(
        fieldClasses,
        invalid ? "border-danger" : "border-border",
        submitting && "opacity-60",
      ),
    };
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitting}
      className="card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" error={errors.name}>
          <input
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            {...field("name")}
          />
        </Field>

        <Field label="Email Address" name="email" error={errors.email}>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="name@example.com"
            {...field("email")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label="Project Type"
          name="projectType"
          error={errors.projectType}
        >
          <select {...field("projectType")}>
            <option value="">Select a project type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" name="message" error={errors.message}>
          <textarea
            rows={6}
            placeholder="Tell me about your project or the problem you want solved."
            {...field("message")}
            className={cn(field("message").className, "resize-y")}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary btn-lg mt-6 w-full sm:w-auto"
      >
        {submitting ? (
          <>
            <LoaderCircle size={18} className="motion-safe:animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message <Send size={17} />
          </>
        )}
      </button>

      {/* Status messages */}
      <div className="empty:hidden mt-5" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {status === "success" && (
            <Notice
              key="success"
              tone="success"
              icon={CircleCheck}
              role="status"
            >
              Thanks for reaching out. Your message was sent, and I’ll get back
              to you soon.
            </Notice>
          )}
          {status === "error" && (
            <Notice key="error" tone="error" icon={CircleAlert} role="alert">
              Something went wrong and your message was not sent. Please try
              again, or {contactAlternative(values)}.
            </Notice>
          )}
          {status === "unconfigured" && (
            <Notice key="unconfigured" tone="info" icon={Info} role="status">
              This form isn’t connected to a message service yet, so nothing was
              sent. Please {contactAlternative(values)} instead.
            </Notice>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={`contact-${name}`}
        className="mb-2 block text-sm font-medium"
      >
        {label}
        <span aria-hidden="true" className="text-secondary ml-0.5">
          *
        </span>
        <span className="sr-only"> (required)</span>
      </label>
      {children}
      {error && (
        <motion.p
          id={`contact-${name}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="text-danger mt-2 flex items-start gap-1.5 text-sm"
        >
          <CircleAlert
            size={15}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          {error}
        </motion.p>
      )}
    </div>
  );
}

const tones = {
  success: "border-success/40 bg-success/10 text-success",
  error: "border-danger/40 bg-danger/10 text-danger",
  info: "border-secondary/40 bg-secondary/10 text-foreground",
} as const;

function Notice({
  tone,
  icon: Icon,
  role,
  children,
}: {
  tone: keyof typeof tones;
  icon: typeof Info;
  role: "status" | "alert";
  children: React.ReactNode;
}) {
  return (
    <motion.div
      role={role}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed",
        tones[tone],
      )}
    >
      <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <p>{children}</p>
    </motion.div>
  );
}
