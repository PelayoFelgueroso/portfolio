"use server";

import { FormValues } from "@/components/FooterNew/components/FooterForm";
import { verifyCaptchaToken } from "@/lib/captcha";

export async function formSubmitAction(
  token: string | null,
  formData: FormValues
) {
  if (!token) {
    return {
      succes: false,
      message: "Token not found",
    };
  }

  await verifyCaptchaToken(token);

  return {
    succes: true,
    message: "Message sent succesfully!",
  };
}
