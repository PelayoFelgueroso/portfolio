import { ContactForm } from "./Form";

export const Contact = () => {
  return (
    <section id="contact" className="pb-[200px]">
      <div className="grid-18 _1row max-w-[1400px] mx-auto h-screen">
        <div className="col-start-1 col-end-[19]">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
