import { Big_Shoulders_Display, Outfit } from "next/font/google";
import {
  gallery1,
  gallery2,
  gallery3,
  hero,
  logoGallery,
} from "@/public/conquer-tareas/modern-art-gallery";
import Image from "next/image";

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

const headingXl = `${bigShoulders.className} font-black uppercase text-[60px] leading-[55px] md:text-[70px] md:leading-[65px] min-[1300px]:text-[96px] min-[1300px]:leading-[88px]`;
const headingM = `${bigShoulders.className} font-black uppercase text-[50px] leading-[45px] min-[1300px]:text-[60px] min-[1300px]:leading-[60px]`;
const bodyM = `${outfit.className} text-[18px] leading-[28px] min-[1300px]:text-[22px] min-[1300px]:leading-[32px]`;
const bodyS = `${outfit.className} text-[16px] leading-[26px] min-[1300px]:text-[18px] min-[1300px]:leading-[28px]`;
const buttonStyle = `${bigShoulders.className} text-white uppercase tracking-[3.36px] flex items-center w-fit bg-[#151515] hover:bg-[#D5966C] transition-colors duration-500 group`;

export default function ModernArtGallery() {
  return (
    <div className="bg-white">
      <main className={`${outfit.className} text-[#151515]`}>
        <section id="hero" className="relative h-screen w-full">
          <div className="md:absolute left-0 top-0 h-[45%] md:h-full w-full md:w-[57.5%] min-[1300px]:w-2/3 min-[1300px]:flex">
            <div className="hidden min-[1300px]:block bg-[#151515] w-[45%]"></div>
            <div className="w-full h-full min-[1300px]:w-[55%]">
              <Image
                src={hero}
                alt="hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative mt-8 px-4 md:px-10 md:mt-0 md:h-full md:flex md:items-center min-[1300px]:w-[70vw] min-[1300px]:mx-auto min-[1300px]:h-full">
            <div className="w-fit h-fit md:ml-auto">
              <div className="min-[1300px]:absolute top-[22.5vh] left-0 min-[1300px]:text-white">
                <h1 className={headingXl}>
                  Modern
                  <br /> art gallery
                </h1>
              </div>
              <div className="mt-8 md:mt-12 min-[1300px]:absolute max-w-[22rem] right-0 top-[25vh] flex flex-col gap-8 md:gap-12 min-[1300px]:gap-16">
                <p className={bodyM}>
                  The arts in the collection of the Modern Art Gallery all
                  started from a spark of inspiration. Will these pieces inspire
                  you? Visit us and find out.
                </p>
                <a href="/our-location" className={buttonStyle}>
                  <div className="py-6 px-8">Our location</div>
                  <div className="bg-[#D5966C] group-hover:bg-[#151515] transition-colors duration-500 p-6">
                    <svg
                      width="10"
                      height="26"
                      viewBox="0 0 10 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path id="Path 2" d="M1 1L9 13L1 25" stroke="white" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="day-at-gallery" className="mb-[120px] md:mt-[120px]">
          <div className="h-full px-4 flex flex-col gap-8 mx-auto md:px-10 md:gap-3 min-[1300px]:w-[70vw]">
            <div className="flex flex-col gap-6 md:flex-row md:gap-20 md:justify-between">
              <div className="w-full md:order-2">
                <Image
                  src={gallery1}
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-5 md:order-1 md:max-w-56">
                <h2 className={headingM}>Your day at the gallery</h2>
                <p className={bodyM}>
                  Wander through our distinct collections and find new insights
                  about our artists. Dive into the details of their creative
                  process.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:gap-3">
              <div className="md:w-[60%]">
                <Image
                  src={gallery2}
                  alt="Image"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-4 md:gap-3 md:w-[40%]">
                <div className="md:h-[40%]">
                  <Image
                    src={gallery3}
                    alt="Image"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="bg-[#151515] text-white flex flex-col gap-6 px-6 py-12 md:h-[60%]  md:justify-center">
                  <h2 className={headingM}>Come & be inspired</h2>
                  <p className={bodyM}>
                    We’re excited to welcome you to our gallery and see how our
                    collections influence you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#151515]">
        <div className="px-8 py-12 flex flex-col gap-[38px] md:px-10 md:gap-0 md:flex-row min-[1300px]:w-[70vw] min-[1300px]:mx-auto min-[1300px]:py-20">
          <div className="h-fit max-w-[200px]">
            <Image
              src={logoGallery}
              alt="logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="text-white md:max-w-72 md:ml-16 min-[1300px]:max-w-[27rem] min-[1300px]:ml-[140px]">
            <p className={bodyS}>
              The Modern Art Gallery is free to all visitors and open seven days
              a week from 8am to 9pm. Find us at 99 King Street, Newport, USA.
            </p>
          </div>

          <div className="flex h-fit items-end gap-6 justify-self-end md:ml-auto">
            <div className="w-[20px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.8958 0H1.10417C0.494167 0 0 0.494167 0 1.10417V18.8967C0 19.5058 0.494167 20 1.10417 20H10.6833V12.255H8.07667V9.23667H10.6833V7.01083C10.6833 4.4275 12.2608 3.02083 14.5658 3.02083C15.67 3.02083 16.6183 3.10333 16.895 3.14V5.84L15.2967 5.84083C14.0433 5.84083 13.8008 6.43667 13.8008 7.31V9.2375H16.79L16.4008 12.2558H13.8008V20H18.8975C19.5058 20 20 19.5058 20 18.8958V1.10417C20 0.494167 19.5058 0 18.8958 0Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="w-[20px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 0C7.28417 0 6.94417 0.0116667 5.8775 0.06C2.24583 0.226667 0.2275 2.24167 0.0608333 5.87667C0.0116667 6.94417 0 7.28417 0 10C0 12.7158 0.0116667 13.0567 0.06 14.1233C0.226667 17.755 2.24167 19.7733 5.87667 19.94C6.94417 19.9883 7.28417 20 10 20C12.7158 20 13.0567 19.9883 14.1233 19.94C17.7517 19.7733 19.775 17.7583 19.9392 14.1233C19.9883 13.0567 20 12.7158 20 10C20 7.28417 19.9883 6.94417 19.94 5.8775C19.7767 2.24917 17.7592 0.2275 14.1242 0.0608333C13.0567 0.0116667 12.7158 0 10 0ZM10 1.8025C12.67 1.8025 12.9867 1.8125 14.0417 1.86083C16.7517 1.98417 18.0175 3.27 18.1408 5.96C18.1892 7.01417 18.1983 7.33083 18.1983 10.0008C18.1983 12.6717 18.1883 12.9875 18.1408 14.0417C18.0167 16.7292 16.7542 18.0175 14.0417 18.1408C12.9867 18.1892 12.6717 18.1992 10 18.1992C7.33 18.1992 7.01333 18.1892 5.95917 18.1408C3.2425 18.0167 1.98333 16.725 1.86 14.0408C1.81167 12.9867 1.80167 12.6708 1.80167 10C1.80167 7.33 1.8125 7.01417 1.86 5.95917C1.98417 3.27 3.24667 1.98333 5.95917 1.86C7.01417 1.8125 7.33 1.8025 10 1.8025ZM4.865 10C4.865 7.16417 7.16417 4.865 10 4.865C12.8358 4.865 15.135 7.16417 15.135 10C15.135 12.8367 12.8358 15.1358 10 15.1358C7.16417 15.1358 4.865 12.8358 4.865 10ZM10 13.3333C8.15917 13.3333 6.66667 11.8417 6.66667 10C6.66667 8.15917 8.15917 6.66667 10 6.66667C11.8408 6.66667 13.3333 8.15917 13.3333 10C13.3333 11.8417 11.8408 13.3333 10 13.3333ZM14.1375 4.6625C14.1375 4 14.675 3.4625 15.3383 3.4625C16.0008 3.4625 16.5375 4 16.5375 4.6625C16.5375 5.325 16.0008 5.8625 15.3383 5.8625C14.675 5.8625 14.1375 5.325 14.1375 4.6625Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="w-[20px]">
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 2.17221C19.2642 2.49888 18.4733 2.71888 17.6433 2.81805C18.4908 2.31055 19.1417 1.50638 19.4475 0.548047C18.655 1.01805 17.7767 1.35971 16.8417 1.54388C16.0942 0.74638 15.0267 0.248047 13.8467 0.248047C11.1975 0.248047 9.25083 2.71971 9.84917 5.28555C6.44 5.11471 3.41667 3.48138 1.3925 0.99888C0.3175 2.84305 0.835 5.25555 2.66167 6.47721C1.99 6.45555 1.35667 6.27138 0.804167 5.96388C0.759167 7.86471 2.12167 9.64305 4.095 10.0389C3.5175 10.1955 2.885 10.2322 2.24167 10.1089C2.76333 11.7389 4.27833 12.9247 6.075 12.958C4.35 14.3105 2.17667 14.9147 0 14.658C1.81583 15.8222 3.97333 16.5014 6.29 16.5014C13.9083 16.5014 18.2125 10.0672 17.9525 4.29638C18.7542 3.71721 19.45 2.99471 20 2.17221Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
