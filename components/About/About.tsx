"use client";

import styles from "./style.module.scss";
import { background } from "@/public";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { slideUp } from "./anim";

export const About = () => {
  const descriptionRef = useRef(null);

  return (
    <section id="about" className="-mt-[190px]">
      <div ref={descriptionRef} className="grid-18">
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="entry"
          className={`${styles.grid_area} flex flex-col gap-8`}
        >
          <div className="pb-[70px]">
            <p className="max-w-[450px] text-[1.75rem]">
              Desarrollador Frontend centrado en crear páginas web atractivas,
              animadas e innovadoras.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden">
            <Image src={background} alt="" className="" />
          </div>

          <div className="flex flex-col gap-4">
            <p className="">
              Me dedico a desarrollar experiencias web interactivas que no solo
              se ven bien, sino que también se sienten fluidas y atractivas.
            </p>
            <p className="">
              Mis proyectos combinan animaciones bien diseñadas, interfaces
              intuitivas y una navegación envolvente para que cada usuario
              disfrute de una experiencia dinámica y natural.
            </p>
            <p className="">
              Siempre estoy explorando nuevas tendencias y herramientas,
              buscando formas de innovar y llevas la interacción digital a otro
              nivel.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
