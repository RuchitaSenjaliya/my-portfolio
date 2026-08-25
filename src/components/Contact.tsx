"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Check,
} from "lucide-react";
import { contactDetails, ownerInfo } from "@/data/contact";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20% 0px" });

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [apiError, setApiError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required";
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!form.subject.trim()) tempErrors.subject = "Subject is required";
    if (!form.message.trim()) {
      tempErrors.message = "Message is required";
    } else if (form.message.length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field when editing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (apiError) setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setApiError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setApiError(
          data.error || "Failed to send message. Please try again later.",
        );
      }
    } catch {
      setStatus("error");
      setApiError(
        "Network error. Please check your internet connection and try again.",
      );
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 bg-card-bg/25 border-t border-card-border relative overflow-hidden"
    >
      {/* Decorative backdrop gradients */}
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            Have an interesting project, job opportunity, or just want to say
            hello? Shoot me a message and I will get back to you as soon as
            possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            {contactDetails.map((detail, idx) => {
              const Icon = detail.icon;
              const isMail = detail.label === "Email";
              return (
                <motion.a
                  key={detail.label}
                  href={detail.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  onClick={
                    isMail
                      ? () => {
                          if (typeof navigator !== "undefined" && navigator.clipboard) {
                            navigator.clipboard.writeText(ownerInfo.email);
                            setCopiedEmail(true);
                            setTimeout(() => setCopiedEmail(false), 2500);
                          }
                        }
                      : undefined
                  }
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-card-bg border border-card-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50">
                        {detail.label}
                      </h3>
                      {isMail && copiedEmail && (
                        <span className="text-[10px] font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Copied!
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-foreground/80 mt-1 break-all">
                      {detail.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 p-8 rounded-3xl bg-card-bg border border-card-border hover:border-primary/15 transition-all duration-300"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-foreground/60 max-w-sm">
                  Thank you for reaching out. I have received your message and
                  will respond shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 px-6 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/95 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {apiError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Unable to Send Message</p>
                      <p className="text-xs opacity-90 mt-0.5">{apiError}</p>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-foreground/75"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500/20"
                          : "border-card-border focus:ring-primary/20 focus:border-primary"
                      } outline-none focus:ring-4 transition-all duration-200 text-sm`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-foreground/75"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500/20"
                          : "border-card-border focus:ring-primary/20 focus:border-primary"
                      } outline-none focus:ring-4 transition-all duration-200 text-sm`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-semibold text-foreground/75"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Collaboration"
                    className={`w-full px-4 py-3 rounded-xl bg-background border ${
                      errors.subject
                        ? "border-red-500 focus:ring-red-500/20"
                        : "border-card-border focus:ring-primary/20 focus:border-primary"
                    } outline-none focus:ring-4 transition-all duration-200 text-sm`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-foreground/75"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hi, I would love to collaborate on a mobile app project..."
                    className={`w-full px-4 py-3 rounded-xl bg-background border ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500/20"
                        : "border-card-border focus:ring-primary/20 focus:border-primary"
                    } outline-none focus:ring-4 transition-all duration-200 text-sm resize-none`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 disabled:opacity-75 disabled:pointer-events-none active:scale-98 transition-all duration-200 cursor-pointer text-sm"
                  id="submit-contact-form"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
