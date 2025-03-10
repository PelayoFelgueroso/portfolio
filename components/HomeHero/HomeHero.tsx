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
        y: "-100%",
      }
    );

    gsap.fromTo(
      ".hero-title-wrapper",
      {
        y: "-100%",
      },
      {
        scrollTrigger: {
          trigger: "#works",
          start: "top top",
          scrub: 0.25,
          endTrigger: "#resources",
          end: "top 20%",
        },
        y: "-200%",
      }
    );

    gsap.fromTo(
      ".hero-title-wrapper",
      {
        y: "-200%",
      },
      {
        scrollTrigger: {
          trigger: "#resources",
          start: "top top",
          scrub: 0.25,
          endTrigger: "#contact",
          end: "top 20%",
        },
        y: "-300%",
      }
    );

    gsap.fromTo(
      ".hero-title-wrapper",
      {
        y: "-300%",
      },
      {
        scrollTrigger: {
          trigger: "#contact",
          start: "top top",
          scrub: 0.25,
          end: "bottom top",
        },
        y: "-400%",
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
    <section id="hero" className={`h-screen sticky top-0 z-0 mix-blend-difference`}>
      <div className="h-full grid-18 padding-18 _1row">
        <div className="col-start-1 col-end-10 flex justify-start pb-2 items-end gap-52">
          <motion.div
            variants={slideUp}
            initial="initial"
            animate="entry"
            className={`h-full flex flex-col overflow-hidden leading-[3.75rem] text-[4rem] lg:text-[10rem] lg:leading-[8rem] font-semibold pt-[68vh] text-white`}
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
              className={`min-h-[10rem] flex flex-col justify-end py-2 hero-title-wrapper`}
            >
              <h1 className="pb-7">about me</h1>
            </div>
            <div
              ref={worksHero}
              style={{ willChange: "opacity, transform" }}
              className={`min-h-[10rem] flex flex-col justify-end py-2 hero-title-wrapper`}
            >
              <h1 className="pb-7">my works</h1>
            </div>
            <div
              ref={resourcesHero}
              style={{ willChange: "opacity, transform" }}
              className={`min-h-[10rem] flex flex-col justify-end py-2 hero-title-wrapper`}
            >
              <h1 className="pb-7">resources</h1>
            </div>
            <div
              ref={contactHero}
              style={{ willChange: "opacity, transform" }}
              className={`min-h-[10rem] flex flex-col justify-end py-2 hero-title-wrapper`}
            >
              <h1 className="pb-7">contact me</h1>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
