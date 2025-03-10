import { ContactForm } from "./Form";

export const Contact = () => {
  return (
    <section id="contact" className="relative pb-[200px]">
      <div className="grid-18 _1row px-4 md:px-4 xl:max-w-[1400px] mx-auto h-screen">
        <div className="w-full col-start-1 col-end-[19]">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
