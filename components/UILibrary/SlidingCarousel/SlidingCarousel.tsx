"use client";
import { darkCave, darkMountain, oldBuilding } from "@/public";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const SlidingCarousel = () => {
  const [card, setCard] = useState(1);

  const handleNext = () => {
    setCard((prev) => (prev >= 3 ? 1 : prev + 1));
  };

  const handlePrevious = () => {
    setCard((prev) => (prev <= 1 ? 3 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const projects = [
    {
      image: darkCave,
      title: "Dark Cave Project",
      description: "An immersive exploration of natural formations",
    },
    {
      image: darkMountain,
      title: "Mountain Vista",
      description: "Breathtaking views from the highest peaks",
    },
    {
      image: oldBuilding,
      title: "Historic Architecture",
      description: "A journey through time and craftsmanship",
    },
  ];

  const currentProject = projects[card - 1];

  return (
    <section className="h-screen overflow-hidden">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="absolute z-[5] top-[-200px] w-[200vw] flex flex-col items-center">
          <svg
            width="2500"
            height="400"
            viewBox="0 0 2500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <ellipse cx="1250" cy="200" rx="1250" ry="200" fill="#eaeaea" />
          </svg>
          <h2 className="text-3xl font-bold text-gray-800 mt-[-150px] mb-[100px] z-10">
            {currentProject.title}
          </h2>
        </div>

        <div className="relative h-[80vh] w-screen flex justify-center items-center overflow-hidden">
          <div className="absolute z-10 right-8">
            <button
              className="bg-[#1A1A1A] p-2 rounded-full hover:bg-[#333333] transition-colors"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>

          <div
            className="flex items-center h-full w-fit transition-all duration-1000"
            style={{
              transform:
                card === 1
                  ? "translateX(calc( 100vw))"
                  : card === 2
                  ? "translateX(0vw)"
                  : "translateX(calc(-100vw))",
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="w-[100vw] h-full relative flex items-center justify-center"
              >
                <div className="w-[90%] h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="object-cover max-h-full"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute z-10 left-8">
            <button
              className="bg-[#1A1A1A] p-2 rounded-full hover:bg-[#333333] transition-colors"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="absolute bottom-8 z-10 flex gap-2">
            {[1, 2, 3].map((index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  card === index ? "bg-[#1a1a1a]" : "bg-[#999999]"
                }`}
                onClick={() => setCard(index)}
                aria-label={`Go to image ${index}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute z-[5] bottom-[-200px] w-[200vw] flex flex-col items-center">
          <p className="text-lg text-gray-700 mb-[-150px] z-10 max-w-md text-center">
            {currentProject.description}
          </p>
          <svg
            width="2500"
            height="400"
            viewBox="0 0 2500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <ellipse cx="1250" cy="200" rx="1250" ry="200" fill="#eaeaea" />
          </svg>
        </div>
      </div>
    </section>
  );
};
