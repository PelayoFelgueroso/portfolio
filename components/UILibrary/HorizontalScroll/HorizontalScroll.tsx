'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScroll = () => {
  const scrollContainer = useRef(null);

  useEffect(() => {
    const scrollTrigger1 = ScrollTrigger.create({
      animation: gsap.fromTo(
        ".wrapper-2",
        {
          x: "100%",
        },
        {
          x: "0%",
        }
      ),
      scrub: true,
      markers: true,
      trigger: scrollContainer.current,
      start: "20% top",
      endTrigger: scrollContainer.current,
      end: "40% top",
      toggleActions: "play play reverse reverse",
    });

    const scrollTrigger2 = ScrollTrigger.create({
      animation: gsap.fromTo(
        ".wrapper-3",
        {
          x: "100%",
        },
        {
          x: "0%",
        }
      ),
      scrub: true,
      markers: true,
      trigger: scrollContainer.current,
      start: "75% top",
      endTrigger: scrollContainer.current,
      end: "90% top",
      toggleActions: "play play reverse reverse",
    });

    return () => {
      scrollTrigger1.kill();
      scrollTrigger2.kill();
    };
  }, []);

  return (
    <section ref={scrollContainer} className="relative h-[600vh] mt-[200px]">
      <h2 className="text-2xl mx-auto mb-44 text-center">Horizontal Scroll</h2>

      <div className="sticky top-0 overflow-hidden h-screen w-full max-w-screen flex">
        <div className="h-screen min-w-[100vw] bg-red-700 absolute wrapper-1">
          <div className="">
            <Image src="" alt="" className="" />
          </div>

          <div className="">
            <div className="">
              <div className=""></div>

              <div className=""></div>
            </div>
          </div>
        </div>

        <div
          className={` bg-black min-w-[100vw] h-[200vh] overflow-scroll absolute wrapper-2`}
        >
          <p>Holaaa</p>
          <p>Holaaa</p>

          <p>Holaaa</p>

          <p>Holaaa</p>

          <p className="mt-[150vh]">Holaaa</p>
        </div>

        <div
          className={`bg-yellow-500 h-screen min-w-[100vw] absolute wrapper-3`}
        >
          <Image src="" alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
};
