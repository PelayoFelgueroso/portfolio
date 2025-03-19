"use client";

import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { slideUp } from "./anim";

export const HomeHero = () => {
  const nameHero = useRef(null);
  const aboutHero = useRef(null);
  const worksHero = useRef(null);
  const resourcesHero = useRef(null);
  const contactHero = useRef(null);
  const descriptionHero = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".hero-title-wrapper",
      {
        y: "0%",
      },
      {
        scrollTrigger: {
          trigger: "#about",
          start: "top top",
          scrub: 0.25,
          endTrigger: "#works",
          end: "top 20%",
        },
        y: "-120%",
      }
    );

    gsap.fromTo(
      ".hero-title-wrapper",
      {
        y: "-120%",
      },
      {
        scrollTrigger: {
          trigger: "#works",
          start: "top top",
          scrub: 0.25,
          endTrigger: "#resources",
          end: "top 20%",
        },
        y: "-240%",
      }
    );

    gsap.fromTo(
      ".hero-title-wrapper",
      {
        y: "-240%",
      },
      {
        scrollTrigger: {
          trigger: "#resources",
          start: "top top",
          scrub: 0.25,
          endTrigger: "#contact",
          end: "top 20%",
        },
        y: "-360%",
      }
    );

    gsap.fromTo(
      ".hero-title-wrapper",
      {
        y: "-360%",
      },
      {
        scrollTrigger: {
          trigger: "#contact",
          start: "top top",
          scrub: 0.25,
          end: "bottom top",
        },
        y: "-480%",
      }
    );

    gsap.fromTo(
      ".hero-title-wrapper",
      {
        y: "100%",
      },
      {
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          scrub: 0.25,
          endTrigger: "#about",
          end: "top 20%",
        },
        y: "0%",
      }
    );

    gsap.fromTo(
      descriptionHero.current,
      {
        opacity: "1",
      },
      {
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          scrub: 0.25,
          endTrigger: "#about",
          end: "top 20%",
        },
        opacity: "0",
      }
    );

    gsap.fromTo(
      nameHero.current,
      {
        opacity: "1",
      },
      {
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          scrub: 0.25,
          endTrigger: "#about",
          end: "top 20%",
        },
        opacity: "0",
      }
    );

    gsap.fromTo(
      aboutHero.current,
      {
        opacity: "1",
      },
      {
        scrollTrigger: {
          trigger: "#about",
          start: "top top",
          scrub: 0.25,
          endTrigger: "#works",
          end: "top 20%",
        },
        opacity: "0",
      }
    );

    gsap.fromTo(
      worksHero.current,
      {
        opacity: "1",
      },
      {
        scrollTrigger: {
          trigger: "#works",
          start: "top top",
          scrub: 0.25,
          endTrigger: "#resources",
          end: "top 20%",
        },
        opacity: "0",
      }
    );

    gsap.fromTo(
      resourcesHero.current,
      {
        opacity: "1",
      },
      {
        scrollTrigger: {
          trigger: "#resources",
          start: "top top",
          scrub: 0.25,
          endTrigger: "#contact",
          end: "top 20%",
        },
        opacity: "0",
      }
    );

    gsap.fromTo(
      contactHero.current,
      {
        opacity: "1",
      },
      {
        scrollTrigger: {
          trigger: "#contact",
          start: "top top",
          scrub: 0.25,
          end: "bottom top",
        },
        opacity: "0",
      }
    );
  }, []);

  return (
    <section
      id="hero"
      className={`h-screen sticky top-0 z-0 mix-blend-difference`}
    >
      <div className="relative h-full grid-18 padding-18 _1row items-end">
        <div className="col-start-1 xl:col-end-10 h-full flex flex-col justify-end">
          <motion.div
            variants={slideUp(1)}
            initial="initial"
            animate="entry"
            className={`justify-start items-start flex flex-col leading-[3.75rem] text-[4rem] lg:text-[8.5vw] lg:leading-[10rem] font-semibold h-[20rem] pb-4 text-white`}
          >
            <div
              ref={nameHero}
              style={{ willChange: "opacity, transform" }}
              className={`h-[10rem] flex flex-col justify-end py-2 hero-title-wrapper`}
            >
              <h1 className="pb-7">Pelayo Felgueroso</h1>
            </div>
            <div
              ref={aboutHero}
              style={{ willChange: "opacity, transform" }}
              className={`min-h-[10rem] my-4 flex flex-col justify-end mt-5 py-2 hero-title-wrapper`}
            >
              <h1 className="pb-7">about me</h1>
            </div>
            <div
              ref={worksHero}
              style={{ willChange: "opacity, transform" }}
              className={`min-h-[10rem] my-4 flex flex-col justify-end py-2 hero-title-wrapper`}
            >
              <h1 className="pb-12">my works</h1>
            </div>
            <div
              ref={resourcesHero}
              style={{ willChange: "opacity, transform" }}
              className={`min-h-[10rem] my-4 flex flex-col justify-end py-2 hero-title-wrapper`}
            >
              <h1 className="pb-7">resources</h1>
            </div>
            <div
              ref={contactHero}
              style={{ willChange: "opacity, transform" }}
              className={`min-h-[10rem] my-4 flex flex-col justify-end py-2 hero-title-wrapper`}
            >
              <h1 className="pb-7">contact me</h1>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={descriptionHero}
          variants={slideUp(1.05)}
          initial="initial"
          animate="entry"
          className="absolute top-[60%] md:static col-start-11 col-end-[16] pb-6 text-white h-fit"
        >
          <p className="max-w-[450px] text-[1.75rem]">
            Desarrollador Frontend centrado en crear páginas web atractivas,
            animadas e innovadoras.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
