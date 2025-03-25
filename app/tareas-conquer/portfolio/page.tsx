import { Space_Grotesk } from "next/font/google";
import {
  adam,
  designPortfolio,
  eLearning,
  entertainment,
  espiral,
  galleryShowcase,
  memoryGame,
  todoApp,
} from "@/public/conquer-tareas/portfolio";
import Image from "next/image";

const spaceGroteskBold = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const spaceGroteskMd = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const headingXL = `${spaceGroteskBold.className} text-[40px] leading-[1em] tracking-[-1.14px] md:text-[72px] md:tracking-[-2.05px] lg:text-[88px] lg:tracking-[-2.5px]`;
const headingL = `${spaceGroteskBold.className} text-[32px] leading-[40px] tracking-[-1px] md:text-[48px] md:leading-[56px] md:tracking-[-1.5px] lg:text-[48px] lg:leading-[56px] `;
const headingM = `${spaceGroteskBold.className} text-[24px] leading-[32px]`;
const body = `${spaceGroteskMd.className} text-[16px] leading-[26px] md:text-[18px] md:leading-[28px] text-[#D9D9D9]`;
const tag = `${spaceGroteskMd.className} text-[18px] leading-[28px] text-[#D9D9D9]`;
const button = `${spaceGroteskBold.className} text-[16px] leading-[26px] tracking-[2.29px] uppercase pb-3 border-b-2 border-[#4EE1A0] transition-all duration-500 hover:text-[#4EE1A0]`;
const paddingGlobal =
  "px-4 md:px-8 lg:px-12 min-[1206px]:px-0 lg:max-w-[1110px] lg:mx-auto";

