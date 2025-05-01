"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { footerLinks } from "@/content";
import { FooterForm } from "./components/FooterForm";
import { useInViewContact } from "@/contexts/inViewContact.context";
import { FooterLink } from "./components/FooterLinks";
import { slideUp } from "./anim";
import { usePathname } from "next/navigation";
import { changeTitleAnim } from "@/components/HomePage/SectionTitle/anim";

export const Footer = () => {
  const pathname = usePathname();
  const container = useRef(null);
  const [currentTime, setCurrentTime] = useState("");
  const { inViewContact, setInViewContact } = useInViewContact();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 1", "start 0"],
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewContact(true);
          } else {
            if (entry.boundingClientRect.top > 0) {
              setInViewContact(false);
            }
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (container.current) {
      observer.observe(container.current);
    }

    return () => {
      if (container.current) {
        observer.unobserve(container.current);
      }
    };
  }, []);

  const opacity1 = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const filter1 = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["blur(4px)", "blur(0px)"]
  );
  const y1 = useTransform(scrollYProgress, [0, 0.8], ["75px", "0px"]);

  const opacity2 = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
  const filter2 = useTransform(
    scrollYProgress,
    [0.2, 1],
    ["blur(4px)", "blur(0px)"]
  );
  const y2 = useTransform(scrollYProgress, [0.2, 1], ["100px", "0px"]);

  const opacity3 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const filter3 = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(4px)", "blur(0px)"]
  );
  const y3 = useTransform(scrollYProgress, [0, 0.5], ["100px", "0px"]);
  return (
    <motion.footer
      variants={pathname === "/" ? slideUp : undefined}
      initial="initial"
      animate="entry"
      ref={container}
      id="site-footer"
      className="relative z-50 cursor-light"
    >
      <div className="pt-6 2md:pt-[clamp(40px,_24vw,_90px)] w-full pb-[clamp(16px,_2vw,_24px)] bg-darkBlueCustom">
        <div className="relative z-20 w-full px-[clamp(16px,_1.4vw,_24px)] h-full flex flex-col justify-start items-start gap-[clamp(40px,_8vw,_56px)] 2md:flex-row 2md:items-end">
          <div className="relative z-20 md:w-full h-full flex flex-col justify-end items-start self-stretch gap-[clamp(64px,_8vw,_80px)]">
            <div className="relative 2md:fixed bottom-0 left-0 z-[200] w-full xs:w-[clamp(440px,_39.1vw,_980px)] md:w-[clamp(460px,_39.1vw,_980px)] flex justify-start items-end pb-0 pl-0 2md:pb-[clamp(16px,_2vw,_24px)] 2md:pl-[clamp(16px,_2vw,_24px)]">
              <motion.div
                variants={changeTitleAnim}
                animate={inViewContact ? "change" : "initial"}
                className="relative 2md:absolute opacity-100 w-full fill-whiteCustom"
                style={{ willChange: "filter, transform" }}
              >
                <div className="w-full flex justify-start items-end">
                  <svg
                    width="544"
                    height="125"
                    viewBox="0 0 544 125"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full fill-whiteCustom overflow-visible"
                    preserveAspectRatio="xMinYMin"
                  >
                    <path d="M490.774 45.8601V29.6601H503.554V0.860107H527.494V29.6601H543.334V45.8601H527.494V94.8201C527.494 100.94 530.554 104 536.674 104L543.874 103.82V121.82C540.154 122.06 535.054 122.18 528.574 122.18C521.494 122.18 515.554 120.5 510.754 117.14C505.954 113.66 503.554 107.96 503.554 100.04V45.8601H490.774Z" />
                    <path d="M452.916 124.7C438.636 124.7 427.176 120.08 418.536 110.84C409.896 101.6 405.576 89.9599 405.576 75.9199C405.576 61.8799 409.776 50.2399 418.176 40.9999C426.696 31.7599 437.856 27.1399 451.656 27.1399C463.296 27.1399 472.776 30.1999 480.096 36.3199C487.416 42.4399 491.916 50.6599 493.596 60.9799H469.656C468.816 56.7799 466.896 53.3599 463.896 50.7199C460.896 48.0799 457.176 46.7599 452.736 46.7599C445.536 46.7599 440.016 49.3399 436.176 54.4999C432.336 59.6599 430.416 66.7999 430.416 75.9199C430.416 84.9199 432.276 92.0599 435.996 97.3399C439.716 102.5 445.176 105.08 452.376 105.08C463.056 105.08 469.236 99.8599 470.916 89.4199H494.496C493.656 99.6199 489.516 108.08 482.076 114.8C474.636 121.4 464.916 124.7 452.916 124.7Z" />
                    <path d="M383.173 122C381.973 120.44 381.013 117.02 380.293 111.74H379.933C377.293 115.7 373.933 118.76 369.853 120.92C365.773 123.08 360.073 124.16 352.753 124.16C343.033 124.16 335.233 121.7 329.353 116.78C323.473 111.86 320.533 104.9 320.533 95.9001C320.533 86.5401 323.773 79.7001 330.253 75.3801C336.733 70.9401 345.853 67.8801 357.613 66.2001C366.253 65.0001 372.133 63.8001 375.253 62.6001C378.373 61.2801 379.933 59.0001 379.933 55.7601C379.933 52.4001 378.613 49.7601 375.973 47.8401C373.333 45.8001 369.493 44.7801 364.453 44.7801C353.293 44.7801 347.353 49.1001 346.633 57.7401H324.853C325.213 48.9801 328.753 41.7201 335.473 35.9601C342.193 30.2001 351.913 27.3201 364.633 27.3201C390.553 27.3201 403.513 38.6601 403.513 61.3401V108.32C403.513 115.28 404.593 119.54 406.753 121.1V122H383.173ZM358.693 107.06C365.413 107.06 370.693 105.32 374.533 101.84C378.493 98.3601 380.473 94.2201 380.473 89.4201V75.5601C377.833 77.1201 372.133 78.9201 363.373 80.9601C356.413 82.5201 351.493 84.3201 348.613 86.3601C345.733 88.2801 344.293 91.2801 344.293 95.3601C344.293 103.16 349.093 107.06 358.693 107.06Z" />
                    <path d="M267.989 45.8601V29.6601H280.769V0.860107H304.709V29.6601H320.549V45.8601H304.709V94.8201C304.709 100.94 307.769 104 313.889 104L321.089 103.82V121.82C317.369 122.06 312.269 122.18 305.789 122.18C298.709 122.18 292.769 120.5 287.969 117.14C283.169 113.66 280.769 107.96 280.769 100.04V45.8601H267.989Z" />
                    <path d="M209.298 29.6599V42.2599H209.838C216.198 32.1799 225.318 27.1399 237.198 27.1399C246.678 27.1399 254.358 30.3799 260.238 36.8599C266.118 43.2199 269.058 51.4999 269.058 61.6999V122H244.578V65.2999C244.578 60.2599 243.138 56.1799 240.258 53.0599C237.498 49.9399 233.598 48.3799 228.558 48.3799C223.158 48.3799 218.658 50.3599 215.058 54.3199C211.578 58.2799 209.838 63.3799 209.838 69.6199V122H185.358V29.6599H209.298Z" />
                    <path d="M169.478 110.84C160.478 120.08 148.898 124.7 134.738 124.7C120.578 124.7 108.998 120.08 99.9982 110.84C90.9982 101.48 86.4982 89.8399 86.4982 75.9199C86.4982 61.9999 90.9982 50.4199 99.9982 41.1799C108.998 31.8199 120.578 27.1399 134.738 27.1399C148.898 27.1399 160.478 31.8199 169.478 41.1799C178.478 50.4199 182.978 61.9999 182.978 75.9199C182.978 89.8399 178.478 101.48 169.478 110.84ZM134.738 105.98C142.058 105.98 147.758 103.28 151.838 97.8799C156.038 92.3599 158.138 85.0399 158.138 75.9199C158.138 66.7999 156.038 59.4799 151.838 53.9599C147.758 48.4399 142.058 45.6799 134.738 45.6799C127.298 45.6799 121.538 48.4399 117.458 53.9599C113.378 59.3599 111.338 66.6799 111.338 75.9199C111.338 85.0399 113.378 92.3599 117.458 97.8799C121.538 103.28 127.298 105.98 134.738 105.98Z" />
                    <path d="M47.7404 124.7C33.4604 124.7 22.0005 120.08 13.3605 110.84C4.72046 101.6 0.400452 89.9599 0.400452 75.9199C0.400452 61.8799 4.60046 50.2399 13.0005 40.9999C21.5205 31.7599 32.6805 27.1399 46.4805 27.1399C58.1205 27.1399 67.6005 30.1999 74.9205 36.3199C82.2405 42.4399 86.7405 50.6599 88.4205 60.9799H64.4805C63.6405 56.7799 61.7204 53.3599 58.7204 50.7199C55.7204 48.0799 52.0005 46.7599 47.5605 46.7599C40.3605 46.7599 34.8405 49.3399 31.0005 54.4999C27.1605 59.6599 25.2404 66.7999 25.2404 75.9199C25.2404 84.9199 27.1004 92.0599 30.8204 97.3399C34.5405 102.5 40.0005 105.08 47.2005 105.08C57.8805 105.08 64.0605 99.8599 65.7405 89.4199H89.3204C88.4805 99.6199 84.3405 108.08 76.9005 114.8C69.4605 121.4 59.7405 124.7 47.7404 124.7Z" />
                  </svg>
                </div>
              </motion.div>
            </div>

            <div className="relative w-full max-w-[560px] flex flex-wrap justify-between items-stretch gap-[clamp(16px,_10vw,_24px)] pt-0 xs:flex-nowrap xs:justify-start xs:gap-[clamp(24px,_10vw,_40px)]">
              <motion.div
                style={{
                  willChange: "filter, opacity, transform",
                  opacity: opacity1,
                  y: y1,
                  filter: filter1,
                }}
                className="contact_box"
              >
                <div className="contact_item">
                  <p className="text100 text-whiteCustom/80">Phone</p>
                  <Link href="tel:+34684353595" className="text-100">
                    +34 684 35 35 95
                  </Link>
                </div>

                <div className="contact_item">
                  <p className="text100 text-whiteCustom/80">Address</p>
                  <p className="text100 text-whiteCustom">
                    Oviedo,
                    <br />
                    Asturias, Spain
                  </p>
                </div>
              </motion.div>

              <motion.div
                style={{
                  willChange: "filter, opacity, transform",
                  opacity: opacity2,
                  y: y2,
                  filter: filter2,
                }}
                className="contact_box"
              >
                <div className="contact_item">
                  <p className="text100 text-whiteCustom/80">Email</p>
                  <Link
                    href="mailto:info@pelayofelgueroso.es"
                    className="text-100"
                  >
                    info@pelayofelgueroso.es
                  </Link>
                </div>

                <div className="contact_item">
                  <p className="text100 text-whiteCustom/80">Opening Hours</p>
                  <p className="text100 text-whiteCustom">
                    Mon - Thu: 9:00 am – 7:00 pm
                    <br />
                    Friday: 9:00 am – 5:00 pm
                  </p>
                </div>

                <div className="contact_item">
                  <p className="text100 text-whiteCustom/80">Local Time</p>
                  <p className="text100 text-whiteCustom">{currentTime}</p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            style={{
              willChange: "filter, opacity, transform",
              opacity: opacity3,
              y: y3,
              filter: filter3,
            }}
            className="relative z-20 md:w-full h-full flex flex-col justify-end items-start self-stretch gap-6"
          >
            <div className="w-full max-w-[560px] 2md:w-[clamp(424px,_40vw,_468px)] min-h-[600px] flex flex-col items-stretch">
              <h3 className="text400 pb300 text-whiteCustom m-0">
                Do not hesitate to contact me to discuss a possible project or
                discover more about my work.
              </h3>
                <FooterForm />
            </div>

            <div className="relative left-0 2md:left-auto bottom-0 right-0 z-[300] flex gap-4 xs:gap-6 md:gap-[clamp(16px,_1vw,_26px)] pr-[clamp(16px,_2vw,_24px)]">
              {footerLinks.map((item, index) => (
                <FooterLink
                  key={index}
                  href={item.href}
                  className="text100 text-grayCustom"
                >
                  {item.title}
                </FooterLink>
              ))}
            </div>

            <div className="absolute z-[300] bottom-0 right-0 hidden 2md:flex text100 text-grayCustom">
              <div className="text-grayCustom/50">Made by</div>
              <FooterLink href="/" className="ml-1">
                Myself
              </FooterLink>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};
