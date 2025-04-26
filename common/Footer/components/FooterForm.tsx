"use client";

import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { InputBox } from "./components/InputBox";
import { formSubmitAction } from "@/app/actions";
import { getCaptchaToken } from "@/lib/captcha";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name should have at least 2 characters.",
    })
    .max(50, {
      message: "Name should have less than 50 characters.",
    }),
  email: z.string().email({
    message: "Invalid email.",
  }),
  company: z
    .string()
    .min(4, {
      message: "Company Name should have at least 2 characters,",
    })
    .max(50, {
      message: "Company Name should have less than 50 characters.",
    }),
  message: z
    .string()
    .min(20, {
      message: "Message should have at least 20 characters.",
    })
    .max(5000, {
      message: "Message should have less than 5000 characters.",
    }),
});

export type FormValues = z.infer<typeof formSchema>;

export const FooterForm = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);

    try {
      const token = await getCaptchaToken();
      const res = await formSubmitAction(token, data);

      if (res.succes) {
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

        const templateParams = {
          name: data.name,
          email: data.email,
          company: data.company,
          message: data.message,
        };

        emailjs
          .send(serviceId, templateId, templateParams, publicKey)
          .then(() => {
            setSubmitted(true);
          })
          .catch(() => {
            alert(
              "There was an issue sending the information. Please try again."
            );
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch {
      alert("There was an issue sending the information. Please try again.");
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.target instanceof HTMLElement) {
      const tagName = e.target.tagName.toLowerCase();
      if (tagName !== "textarea") {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <>
      {!submitted ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
          className="h-full flex flex-col"
        >
          <InputBox
            label="Name"
            placeholder="John Doe"
            name="name"
            register={register}
            error={errors.name?.message}
          />
          <InputBox
            label="Email"
            placeholder="hello@example.com"
            name="email"
            register={register}
            error={errors.email?.message}
          />
          <InputBox
            label="I work at"
            placeholder="Company name"
            name="company"
            register={register}
            error={errors.company?.message}
          />
          <InputBox
            textArea={true}
            label="Details about the project"
            placeholder="My project is about..."
            name="message"
            register={register}
            error={errors.message?.message}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="min-h-12 items-center border-[1px] border-grayCustom/30 text-whiteCustom cursor-pointer px-4 disabled:opacity-50 hover:rounded-4xl hover:text-darkBlueCustom hover:bg-whiteCustom transition-all duration-700< hover-button"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      ) : (
        <h3 className="text-whiteCustom">
          Muchas gracias por ponerte en contacto conmigo
        </h3>
      )}
    </>
  );
};