export default function PortfolioCSS() {
  return (
    <div className="bg-[#151515] text-white">
      <header className="relative z-[10000] bg-transparent">
        <div
          className={`${paddingGlobal} pt-6 w-full flex flex-col justify-center items-center gap-6 md:flex-row md:justify-between`}
        >
          <div className="">
            <div className="">
              <svg
                width="128"
                height="22"
                viewBox="0 0 128 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white transition-all duration-500 hover:fill-[#4EE1A0] cursor-pointer"
              >
                <path d="M5.376 17.336C4.528 17.336 3.768 17.192 3.096 16.904C2.424 16.6 1.888 16.168 1.488 15.608C1.104 15.032 0.912 14.336 0.912 13.52C0.912 12.704 1.104 12.024 1.488 11.48C1.888 10.92 2.432 10.504 3.12 10.232C3.824 9.944 4.624 9.8 5.52 9.8H8.784V9.128C8.784 8.568 8.608 8.112 8.256 7.76C7.904 7.392 7.344 7.208 6.576 7.208C5.824 7.208 5.264 7.384 4.896 7.736C4.528 8.072 4.288 8.512 4.176 9.056L1.392 8.12C1.584 7.512 1.888 6.96 2.304 6.464C2.736 5.952 3.304 5.544 4.008 5.24C4.728 4.92 5.6 4.76 6.624 4.76C8.192 4.76 9.432 5.152 10.344 5.936C11.256 6.72 11.712 7.856 11.712 9.344V13.784C11.712 14.264 11.936 14.504 12.384 14.504H13.344V17H11.328C10.736 17 10.248 16.856 9.864 16.568C9.48 16.28 9.288 15.896 9.288 15.416V15.392H8.832C8.768 15.584 8.624 15.84 8.4 16.16C8.176 16.464 7.824 16.736 7.344 16.976C6.864 17.216 6.208 17.336 5.376 17.336ZM5.904 14.888C6.752 14.888 7.44 14.656 7.968 14.192C8.512 13.712 8.784 13.08 8.784 12.296V12.056H5.736C5.176 12.056 4.736 12.176 4.416 12.416C4.096 12.656 3.936 12.992 3.936 13.424C3.936 13.856 4.104 14.208 4.44 14.48C4.776 14.752 5.264 14.888 5.904 14.888ZM19.7873 17.336C18.8433 17.336 17.9553 17.104 17.1233 16.64C16.3073 16.16 15.6513 15.464 15.1553 14.552C14.6593 13.64 14.4113 12.536 14.4113 11.24V10.856C14.4113 9.56 14.6593 8.456 15.1553 7.544C15.6513 6.632 16.3073 5.944 17.1233 5.48C17.9393 5 18.8273 4.76 19.7873 4.76C20.5073 4.76 21.1073 4.848 21.5873 5.024C22.0833 5.184 22.4833 5.392 22.7873 5.648C23.0913 5.904 23.3233 6.176 23.4833 6.464H23.9153V0.199999H26.9393V17H23.9633V15.56H23.5313C23.2593 16.008 22.8353 16.416 22.2593 16.784C21.6993 17.152 20.8753 17.336 19.7873 17.336ZM20.6993 14.696C21.6273 14.696 22.4033 14.4 23.0273 13.808C23.6513 13.2 23.9633 12.32 23.9633 11.168V10.928C23.9633 9.776 23.6513 8.904 23.0273 8.312C22.4193 7.704 21.6433 7.4 20.6993 7.4C19.7713 7.4 18.9953 7.704 18.3713 8.312C17.7473 8.904 17.4353 9.776 17.4353 10.928V11.168C17.4353 12.32 17.7473 13.2 18.3713 13.808C18.9953 14.4 19.7713 14.696 20.6993 14.696ZM33.6546 17.336C32.8066 17.336 32.0466 17.192 31.3746 16.904C30.7026 16.6 30.1666 16.168 29.7666 15.608C29.3826 15.032 29.1906 14.336 29.1906 13.52C29.1906 12.704 29.3826 12.024 29.7666 11.48C30.1666 10.92 30.7106 10.504 31.3986 10.232C32.1026 9.944 32.9026 9.8 33.7986 9.8H37.0626V9.128C37.0626 8.568 36.8866 8.112 36.5346 7.76C36.1826 7.392 35.6226 7.208 34.8546 7.208C34.1026 7.208 33.5426 7.384 33.1746 7.736C32.8066 8.072 32.5666 8.512 32.4546 9.056L29.6706 8.12C29.8626 7.512 30.1666 6.96 30.5826 6.464C31.0146 5.952 31.5826 5.544 32.2866 5.24C33.0066 4.92 33.8786 4.76 34.9026 4.76C36.4706 4.76 37.7106 5.152 38.6226 5.936C39.5346 6.72 39.9906 7.856 39.9906 9.344V13.784C39.9906 14.264 40.2146 14.504 40.6626 14.504H41.6226V17H39.6066C39.0146 17 38.5266 16.856 38.1426 16.568C37.7586 16.28 37.5666 15.896 37.5666 15.416V15.392H37.1106C37.0466 15.584 36.9026 15.84 36.6786 16.16C36.4546 16.464 36.1026 16.736 35.6226 16.976C35.1426 17.216 34.4866 17.336 33.6546 17.336ZM34.1826 14.888C35.0306 14.888 35.7186 14.656 36.2466 14.192C36.7906 13.712 37.0626 13.08 37.0626 12.296V12.056H34.0146C33.4546 12.056 33.0146 12.176 32.6946 12.416C32.3746 12.656 32.2146 12.992 32.2146 13.424C32.2146 13.856 32.3826 14.208 32.7186 14.48C33.0546 14.752 33.5426 14.888 34.1826 14.888ZM43.5003 17V5.096H46.4763V6.392H46.9083C47.1163 5.992 47.4603 5.648 47.9403 5.36C48.4203 5.056 49.0523 4.904 49.8363 4.904C50.6843 4.904 51.3643 5.072 51.8763 5.408C52.3883 5.728 52.7803 6.152 53.0523 6.68H53.4843C53.7563 6.168 54.1403 5.744 54.6363 5.408C55.1323 5.072 55.8363 4.904 56.7483 4.904C57.4843 4.904 58.1483 5.064 58.7403 5.384C59.3483 5.688 59.8283 6.16 60.1803 6.8C60.5483 7.424 60.7323 8.216 60.7323 9.176V17H57.7083V9.392C57.7083 8.736 57.5403 8.248 57.2043 7.928C56.8683 7.592 56.3963 7.424 55.7883 7.424C55.1003 7.424 54.5643 7.648 54.1803 8.096C53.8123 8.528 53.6283 9.152 53.6283 9.968V17H50.6043V9.392C50.6043 8.736 50.4363 8.248 50.1003 7.928C49.7643 7.592 49.2923 7.424 48.6843 7.424C47.9963 7.424 47.4603 7.648 47.0763 8.096C46.7083 8.528 46.5243 9.152 46.5243 9.968V17H43.5003ZM63.6514 17V0.199999H66.6754V9.488H67.1074L71.0434 5.096H74.9794L69.4834 10.856L75.1714 17H71.2834L67.1074 12.272H66.6754V17H63.6514ZM81.5623 17.336C80.3783 17.336 79.3303 17.088 78.4183 16.592C77.5223 16.08 76.8183 15.368 76.3063 14.456C75.8103 13.528 75.5623 12.44 75.5623 11.192V10.904C75.5623 9.656 75.8103 8.576 76.3063 7.664C76.8023 6.736 77.4983 6.024 78.3943 5.528C79.2903 5.016 80.3303 4.76 81.5143 4.76C82.6823 4.76 83.6983 5.024 84.5623 5.552C85.4263 6.064 86.0983 6.784 86.5783 7.712C87.0583 8.624 87.2983 9.688 87.2983 10.904V11.936H78.6343C78.6663 12.752 78.9703 13.416 79.5463 13.928C80.1223 14.44 80.8263 14.696 81.6583 14.696C82.5063 14.696 83.1303 14.512 83.5303 14.144C83.9303 13.776 84.2343 13.368 84.4423 12.92L86.9143 14.216C86.6903 14.632 86.3623 15.088 85.9303 15.584C85.5143 16.064 84.9543 16.48 84.2503 16.832C83.5463 17.168 82.6503 17.336 81.5623 17.336ZM78.6583 9.68H84.2263C84.1623 8.992 83.8823 8.44 83.3863 8.024C82.9063 7.608 82.2743 7.4 81.4903 7.4C80.6743 7.4 80.0263 7.608 79.5463 8.024C79.0663 8.44 78.7703 8.992 78.6583 9.68ZM90.9526 21.8V19.16H97.4326C97.8806 19.16 98.1046 18.92 98.1046 18.44V15.44H97.6726C97.5446 15.712 97.3446 15.984 97.0726 16.256C96.8006 16.528 96.4326 16.752 95.9686 16.928C95.5046 17.104 94.9126 17.192 94.1926 17.192C93.2646 17.192 92.4486 16.984 91.7446 16.568C91.0566 16.136 90.5206 15.544 90.1366 14.792C89.7526 14.04 89.5606 13.176 89.5606 12.2V5.096H92.5846V11.96C92.5846 12.856 92.8006 13.528 93.2326 13.976C93.6806 14.424 94.3126 14.648 95.1286 14.648C96.0566 14.648 96.7766 14.344 97.2886 13.736C97.8006 13.112 98.0566 12.248 98.0566 11.144V5.096H101.081V19.112C101.081 19.928 100.841 20.576 100.361 21.056C99.8806 21.552 99.2406 21.8 98.4406 21.8H90.9526ZM109.536 17.336C108.352 17.336 107.304 17.088 106.392 16.592C105.496 16.08 104.792 15.368 104.28 14.456C103.784 13.528 103.536 12.44 103.536 11.192V10.904C103.536 9.656 103.784 8.576 104.28 7.664C104.776 6.736 105.472 6.024 106.368 5.528C107.264 5.016 108.304 4.76 109.488 4.76C110.656 4.76 111.672 5.024 112.536 5.552C113.4 6.064 114.072 6.784 114.552 7.712C115.032 8.624 115.272 9.688 115.272 10.904V11.936H106.608C106.64 12.752 106.944 13.416 107.52 13.928C108.096 14.44 108.8 14.696 109.632 14.696C110.48 14.696 111.104 14.512 111.504 14.144C111.904 13.776 112.208 13.368 112.416 12.92L114.888 14.216C114.664 14.632 114.336 15.088 113.904 15.584C113.488 16.064 112.928 16.48 112.224 16.832C111.52 17.168 110.624 17.336 109.536 17.336ZM106.632 9.68H112.2C112.136 8.992 111.856 8.44 111.36 8.024C110.88 7.608 110.248 7.4 109.464 7.4C108.648 7.4 108 7.608 107.52 8.024C107.04 8.44 106.744 8.992 106.632 9.68ZM122.575 17.336C121.023 17.336 119.751 17 118.759 16.328C117.767 15.656 117.167 14.696 116.959 13.448L119.743 12.728C119.855 13.288 120.039 13.728 120.295 14.048C120.567 14.368 120.895 14.6 121.279 14.744C121.679 14.872 122.111 14.936 122.575 14.936C123.279 14.936 123.799 14.816 124.135 14.576C124.471 14.32 124.639 14.008 124.639 13.64C124.639 13.272 124.479 12.992 124.159 12.8C123.839 12.592 123.327 12.424 122.623 12.296L121.951 12.176C121.119 12.016 120.359 11.8 119.671 11.528C118.983 11.24 118.431 10.848 118.015 10.352C117.599 9.856 117.391 9.216 117.391 8.432C117.391 7.248 117.823 6.344 118.687 5.72C119.551 5.08 120.687 4.76 122.095 4.76C123.423 4.76 124.527 5.056 125.407 5.648C126.287 6.24 126.863 7.016 127.135 7.976L124.327 8.84C124.199 8.232 123.935 7.8 123.535 7.544C123.151 7.288 122.671 7.16 122.095 7.16C121.519 7.16 121.079 7.264 120.775 7.472C120.471 7.664 120.319 7.936 120.319 8.288C120.319 8.672 120.479 8.96 120.799 9.152C121.119 9.328 121.551 9.464 122.095 9.56L122.767 9.68C123.663 9.84 124.471 10.056 125.191 10.328C125.927 10.584 126.503 10.96 126.919 11.456C127.351 11.936 127.567 12.592 127.567 13.424C127.567 14.672 127.111 15.64 126.199 16.328C125.303 17 124.095 17.336 122.575 17.336Z" />
              </svg>
            </div>
          </div>

          <div className="flex gap-6 md:pr-[30px]">
            <div className="">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white transition-all duration-500 hover:fill-[#4EE1A0] cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.84282 0.800049C4.40466 0.800049 0 5.20471 0 10.6429C0 14.9983 2.81751 18.6771 6.73003 19.9812C7.22217 20.0674 7.40672 19.7721 7.40672 19.5137C7.40672 19.2799 7.39442 18.5048 7.39442 17.6805C4.92141 18.1357 4.28163 17.0776 4.08477 16.524C3.97404 16.241 3.4942 15.3674 3.07588 15.1337C2.73138 14.9491 2.23924 14.4939 3.06358 14.4816C3.8387 14.4693 4.39236 15.1952 4.57691 15.4905C5.46277 16.9792 6.87767 16.5609 7.44363 16.3025C7.52976 15.6627 7.78813 15.2321 8.07111 14.986C5.88109 14.7399 3.59263 13.891 3.59263 10.1261C3.59263 9.05571 3.97404 8.16986 4.60152 7.48086C4.50309 7.23479 4.15859 6.2259 4.69995 4.87252C4.69995 4.87252 5.52428 4.61414 7.40672 5.8814C8.19415 5.65994 9.03079 5.54921 9.86743 5.54921C10.7041 5.54921 11.5407 5.65994 12.3281 5.8814C14.2106 4.60184 15.0349 4.87252 15.0349 4.87252C15.5763 6.2259 15.2318 7.23479 15.1333 7.48086C15.7608 8.16986 16.1422 9.04341 16.1422 10.1261C16.1422 13.9033 13.8415 14.7399 11.6514 14.986C12.0082 15.2936 12.3158 15.8842 12.3158 16.8069C12.3158 18.1234 12.3035 19.1815 12.3035 19.5137C12.3035 19.7721 12.4881 20.0797 12.9802 19.9812C14.9341 19.3216 16.632 18.0657 17.8349 16.3906C19.0378 14.7153 19.6851 12.7051 19.6856 10.6429C19.6856 5.20471 15.281 0.800049 9.84282 0.800049Z"
                />
              </svg>
            </div>
            <div className="">
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white transition-all duration-500 hover:fill-[#4EE1A0] cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.2673 0.784274C10.1101 0.787286 9.96029 0.851865 9.85016 0.964142C9.74003 1.07642 9.67835 1.22742 9.67838 1.38469V12.7974C9.67838 12.9567 9.74164 13.1094 9.85423 13.222C9.96684 13.3346 10.1196 13.3978 10.2788 13.3978C10.438 13.3978 10.5908 13.3346 10.7034 13.222C10.816 13.1094 10.8792 12.9567 10.8792 12.7974V1.38469C10.8793 1.30494 10.8633 1.22598 10.8325 1.15244C10.8017 1.07888 10.7565 1.01221 10.6996 0.956317C10.6427 0.90042 10.5752 0.856422 10.5012 0.826884C10.4271 0.797346 10.3479 0.782857 10.2681 0.784274H10.2673ZM19.3523 4.20302C19.2738 4.20528 19.1966 4.22283 19.125 4.2547L13.9723 6.55463C13.8669 6.60226 13.7775 6.67928 13.7147 6.77647C13.652 6.87365 13.6186 6.98688 13.6186 7.10255C13.6186 7.21822 13.652 7.33144 13.7147 7.42863C13.7775 7.52582 13.8669 7.60284 13.9723 7.65047L19.125 9.95775C19.2025 9.9926 19.2862 10.0108 19.3711 10.0111C19.5084 10.0107 19.6413 9.96317 19.7478 9.87665C19.8544 9.79003 19.9281 9.66956 19.9565 9.53529C19.9851 9.401 19.9667 9.26102 19.9044 9.13864C19.8422 9.01627 19.74 8.9189 19.6147 8.86277L15.6891 7.10337L19.6147 5.35053C19.7597 5.28527 19.8728 5.16533 19.9297 5.0169C19.9866 4.86846 19.9825 4.70357 19.9182 4.55818C19.8695 4.4497 19.7898 4.35808 19.689 4.29488C19.5883 4.23167 19.4711 4.1997 19.3523 4.20302ZM0.629063 8.38812C0.712717 8.3485 0.804399 8.32876 0.896945 8.33044V8.33126C1.02776 8.33381 1.15415 8.37902 1.25691 8.46001C1.35966 8.541 1.43315 8.65333 1.46619 8.77993C2.09462 11.1872 3.50383 13.318 5.47307 14.8385C7.4423 16.359 9.8603 17.1834 12.3482 17.1824C12.5075 17.1824 12.6602 17.2457 12.7728 17.3583C12.8854 17.4709 12.9486 17.6236 12.9486 17.7828C12.9486 17.9421 12.8854 18.0948 12.7728 18.2074C12.6602 18.32 12.5075 18.3832 12.3482 18.3832C6.68206 18.3832 1.72866 14.5577 0.304736 9.08096C0.28158 8.99134 0.279458 8.89757 0.298536 8.807C0.317613 8.71643 0.357374 8.63149 0.414711 8.55882C0.472049 8.48616 0.54541 8.42774 0.629063 8.38812Z"
                />
              </svg>
            </div>
            <div className="">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white transition-all duration-500 hover:fill-[#4EE1A0] cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.84099 2.64336C3.92927 2.64336 3.18753 3.38413 3.18753 4.29466C3.18753 5.20579 3.92927 5.94704 4.84099 5.94704C5.75093 5.94704 6.49121 5.20579 6.49121 4.29466C6.49121 3.38413 5.75093 2.64336 4.84099 2.64336ZM3.41319 7.19855V16.3612H6.26328L6.26436 7.19855H3.41319ZM8.05167 7.19771V16.3603L10.8953 16.3614L10.8964 11.8276C10.8964 10.6639 11.0991 9.47431 12.6027 9.47431C14.0834 9.47431 14.0834 10.8781 14.0834 11.9032V16.3603L16.9303 16.3592V11.3351C16.9303 9.06782 16.5164 6.96979 13.5143 6.96979C12.1042 6.96979 11.1815 7.7668 10.8197 8.4494H10.7797L10.7797 7.19771H8.05167ZM18.3483 19.2H1.98544C1.20474 19.2 0.56958 18.5784 0.56958 17.8144V1.38454C0.56958 0.621101 1.20474 0 1.98544 0H18.3483C19.132 0 19.7696 0.621101 19.7696 1.38454V17.8144C19.7696 18.5784 19.132 19.2 18.3483 19.2Z"
                />
              </svg>
            </div>
            <div className="">
              <svg
                width="19"
                height="16"
                viewBox="0 0 19 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white transition-all duration-500 hover:fill-[#4EE1A0] cursor-pointer"
              >
                <path d="M18.9939 2.56447C18.309 2.86796 17.5733 3.07302 16.7997 3.1657C17.5979 2.68816 18.195 1.93655 18.4796 1.05114C17.7298 1.49652 16.9091 1.81002 16.0534 1.97801C15.4778 1.36354 14.7156 0.956256 13.8849 0.819402C13.0542 0.682547 12.2016 0.823762 11.4594 1.22114C10.7172 1.61851 10.127 2.2498 9.78033 3.017C9.43366 3.7842 9.35 4.64438 9.54233 5.464C8.02298 5.38772 6.53667 4.99282 5.17983 4.30493C3.823 3.61705 2.62596 2.65155 1.66642 1.4711C1.33833 2.03707 1.14967 2.69325 1.14967 3.39209C1.14931 4.02121 1.30423 4.64069 1.6007 5.19557C1.89717 5.75045 2.32602 6.22357 2.8492 6.57296C2.24245 6.55365 1.64909 6.38971 1.11851 6.09477V6.14398C1.11844 7.02634 1.42365 7.88155 1.98236 8.56451C2.54106 9.24741 3.31884 9.71602 4.18372 9.89083C3.62087 10.0431 3.03075 10.0655 2.45795 9.95638C2.70196 10.7157 3.17729 11.3796 3.81738 11.8553C4.45747 12.3309 5.23028 12.5945 6.02761 12.609C4.67409 13.6717 3.00249 14.248 1.28173 14.2454C0.976918 14.2455 0.672362 14.2277 0.369629 14.1921C2.1163 15.3152 4.14955 15.9112 6.2261 15.9088C13.2555 15.9088 17.0984 10.0868 17.0984 5.03748C17.0984 4.87343 17.0942 4.70775 17.0868 4.5437C17.8343 4.00314 18.4795 3.33377 18.9922 2.56694L18.9939 2.56447Z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative mt-[-90px] md:mt-[-46px]">
          <div
            className={`${paddingGlobal} flex flex-col items-center gap-10 md:pt-[150px] md:flex-row lg:relative lg:pt-[200px]`}
          >
            <div className="absolute w-[530px] h-[129px] top-[17%] right-[55%] md:top-[14.5%] lg:right-[80%] lg:top-[21%]">
              <Image src={espiral} alt="image" className="w-full h-full" />
            </div>

            <div className="absolute z-[1] top-[78%] right-[-66px] lg:top-[85%] lg:right-[280px]">
              <svg
                width="129"
                height="129"
                viewBox="0 0 129 129"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="64.5" cy="64.5" r="64" stroke="white" />
              </svg>
            </div>

            <div className="bg-[#242424] pt-[140px] w-[175px] md:pt-[0px] md:absolute md:h-full right-0 top-0 md:flex md:flex-col md:justify-end md:w-[40%] md:max-w-[350px] lg:h-[720px] lg:w-[445px]">
              <Image
                src={adam}
                alt="image"
                className="relative w-full object-contain lg:object-cover"
              />
            </div>

            <div className="flex flex-col gap-6 md:order-1 md:max-w-md md:gap-[60px] lg:max-w-3xl lg:gap-[42px]">
              <h1 className={`${headingXL} text-center md:text-start`}>
                <span className="md:block lg:inline-block">Nice to</span> meet
                you! I&rsquo;m{" "}
                <span className="underline underline-offset-8 decoration-[#4EE1A0] md:underline-offset-[14px] lg:underline-offset-[18px]">
                  Adam Keyes.
                </span>
              </h1>

              <div className="flex flex-col items-center gap-6 md:items-start md:gap-8 lg:gap-16">
                <p className={`${body} text-center max-w-md md:text-start`}>
                  Based in the UK, I’m a front-end developer passionate about
                  building accessible web apps that users love.
                </p>
                <a href="" className={`${button}`}>
                  Contact me
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pt-20 pb-20 md:pt-[60px] md:pb-[100px] lg:pt-[219px]">
          <div className={`${paddingGlobal}`}>
            <div className="py-[40px] border-y border-white flex flex-col gap-y-6 items-center text-center md:text-start md:pb-0 md:pt-[52px] md:border-b-0 md:gap-y-[52px] md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-[58px] lg:pt-[72px]">
              <div className="flex flex-col">
                <h3 className={`${headingL}`}>HTML</h3>
                <p className={`${body} capitalize`}>4 years experience</p>
              </div>

              <div className="flex flex-col">
                <h3 className={`${headingL}`}>CSS</h3>
                <p className={`${body} capitalize`}>4 years experience</p>
              </div>

              <div className="flex flex-col">
                <h3 className={`${headingL}`}>Javascript</h3>
                <p className={`${body} capitalize`}>4 years experience</p>
              </div>

              <div className="flex flex-col">
                <h3 className={`${headingL}`}>Accesibility</h3>
                <p className={`${body} capitalize`}>4 years experience</p>
              </div>

              <div className="flex flex-col">
                <h3 className={`${headingL}`}>React</h3>
                <p className={`${body} capitalize`}>3 years experience</p>
              </div>

              <div className="flex flex-col">
                <h3 className={`${headingL}`}>Sass</h3>
                <p className={`${body} capitalize`}>3 years experience</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute w-[530px] h-[129px] top-[-64px] left-[55%] md:top-[-50px] md:left-[75%] lg:left-[80%]">
              <Image src={espiral} alt="image" className="w-full h-full" />
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-[100px] lg:pb-[140px]">
          <div
            className={`${paddingGlobal} flex flex-col gap-10 md:gap-[60px]`}
          >
            <div className="flex justify-between items-center">
              <div className="">
                <h2 className={`${headingXL}`}>Projects</h2>
              </div>

              <div className="pb-[9px]">
                <a href="" className={button}>
                  Contact me
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-y-10 md:grid md:grid-cols-2 md:gap-y-[60px] md:gap-x-6 lg:gap-[69px] lg:gap-x-[30px]">
              <div className="flex flex-col gap-5">
                <div className="relative group">
                  <Image
                    src={designPortfolio}
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                  <div className="opacity-0 tansition-all duration-500 group-hover:opacity-100 absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 w-full h-full bg-[#151515] opacity-75" />
                    <div className="relative w-full h-full flex flex-col justify-center items-center gap-12">
                      <div>
                        <a href="" className={button}>
                          View project
                        </a>
                      </div>

                      <div>
                        <a href="" className={button}>
                          View code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <h3 className={`${headingM} uppercase`}>Design portfolio</h3>
                  <div className={`flex gap-4 ${tag}`}>
                    <span>HTML</span>
                    <span>CSS</span>
                  </div>
                </div>

                <div className="flex gap-8 lg:hidden">
                  <a href="" className={button}>
                    View project
                  </a>
                  <a href="" className={button}>
                    View code
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="relative group">
                  <Image
                    src={eLearning}
                    alt="image"
                    className="w-full h-full object-cover"
                  />

                  <div className="opacity-0 tansition-all duration-500 group-hover:opacity-100 absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 w-full h-full bg-[#151515] opacity-75" />
                    <div className="relative w-full h-full flex flex-col justify-center items-center gap-12">
                      <div>
                        <a href="" className={button}>
                          View project
                        </a>
                      </div>

                      <div>
                        <a href="" className={button}>
                          View code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <h3 className={`${headingM} uppercase`}>
                    E-learning landing page
                  </h3>
                  <div className={`flex gap-4 ${tag}`}>
                    <span>HTML</span>
                    <span>CSS</span>
                  </div>
                </div>

                <div className="flex gap-8 lg:hidden">
                  <a href="" className={button}>
                    View project
                  </a>
                  <a href="" className={button}>
                    View code
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="relative group">
                  <Image
                    src={todoApp}
                    alt="image"
                    className="w-full h-full object-cover"
                  />

                  <div className="opacity-0 tansition-all duration-500 group-hover:opacity-100 absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 w-full h-full bg-[#151515] opacity-75" />
                    <div className="relative w-full h-full flex flex-col justify-center items-center gap-12">
                      <div>
                        <a href="" className={button}>
                          View project
                        </a>
                      </div>

                      <div>
                        <a href="" className={button}>
                          View code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <h3 className={`${headingM} uppercase`}>Todo web app</h3>
                  <div className={`flex gap-4 ${tag}`}>
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>Javascript</span>
                  </div>
                </div>

                <div className="flex gap-8 lg:hidden">
                  <a href="" className={button}>
                    View project
                  </a>
                  <a href="" className={button}>
                    View code
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="relative group">
                  <Image
                    src={entertainment}
                    alt="image"
                    className="w-full h-full object-cover"
                  />

                  <div className="opacity-0 tansition-all duration-500 group-hover:opacity-100 absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 w-full h-full bg-[#151515] opacity-75" />
                    <div className="relative w-full h-full flex flex-col justify-center items-center gap-12">
                      <div>
                        <a href="" className={button}>
                          View project
                        </a>
                      </div>

                      <div>
                        <a href="" className={button}>
                          View code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <h3 className={`${headingM} uppercase`}>
                    Entertainment web app
                  </h3>
                  <div className={`flex gap-4 ${tag}`}>
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>Javascript</span>
                  </div>
                </div>

                <div className="flex gap-8 lg:hidden">
                  <a href="" className={button}>
                    View project
                  </a>
                  <a href="" className={button}>
                    View code
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="relative group">
                  <Image
                    src={memoryGame}
                    alt="image"
                    className="w-full h-full object-cover"
                  />

                  <div className="opacity-0 tansition-all duration-500 group-hover:opacity-100 absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 w-full h-full bg-[#151515] opacity-75" />
                    <div className="relative w-full h-full flex flex-col justify-center items-center gap-12">
                      <div>
                        <a href="" className={button}>
                          View project
                        </a>
                      </div>

                      <div>
                        <a href="" className={button}>
                          View code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <h3 className={`${headingM} uppercase`}>Memory game</h3>
                  <div className={`flex gap-4 ${tag}`}>
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>Javascript</span>
                  </div>
                </div>

                <div className="flex gap-8 lg:hidden">
                  <a href="" className={button}>
                    View project
                  </a>
                  <a href="" className={button}>
                    View code
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="relative group">
                  <Image
                    src={galleryShowcase}
                    alt="image"
                    className="w-full h-full object-cover"
                  />

                  <div className="opacity-0 tansition-all duration-500 group-hover:opacity-100 absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 w-full h-full bg-[#151515] opacity-75" />
                    <div className="relative w-full h-full flex flex-col justify-center items-center gap-12">
                      <div>
                        <a href="" className={button}>
                          View project
                        </a>
                      </div>

                      <div>
                        <a href="" className={button}>
                          View code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <h3 className={`${headingM} uppercase`}>
                    Art gallery showcase
                  </h3>
                  <div className={`flex gap-4 ${tag}`}>
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>Javascript</span>
                  </div>
                </div>

                <div className="flex gap-8 lg:hidden">
                  <a href="" className={button}>
                    View project
                  </a>
                  <a href="" className={button}>
                    View code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative bg-[#242424]">
        <div
          className={`${paddingGlobal} py-[60px] md:pb-[40px] lg:pt-[84px] lg:pb-[92px]`}
        >
          <div className="max-w-[450px] mx-auto lg:flex lg:justify-between lg:items-start lg:max-w-full lg:mb-[92px]">
            <div className="flex flex-col gap-5 items-center text-center lg:max-w-[450px] lg:text-start lg:items-start">
              <h2 className={headingXL}>Contact</h2>
              <p className={body}>
                I would love to hear about your project and how I could help.
                Please fill in the form, and I’ll get back to you as soon as
                possible.
              </p>
            </div>

            <div className="mt-[50px] mb-[85px] md:mb-[92px] lg:max-w-[450px] lg:w-full lg:m-0">
              <form className="flex flex-col gap-8">
                <input
                  placeholder="NAME"
                  className={`${spaceGroteskMd.className} w-full bg-transparent placeholder:uppercase placeholder:text-[16px] placeholder:leading-[26px] placeholder:tracking-[-0.22px] pb-2 border-b border-white transition-all duration-500 focus-visible:border-[#4EE1A0] focus-visible:outline-0`}
                />

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="EMAIL"
                  className={`${spaceGroteskMd.className} w-full bg-transparent placeholder:uppercase placeholder:text-[16px] placeholder:leading-[26px] placeholder:tracking-[-0.22px] pb-2 border-b border-white transition-all duration-500 focus-visible:border-[#4EE1A0] focus-visible:outline-0`}
                />

                <textarea
                  placeholder="MESSAGE"
                  className={`${spaceGroteskMd.className} min-h-[100px] w-full bg-transparent placeholder:uppercase placeholder:text-[16px] placeholder:leading-[26px] placeholder:tracking-[-0.22px] pb-2 border-b border-white transition-all duration-500 focus-visible:border-[#4EE1A0] focus-visible:outline-0`}
                />

                <div className="w-fit ml-auto">
                  <button type="submit" className={button}>
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="pt-10 border-t border-white w-full flex flex-col justify-center items-center gap-6 md:flex-row md:justify-between md:pt-[30px] lg:pt-[47px]">
            <div className="">
              <div className="">
                <svg
                  width="128"
                  height="22"
                  viewBox="0 0 128 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white transition-all duration-500 hover:fill-[#4EE1A0] cursor-pointer"
                >
                  <path d="M5.376 17.336C4.528 17.336 3.768 17.192 3.096 16.904C2.424 16.6 1.888 16.168 1.488 15.608C1.104 15.032 0.912 14.336 0.912 13.52C0.912 12.704 1.104 12.024 1.488 11.48C1.888 10.92 2.432 10.504 3.12 10.232C3.824 9.944 4.624 9.8 5.52 9.8H8.784V9.128C8.784 8.568 8.608 8.112 8.256 7.76C7.904 7.392 7.344 7.208 6.576 7.208C5.824 7.208 5.264 7.384 4.896 7.736C4.528 8.072 4.288 8.512 4.176 9.056L1.392 8.12C1.584 7.512 1.888 6.96 2.304 6.464C2.736 5.952 3.304 5.544 4.008 5.24C4.728 4.92 5.6 4.76 6.624 4.76C8.192 4.76 9.432 5.152 10.344 5.936C11.256 6.72 11.712 7.856 11.712 9.344V13.784C11.712 14.264 11.936 14.504 12.384 14.504H13.344V17H11.328C10.736 17 10.248 16.856 9.864 16.568C9.48 16.28 9.288 15.896 9.288 15.416V15.392H8.832C8.768 15.584 8.624 15.84 8.4 16.16C8.176 16.464 7.824 16.736 7.344 16.976C6.864 17.216 6.208 17.336 5.376 17.336ZM5.904 14.888C6.752 14.888 7.44 14.656 7.968 14.192C8.512 13.712 8.784 13.08 8.784 12.296V12.056H5.736C5.176 12.056 4.736 12.176 4.416 12.416C4.096 12.656 3.936 12.992 3.936 13.424C3.936 13.856 4.104 14.208 4.44 14.48C4.776 14.752 5.264 14.888 5.904 14.888ZM19.7873 17.336C18.8433 17.336 17.9553 17.104 17.1233 16.64C16.3073 16.16 15.6513 15.464 15.1553 14.552C14.6593 13.64 14.4113 12.536 14.4113 11.24V10.856C14.4113 9.56 14.6593 8.456 15.1553 7.544C15.6513 6.632 16.3073 5.944 17.1233 5.48C17.9393 5 18.8273 4.76 19.7873 4.76C20.5073 4.76 21.1073 4.848 21.5873 5.024C22.0833 5.184 22.4833 5.392 22.7873 5.648C23.0913 5.904 23.3233 6.176 23.4833 6.464H23.9153V0.199999H26.9393V17H23.9633V15.56H23.5313C23.2593 16.008 22.8353 16.416 22.2593 16.784C21.6993 17.152 20.8753 17.336 19.7873 17.336ZM20.6993 14.696C21.6273 14.696 22.4033 14.4 23.0273 13.808C23.6513 13.2 23.9633 12.32 23.9633 11.168V10.928C23.9633 9.776 23.6513 8.904 23.0273 8.312C22.4193 7.704 21.6433 7.4 20.6993 7.4C19.7713 7.4 18.9953 7.704 18.3713 8.312C17.7473 8.904 17.4353 9.776 17.4353 10.928V11.168C17.4353 12.32 17.7473 13.2 18.3713 13.808C18.9953 14.4 19.7713 14.696 20.6993 14.696ZM33.6546 17.336C32.8066 17.336 32.0466 17.192 31.3746 16.904C30.7026 16.6 30.1666 16.168 29.7666 15.608C29.3826 15.032 29.1906 14.336 29.1906 13.52C29.1906 12.704 29.3826 12.024 29.7666 11.48C30.1666 10.92 30.7106 10.504 31.3986 10.232C32.1026 9.944 32.9026 9.8 33.7986 9.8H37.0626V9.128C37.0626 8.568 36.8866 8.112 36.5346 7.76C36.1826 7.392 35.6226 7.208 34.8546 7.208C34.1026 7.208 33.5426 7.384 33.1746 7.736C32.8066 8.072 32.5666 8.512 32.4546 9.056L29.6706 8.12C29.8626 7.512 30.1666 6.96 30.5826 6.464C31.0146 5.952 31.5826 5.544 32.2866 5.24C33.0066 4.92 33.8786 4.76 34.9026 4.76C36.4706 4.76 37.7106 5.152 38.6226 5.936C39.5346 6.72 39.9906 7.856 39.9906 9.344V13.784C39.9906 14.264 40.2146 14.504 40.6626 14.504H41.6226V17H39.6066C39.0146 17 38.5266 16.856 38.1426 16.568C37.7586 16.28 37.5666 15.896 37.5666 15.416V15.392H37.1106C37.0466 15.584 36.9026 15.84 36.6786 16.16C36.4546 16.464 36.1026 16.736 35.6226 16.976C35.1426 17.216 34.4866 17.336 33.6546 17.336ZM34.1826 14.888C35.0306 14.888 35.7186 14.656 36.2466 14.192C36.7906 13.712 37.0626 13.08 37.0626 12.296V12.056H34.0146C33.4546 12.056 33.0146 12.176 32.6946 12.416C32.3746 12.656 32.2146 12.992 32.2146 13.424C32.2146 13.856 32.3826 14.208 32.7186 14.48C33.0546 14.752 33.5426 14.888 34.1826 14.888ZM43.5003 17V5.096H46.4763V6.392H46.9083C47.1163 5.992 47.4603 5.648 47.9403 5.36C48.4203 5.056 49.0523 4.904 49.8363 4.904C50.6843 4.904 51.3643 5.072 51.8763 5.408C52.3883 5.728 52.7803 6.152 53.0523 6.68H53.4843C53.7563 6.168 54.1403 5.744 54.6363 5.408C55.1323 5.072 55.8363 4.904 56.7483 4.904C57.4843 4.904 58.1483 5.064 58.7403 5.384C59.3483 5.688 59.8283 6.16 60.1803 6.8C60.5483 7.424 60.7323 8.216 60.7323 9.176V17H57.7083V9.392C57.7083 8.736 57.5403 8.248 57.2043 7.928C56.8683 7.592 56.3963 7.424 55.7883 7.424C55.1003 7.424 54.5643 7.648 54.1803 8.096C53.8123 8.528 53.6283 9.152 53.6283 9.968V17H50.6043V9.392C50.6043 8.736 50.4363 8.248 50.1003 7.928C49.7643 7.592 49.2923 7.424 48.6843 7.424C47.9963 7.424 47.4603 7.648 47.0763 8.096C46.7083 8.528 46.5243 9.152 46.5243 9.968V17H43.5003ZM63.6514 17V0.199999H66.6754V9.488H67.1074L71.0434 5.096H74.9794L69.4834 10.856L75.1714 17H71.2834L67.1074 12.272H66.6754V17H63.6514ZM81.5623 17.336C80.3783 17.336 79.3303 17.088 78.4183 16.592C77.5223 16.08 76.8183 15.368 76.3063 14.456C75.8103 13.528 75.5623 12.44 75.5623 11.192V10.904C75.5623 9.656 75.8103 8.576 76.3063 7.664C76.8023 6.736 77.4983 6.024 78.3943 5.528C79.2903 5.016 80.3303 4.76 81.5143 4.76C82.6823 4.76 83.6983 5.024 84.5623 5.552C85.4263 6.064 86.0983 6.784 86.5783 7.712C87.0583 8.624 87.2983 9.688 87.2983 10.904V11.936H78.6343C78.6663 12.752 78.9703 13.416 79.5463 13.928C80.1223 14.44 80.8263 14.696 81.6583 14.696C82.5063 14.696 83.1303 14.512 83.5303 14.144C83.9303 13.776 84.2343 13.368 84.4423 12.92L86.9143 14.216C86.6903 14.632 86.3623 15.088 85.9303 15.584C85.5143 16.064 84.9543 16.48 84.2503 16.832C83.5463 17.168 82.6503 17.336 81.5623 17.336ZM78.6583 9.68H84.2263C84.1623 8.992 83.8823 8.44 83.3863 8.024C82.9063 7.608 82.2743 7.4 81.4903 7.4C80.6743 7.4 80.0263 7.608 79.5463 8.024C79.0663 8.44 78.7703 8.992 78.6583 9.68ZM90.9526 21.8V19.16H97.4326C97.8806 19.16 98.1046 18.92 98.1046 18.44V15.44H97.6726C97.5446 15.712 97.3446 15.984 97.0726 16.256C96.8006 16.528 96.4326 16.752 95.9686 16.928C95.5046 17.104 94.9126 17.192 94.1926 17.192C93.2646 17.192 92.4486 16.984 91.7446 16.568C91.0566 16.136 90.5206 15.544 90.1366 14.792C89.7526 14.04 89.5606 13.176 89.5606 12.2V5.096H92.5846V11.96C92.5846 12.856 92.8006 13.528 93.2326 13.976C93.6806 14.424 94.3126 14.648 95.1286 14.648C96.0566 14.648 96.7766 14.344 97.2886 13.736C97.8006 13.112 98.0566 12.248 98.0566 11.144V5.096H101.081V19.112C101.081 19.928 100.841 20.576 100.361 21.056C99.8806 21.552 99.2406 21.8 98.4406 21.8H90.9526ZM109.536 17.336C108.352 17.336 107.304 17.088 106.392 16.592C105.496 16.08 104.792 15.368 104.28 14.456C103.784 13.528 103.536 12.44 103.536 11.192V10.904C103.536 9.656 103.784 8.576 104.28 7.664C104.776 6.736 105.472 6.024 106.368 5.528C107.264 5.016 108.304 4.76 109.488 4.76C110.656 4.76 111.672 5.024 112.536 5.552C113.4 6.064 114.072 6.784 114.552 7.712C115.032 8.624 115.272 9.688 115.272 10.904V11.936H106.608C106.64 12.752 106.944 13.416 107.52 13.928C108.096 14.44 108.8 14.696 109.632 14.696C110.48 14.696 111.104 14.512 111.504 14.144C111.904 13.776 112.208 13.368 112.416 12.92L114.888 14.216C114.664 14.632 114.336 15.088 113.904 15.584C113.488 16.064 112.928 16.48 112.224 16.832C111.52 17.168 110.624 17.336 109.536 17.336ZM106.632 9.68H112.2C112.136 8.992 111.856 8.44 111.36 8.024C110.88 7.608 110.248 7.4 109.464 7.4C108.648 7.4 108 7.608 107.52 8.024C107.04 8.44 106.744 8.992 106.632 9.68ZM122.575 17.336C121.023 17.336 119.751 17 118.759 16.328C117.767 15.656 117.167 14.696 116.959 13.448L119.743 12.728C119.855 13.288 120.039 13.728 120.295 14.048C120.567 14.368 120.895 14.6 121.279 14.744C121.679 14.872 122.111 14.936 122.575 14.936C123.279 14.936 123.799 14.816 124.135 14.576C124.471 14.32 124.639 14.008 124.639 13.64C124.639 13.272 124.479 12.992 124.159 12.8C123.839 12.592 123.327 12.424 122.623 12.296L121.951 12.176C121.119 12.016 120.359 11.8 119.671 11.528C118.983 11.24 118.431 10.848 118.015 10.352C117.599 9.856 117.391 9.216 117.391 8.432C117.391 7.248 117.823 6.344 118.687 5.72C119.551 5.08 120.687 4.76 122.095 4.76C123.423 4.76 124.527 5.056 125.407 5.648C126.287 6.24 126.863 7.016 127.135 7.976L124.327 8.84C124.199 8.232 123.935 7.8 123.535 7.544C123.151 7.288 122.671 7.16 122.095 7.16C121.519 7.16 121.079 7.264 120.775 7.472C120.471 7.664 120.319 7.936 120.319 8.288C120.319 8.672 120.479 8.96 120.799 9.152C121.119 9.328 121.551 9.464 122.095 9.56L122.767 9.68C123.663 9.84 124.471 10.056 125.191 10.328C125.927 10.584 126.503 10.96 126.919 11.456C127.351 11.936 127.567 12.592 127.567 13.424C127.567 14.672 127.111 15.64 126.199 16.328C125.303 17 124.095 17.336 122.575 17.336Z" />
                </svg>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white transition-all duration-500 hover:fill-[#4EE1A0] cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.84282 0.800049C4.40466 0.800049 0 5.20471 0 10.6429C0 14.9983 2.81751 18.6771 6.73003 19.9812C7.22217 20.0674 7.40672 19.7721 7.40672 19.5137C7.40672 19.2799 7.39442 18.5048 7.39442 17.6805C4.92141 18.1357 4.28163 17.0776 4.08477 16.524C3.97404 16.241 3.4942 15.3674 3.07588 15.1337C2.73138 14.9491 2.23924 14.4939 3.06358 14.4816C3.8387 14.4693 4.39236 15.1952 4.57691 15.4905C5.46277 16.9792 6.87767 16.5609 7.44363 16.3025C7.52976 15.6627 7.78813 15.2321 8.07111 14.986C5.88109 14.7399 3.59263 13.891 3.59263 10.1261C3.59263 9.05571 3.97404 8.16986 4.60152 7.48086C4.50309 7.23479 4.15859 6.2259 4.69995 4.87252C4.69995 4.87252 5.52428 4.61414 7.40672 5.8814C8.19415 5.65994 9.03079 5.54921 9.86743 5.54921C10.7041 5.54921 11.5407 5.65994 12.3281 5.8814C14.2106 4.60184 15.0349 4.87252 15.0349 4.87252C15.5763 6.2259 15.2318 7.23479 15.1333 7.48086C15.7608 8.16986 16.1422 9.04341 16.1422 10.1261C16.1422 13.9033 13.8415 14.7399 11.6514 14.986C12.0082 15.2936 12.3158 15.8842 12.3158 16.8069C12.3158 18.1234 12.3035 19.1815 12.3035 19.5137C12.3035 19.7721 12.4881 20.0797 12.9802 19.9812C14.9341 19.3216 16.632 18.0657 17.8349 16.3906C19.0378 14.7153 19.6851 12.7051 19.6856 10.6429C19.6856 5.20471 15.281 0.800049 9.84282 0.800049Z"
                  />
                </svg>
              </div>
              <div className="">
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white transition-all duration-500 hover:fill-[#4EE1A0] cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.2673 0.784274C10.1101 0.787286 9.96029 0.851865 9.85016 0.964142C9.74003 1.07642 9.67835 1.22742 9.67838 1.38469V12.7974C9.67838 12.9567 9.74164 13.1094 9.85423 13.222C9.96684 13.3346 10.1196 13.3978 10.2788 13.3978C10.438 13.3978 10.5908 13.3346 10.7034 13.222C10.816 13.1094 10.8792 12.9567 10.8792 12.7974V1.38469C10.8793 1.30494 10.8633 1.22598 10.8325 1.15244C10.8017 1.07888 10.7565 1.01221 10.6996 0.956317C10.6427 0.90042 10.5752 0.856422 10.5012 0.826884C10.4271 0.797346 10.3479 0.782857 10.2681 0.784274H10.2673ZM19.3523 4.20302C19.2738 4.20528 19.1966 4.22283 19.125 4.2547L13.9723 6.55463C13.8669 6.60226 13.7775 6.67928 13.7147 6.77647C13.652 6.87365 13.6186 6.98688 13.6186 7.10255C13.6186 7.21822 13.652 7.33144 13.7147 7.42863C13.7775 7.52582 13.8669 7.60284 13.9723 7.65047L19.125 9.95775C19.2025 9.9926 19.2862 10.0108 19.3711 10.0111C19.5084 10.0107 19.6413 9.96317 19.7478 9.87665C19.8544 9.79003 19.9281 9.66956 19.9565 9.53529C19.9851 9.401 19.9667 9.26102 19.9044 9.13864C19.8422 9.01627 19.74 8.9189 19.6147 8.86277L15.6891 7.10337L19.6147 5.35053C19.7597 5.28527 19.8728 5.16533 19.9297 5.0169C19.9866 4.86846 19.9825 4.70357 19.9182 4.55818C19.8695 4.4497 19.7898 4.35808 19.689 4.29488C19.5883 4.23167 19.4711 4.1997 19.3523 4.20302ZM0.629063 8.38812C0.712717 8.3485 0.804399 8.32876 0.896945 8.33044V8.33126C1.02776 8.33381 1.15415 8.37902 1.25691 8.46001C1.35966 8.541 1.43315 8.65333 1.46619 8.77993C2.09462 11.1872 3.50383 13.318 5.47307 14.8385C7.4423 16.359 9.8603 17.1834 12.3482 17.1824C12.5075 17.1824 12.6602 17.2457 12.7728 17.3583C12.8854 17.4709 12.9486 17.6236 12.9486 17.7828C12.9486 17.9421 12.8854 18.0948 12.7728 18.2074C12.6602 18.32 12.5075 18.3832 12.3482 18.3832C6.68206 18.3832 1.72866 14.5577 0.304736 9.08096C0.28158 8.99134 0.279458 8.89757 0.298536 8.807C0.317613 8.71643 0.357374 8.63149 0.414711 8.55882C0.472049 8.48616 0.54541 8.42774 0.629063 8.38812Z"
                  />
                </svg>
              </div>
              <div className="">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white transition-all duration-500 hover:fill-[#4EE1A0] cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.84099 2.64336C3.92927 2.64336 3.18753 3.38413 3.18753 4.29466C3.18753 5.20579 3.92927 5.94704 4.84099 5.94704C5.75093 5.94704 6.49121 5.20579 6.49121 4.29466C6.49121 3.38413 5.75093 2.64336 4.84099 2.64336ZM3.41319 7.19855V16.3612H6.26328L6.26436 7.19855H3.41319ZM8.05167 7.19771V16.3603L10.8953 16.3614L10.8964 11.8276C10.8964 10.6639 11.0991 9.47431 12.6027 9.47431C14.0834 9.47431 14.0834 10.8781 14.0834 11.9032V16.3603L16.9303 16.3592V11.3351C16.9303 9.06782 16.5164 6.96979 13.5143 6.96979C12.1042 6.96979 11.1815 7.7668 10.8197 8.4494H10.7797L10.7797 7.19771H8.05167ZM18.3483 19.2H1.98544C1.20474 19.2 0.56958 18.5784 0.56958 17.8144V1.38454C0.56958 0.621101 1.20474 0 1.98544 0H18.3483C19.132 0 19.7696 0.621101 19.7696 1.38454V17.8144C19.7696 18.5784 19.132 19.2 18.3483 19.2Z"
                  />
                </svg>
              </div>
              <div className="">
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white transition-all duration-500 hover:fill-[#4EE1A0] cursor-pointer"
                >
                  <path d="M18.9939 2.56447C18.309 2.86796 17.5733 3.07302 16.7997 3.1657C17.5979 2.68816 18.195 1.93655 18.4796 1.05114C17.7298 1.49652 16.9091 1.81002 16.0534 1.97801C15.4778 1.36354 14.7156 0.956256 13.8849 0.819402C13.0542 0.682547 12.2016 0.823762 11.4594 1.22114C10.7172 1.61851 10.127 2.2498 9.78033 3.017C9.43366 3.7842 9.35 4.64438 9.54233 5.464C8.02298 5.38772 6.53667 4.99282 5.17983 4.30493C3.823 3.61705 2.62596 2.65155 1.66642 1.4711C1.33833 2.03707 1.14967 2.69325 1.14967 3.39209C1.14931 4.02121 1.30423 4.64069 1.6007 5.19557C1.89717 5.75045 2.32602 6.22357 2.8492 6.57296C2.24245 6.55365 1.64909 6.38971 1.11851 6.09477V6.14398C1.11844 7.02634 1.42365 7.88155 1.98236 8.56451C2.54106 9.24741 3.31884 9.71602 4.18372 9.89083C3.62087 10.0431 3.03075 10.0655 2.45795 9.95638C2.70196 10.7157 3.17729 11.3796 3.81738 11.8553C4.45747 12.3309 5.23028 12.5945 6.02761 12.609C4.67409 13.6717 3.00249 14.248 1.28173 14.2454C0.976918 14.2455 0.672362 14.2277 0.369629 14.1921C2.1163 15.3152 4.14955 15.9112 6.2261 15.9088C13.2555 15.9088 17.0984 10.0868 17.0984 5.03748C17.0984 4.87343 17.0942 4.70775 17.0868 4.5437C17.8343 4.00314 18.4795 3.33377 18.9922 2.56694L18.9939 2.56447Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-[530px] h-[129px] top-[52%] right-[55%] md:top-[67%] md:right-[80%] lg:top-[50%] lg:left-[-200px]">
          <Image src={espiral} alt="image" className="w-full h-full" />
        </div>
      </footer>
    </div>
  );
}
