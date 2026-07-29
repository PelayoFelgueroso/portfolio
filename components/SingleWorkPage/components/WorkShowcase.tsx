import React from "react";
import { Work } from "@/models/work";
import Image from "next/image";

interface Props {
  work: Work;
}

export const WorkShowcase = React.memo<Props>(({ work }: Props) => {
  // Validaciones de datos con valores por defecto
  const title = work?.title || "Untitled Project";
  const services = work?.data?.services || "N/A";
  const niche = work?.data?.niche || "N/A";
  const location = work?.data?.location || "Remote";
  const date = work?.data?.date || "N/A";
  const featuredImage = work?.data?.featured_image?.url || "/placeholder-image.jpg";
  const videosCollection = work?.data?.videos_collection || [];

  return (
    <>
      <section className="relative w-full min-h-[200px] pt-[max(2.5em,12vh)] min-[540px]:pt-[12vh] md:pt-[clamp(5em,_21vh,_12em)] 2md:pt-[clamp(5em,_21vh,_12em)]">
        <div className="relative max-w-[119em] px-[clamp(1.25em,_4vw,_2.5em)] min-[540px]:px-[6vw] xl:px-[clamp(2.5em,_8vw,9.5rem)] mx-auto">
          <div className="">
            <h1 className="text900 text-darkBlueCustom/90">{title}</h1>
          </div>

          <div className="flex flex-wrap pb-[calc(max(2.5em,12vh)_/_1.25)] min-[540px]:pb-[calc(12vh_/_1.25)] md:pb-[calc(clamp(5em,_21vh,_12em)_/_1.25)] 2md:pb-[calc(clamp(5em,_21vh,_12em)_/_1.25)] pt-[calc(max(2.5em,12vh)_/_2.5)] min-[540px]:pt-[calc(12vh_/_2.5)] md:pt-[calc(clamp(5em,_21vh,_12em)_/_2.5)] 2md:pt-[calc(clamp(5em,_21vh,_12em)_/_2.5)]">
            <div className="w-full mb-[8vw] mr-0 md:mr-[calc(clamp(1.5em,_4vw,_2.5em)_*_1.5)] md:w-[calc(33.333%_-_(clamp(1.5em,_4vw,_2.5em)_/_1))] flex flex-col">
              <h5 className="text100 text-darkGrayCustom/50 uppercase">
                Role / Services
              </h5>
              <div className="h-[1px] w-full block bg-darkGrayCustom/30 mt-[4.5vw] mb-[3vw] md:mt-[1.75rem] md:mb-[1.5rem]" />
              <p className="text400 text-darkBlueCustom/90">{services}</p>
            </div>

            <div className="w-full mb-[8vw] mr-0 md:mr-[calc(clamp(1.5em,_4vw,_2.5em)_*_1.5)] md:w-[calc(33.333%_-_(clamp(1.5em,_4vw,_2.5em)_/_1))] flex flex-col">
              <h5 className="text100 text-darkGrayCustom/50 uppercase">
                Sector
              </h5>
              <div className="h-[1px] w-full block bg-darkGrayCustom/30 mt-[4.5vw] mb-[3vw] md:mt-[1.75rem] md:mb-[1.5rem]" />
              <p className="text400 text-darkBlueCustom/90">{niche}</p>
            </div>

            <div className="w-full mr-0 md:w-[calc(33.333%_-_(clamp(1.5em,_4vw,_2.5em)_/_1))] flex flex-col">
              <h5 className="text100 text-darkGrayCustom/50 uppercase">
                Location & Date
              </h5>
              <div className="h-[1px] w-full block bg-darkGrayCustom/30 mt-[4.5vw] mb-[3vw] md:mt-[1.75rem] md:mb-[1.5rem]" />
              <p className="text400 text-darkBlueCustom/90">
                {location} {date}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full pb-[max(2.5em,12vh)] min-[540px]:pb-[12vh] md:pb-[clamp(5em,_21vh,_12em)] 2md:pb-[clamp(5em,_21vh,_12em)]">
        <div className="relative px-0 max-w-[119em] md:px-[clamp(1.25em,_4vw,_2.5em)] min-[540px]:px-[6vw] xl:px-[clamp(2.5em,_8vw,9.5rem)] mx-auto">
          <div className="relative w-full before:pt-[90%] md:before:pt-[70%] 2md:before:pt-[50%] before:block">
            <Image
              src={featuredImage}
              width={1920}
              height={1080}
              alt={title}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-sm"
            />
          </div>

          <div className="relative"></div>
        </div>
      </section>

      {videosCollection.length > 0 && (
        <section className="relative pt-[max(2.5em,12vh)] min-[540px]:pt-[12vh] md:pt-[clamp(5em,_21vh,_12em)] 2md:pt-[clamp(5em,_21vh,_12em)] bg-grayCustom">
          <div className="relative max-w-[119em] px-[clamp(1.25em,_4vw,_2.5em)] min-[540px]:px-[6vw] xl:px-[clamp(2.5em,_8vw,9.5rem)] mx-auto">
            {videosCollection[0]?.url && (
              <div className="relative flex flex-col min-[540px]:px-[calc(6vw/1)] xl:px-[calc(clamp(2.5em,_8vw,9.5rem)/1)]">
                <div className="relative">
                  <div className="absolute top-[1.2%] min-[540px]:top-[0.8%] w-full rounded-sm 2md:rounded-lg overflow-hidden">
                    <div className="relative w-[99%] mx-auto before:block before:pt-[62.5%]">
                      <video
                        loop
                        muted
                        playsInline
                        autoPlay
                        preload="auto"
                        className="absolute top-0 left-0 object-cover w-full h-full"
                      >
                        <source src={videosCollection[0].url} />
                      </video>
                    </div>
                  </div>

                  <div className="relative before:pt-[85.5%] before:block">
                    <div className="absolute top-0 left-0 bg-[url('/device-macpro-higher.png')] bg-contain bg-no-repeat bg-center h-full w-full" />
                  </div>
                </div>
              </div>
            )}

            {videosCollection[1]?.url && (
              <div className="py-[max(2.5em,12vh)] min-[540px]:py-[12vh] md:py-[clamp(5em,_21vh,_12em)] 2md:py-[clamp(5em,_21vh,_12em)]">
                <div className="relative flex flex-col min-[540px]:px-[calc(6vw/1)] xl:px-[calc(clamp(2.5em,_8vw,9.5rem)/1)]">
                  <div className="relative w-full before:pt-[62.5%] rounded-sm overflow-hidden before:block">
                    <video
                      loop
                      muted
                      playsInline
                      autoPlay
                      preload="auto"
                      className="object-cover absolute top-0 left-0 w-full h-full"
                    >
                      <source src={videosCollection[1].url} />
                    </video>
                  </div>
                </div>
              </div>
            )}
          </div>

          {videosCollection[2]?.url && (
            <div className="relative py-[max(2.5em,12vh)] min-[540px]:py-[12vh] md:py-[clamp(5em,_21vh,_12em)] 2md:py-[clamp(5em,_21vh,_12em)] bg-darkGrayCustom/20">
              <div className="max-w-[119em] px-[clamp(1.25em,_4vw,_2.5em)] min-[540px]:px-[6vw] xl:px-[clamp(2.5em,_8vw,9.5rem)] mx-auto">
                <div className="min-[540px]:px-[calc(6vw/1)] xl:px-[calc(clamp(2.5em,_8vw,9.5rem)/1)]">
                  <div className="relative w-full before:pt-[61%] rounded-sm overflow-hidden before:block">
                    <video
                      loop
                      muted
                      playsInline
                      autoPlay
                      preload="auto"
                      className="object-cover object-top absolute top-0 left-0 w-full h-full"
                    >
                      <source src={videosCollection[2].url} />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          )}

          {videosCollection[3]?.url && (
            <div className="relative py-[max(2.5em,12vh)] min-[540px]:py-[12vh] md:py-[clamp(5em,_21vh,_12em)] 2md:py-[clamp(5em,_21vh,_12em)]">
              <div className="relative max-w-[119em] px-[clamp(1.25em,_4vw,_2.5em)] min-[540px]:px-[6vw] xl:px-[clamp(2.5em,_8vw,9.5rem)] mx-auto">
                <div className="relative flex flex-col  min-[540px]:px-[calc(6vw/1)] xl:px-[calc(clamp(2.5em,_8vw,9.5rem)/1)]">
                  <div className="relative">
                    <div className="absolute left-[49.95%] top-[47.4%] w-[74.4%] rounded-t-[5px] 2md:rounded-t-[10px] bg-darkGrayCustom overflow-hidden translate-y-[-50%] translate-x-[-50%]">
                      <div className="relative mx-auto before:block before:pt-[62.5%]">
                        <video
                          loop
                          muted
                          playsInline
                          autoPlay
                          preload="auto"
                          className="absolute top-0 left-0 object-cover w-full h-full"
                        >
                          <source src={videosCollection[3].url} />
                        </video>
                      </div>
                    </div>

                    <div className="relative before:pt-[50.365%] before:block">
                      <div className="absolute top-0 left-0 bg-[url('/device-mbp-15.png')] bg-contain bg-no-repeat bg-center h-full w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
});

WorkShowcase.displayName = "WorkShowcase";
