"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { formBg } from "@/public";

interface Props {
  ref: React.RefObject<HTMLDivElement | null>;
}

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un email válido.",
  }),
  asunto: z.string().min(4, {
    message: "El asunto debe tener al menos 4 caracteres.",
  }),
  mensaje: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
});

export type FormValuesOld = z.infer<typeof formSchema>;

export const ContactForm = ({ ref }: Props) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsLoading(true);

    try {
      const serviceId = "service_opbz37r";
      const templateId = "template_79cjk7w";
      const publicKey = "AQpWaUNxlwPrYjSMq";

      const templateParams = {
        nombre: data.nombre,
        email: data.email,
        asunto: data.asunto,
        mensaje: data.mensaje,
      };

      emailjs.send(serviceId, templateId, templateParams, publicKey);
    } catch {
      alert("There was an issue sending the information. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div ref={ref} className="w-full max-w-6xl bg-background shadow-2xl bg-whiteCustom rounded-lg px-12 py-24 md:py-48">
        {!submitted ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="space-y-4 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Nombre
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu nombre"
                            {...field}
                            className="bg-gray border-0 rounded-lg h-12 mt-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ejemplo@correo.com"
                            type="email"
                            {...field}
                            className="bg-gray border-0 rounded-lg h-12 mt-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="asunto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Asunto
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="¿Sobre qué quieres hablar?"
                            {...field}
                            className="bg-gray border-0 rounded-lg h-12 mt-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="mensaje"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Mensaje
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Escribe tu mensaje aquí..."
                          {...field}
                          className="bg-gray border-0 rounded-lg min-h-[120px] mt-1 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-end flex-grow pt-8">
                <Button
                  type="submit"
                  className="relative h-full w-full bg-gray text-white rounded-lg flex items-center justify-center text-lg font-semibold"
                >
                  <Image
                    src={formBg}
                    alt=""
                    className="hidden md:block absolute h-full w-full"
                  />
                  <div className="relative">
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Enviando...
                      </>
                    ) : (
                      "Enviar"
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <h3>Muchas gracias por ponerte en contacto conmigo</h3>
        )}
      </div>
    </div>
  );
};
