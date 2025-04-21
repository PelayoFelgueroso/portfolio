"use client";

import { useOutsideClick } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { menuSlideIn } from "./anim";
import { footerLinks, navLinksResources } from "@/content";
import { useResourcesMenu } from "@/contexts/ResourcesMenu.context";

export const ResourcesMenu = () => {
  const { isOpenMenu, setIsOpenMenu } = useResourcesMenu();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOpen = () => {
    setIsOpenMenu(true);
  };

  const handleClose = () => {
    setIsOpenMenu(false);
  };

  useOutsideClick(() => handleClose(), menuRef, buttonRef);

  return (
    <header className="sticky top-0 z-[5010] py-[15px] border-b-[1px] border-[#e8e8e8] w-full flex justify-center items-center bg-whiteCustom font-outfit">
      <div className="relative w-full flex justify-between px-5 max-w-[1575px]">
        <Link onClick={handleClose} href="/" className="">
          <div className="relative z-[2]">
            <svg
              width="44"
              height="42"
              viewBox="0 0 44 42"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M43.4358 41.2359H32.3078C30.6986 41.2359 29.2881 40.8493 28.076 40.0761C26.8639 39.3028 25.9235 38.258 25.2548 36.9414C24.5861 35.6249 24.2517 34.162 24.2517 32.5529C24.2517 30.9438 24.5861 29.4914 25.2548 28.1957C25.9235 26.9001 26.8639 25.8656 28.076 25.0924C29.2881 24.3192 30.6986 23.9326 32.3078 23.9326H43.4358V27.0986H32.3078C31.3047 27.0986 30.4374 27.3494 29.706 27.8509C28.9746 28.3316 28.4104 28.9794 28.0133 29.7944C27.6162 30.6094 27.4177 31.5289 27.4177 32.5529C27.4177 33.5769 27.6162 34.5068 28.0133 35.3427C28.4104 36.1786 28.9746 36.8474 29.706 37.3489C30.4374 37.8296 31.3047 38.0699 32.3078 38.0699H40.2698V34.0889H31.2733V30.9229H43.4358V41.2359Z" />
              <path d="M18.0242 27.0986H3.166V41.2359H0V23.9326H18.0242V27.0986ZM15.9867 34.0889H4.63928V30.9229H15.9867V34.0889Z" />
              <path d="M44 12.1624C44 13.1028 43.7179 13.9596 43.1537 14.7328C42.5894 15.4852 41.8267 16.0912 40.8654 16.5509C39.925 17.0107 38.8801 17.2406 37.7307 17.2406H24.2517V14.1059H37.7307C38.5875 14.1059 39.3189 13.9178 39.925 13.5417C40.5519 13.1655 40.8654 12.7058 40.8654 12.1624V11.3788H30.4897C29.3403 11.3788 28.2954 11.0967 27.355 10.5324C26.4146 9.96818 25.6623 9.21586 25.0981 8.27547C24.5338 7.31418 24.2517 6.25885 24.2517 5.10948V0H27.355V5.10948C27.355 5.98718 27.658 6.72904 28.2641 7.33508C28.891 7.94111 29.6329 8.24413 30.4897 8.24413H40.8654V0H44V12.1624Z" />
              <path d="M19.7169 6.2693C19.7169 7.39777 19.4348 8.44265 18.8706 9.40394C18.3063 10.3652 17.5436 11.1384 16.5823 11.7236C15.6419 12.2878 14.597 12.5699 13.4476 12.5699H4.73332V9.46664H13.4476C14.3253 9.46664 15.0672 9.15317 15.6732 8.52624C16.3002 7.87841 16.6136 7.1261 16.6136 6.2693C16.6136 5.3916 16.3002 4.64973 15.6732 4.04369C15.0672 3.41676 14.3253 3.1033 13.4476 3.1033H3.1033V17.2406H0V0H13.4476C14.597 0 15.6419 0.282118 16.5823 0.846355C17.5436 1.41059 18.3063 2.17336 18.8706 3.13465C19.4348 4.07504 19.7169 5.11993 19.7169 6.2693Z" />
            </svg>
          </div>
        </Link>

        <div className="flex gap-[15px] uppercase text-[12px] md:text-[14px]">
          <div
            ref={buttonRef}
            onClick={isOpenMenu ? handleClose : handleOpen}
            className="w-[40px] h-[35px] flex justify-center items-center cursor-pointer transition-shadow duration-300 rounded-[10px] bg-[#ededed] hover:shadow-[0_0_21px_0blueCustom hover:border border-blueCustom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="28"
              className="fill-darkBlueCustom h-[20px] w-[40px]"
            >
              <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"></path>
            </svg>
          </div>

          <AnimatePresence mode="wait">
            {isOpenMenu && (
              <motion.div
                ref={menuRef}
                variants={menuSlideIn}
                initial="initial"
                animate="open"
                exit="close"
                className="absolute w-[250px] top-[calc(100%_+_30px)] left-[calc(100%_-_270px)] rounded-[10px] normal-case bg-whiteCustom overflow-hidden transition-all"
              >
                <div className="p-[10px] pl-[25px] text-[13px] bg-[#ebeff8]">
                  <p>Navigation</p>
                </div>
                {navLinksResources.map((item, index) => (
                  <Link key={index} onClick={handleClose} href={item.href}>
                    <div className="pl-[20px] cursor-pointer transition-all duration-300 flex items-center hover:bg-[#ededed] hover:pl-[30px]">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20px] h-[20px]"
                      >
                        <path
                          d="M7.00016 11.6668L6.38766 11.0397L9.98975 7.43766H2.3335V6.56266H9.98975L6.38766 2.96058L7.00016 2.3335L11.6668 7.00016L7.00016 11.6668Z"
                          fill="#4479E2"
                        ></path>
                      </svg>
                      <p className="ml-[9px] my-[15px] text-[15px] text-blueCustom">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}

                <div className="p-[10px] pl-[25px] text-[13px] bg-[#ebeff8]">
                  <p>Socials</p>
                </div>

                {footerLinks.map((item, index) => (
                  <Link key={index} onClick={handleClose} href={item.href} target="_blank">
                    <div className="pl-[20px] cursor-pointer transition-all duration-300 flex items-center hover:bg-[#ededed]">
                      <item.icon className="h-[20px] stroke-[#4f576c]" />
                      <p className="ml-[11px] my-[15px] text-[15px] text-darkBlueCustom">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
