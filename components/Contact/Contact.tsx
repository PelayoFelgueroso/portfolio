import { ContactForm } from "./Form";

interface Props {
  ref: React.RefObject<HTMLDivElement | null>;
}

export const Contact = ({ ref }: Props) => {
  return (
    <section id="contact" className="relative pb-[200px]">
      <div className="grid-18 _1row px-4 md:px-4 xl:max-w-[1400px] mx-auto h-screen">
        <div className="w-full col-start-1 col-end-[19]">
          <ContactForm ref={ref} />
        </div>
      </div>
    </section>
  );
};
