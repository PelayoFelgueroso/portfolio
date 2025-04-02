import { FormattedDate } from "@/models/resource";
import { profilePicture } from "@/public";
import Image from "next/image";
import Link from "next/link";

interface Props {
  date: FormattedDate;
  difficulty: string;
  title: string;
  description: string;
  short_description: string;
  github_link: string;
  slug: string;
}

export const ResourceHeader = ({
  date,
  difficulty,
  title,
  description,
  short_description,
  github_link,
  slug,
}: Props) => {
  return (
    <header className="">
      <Link href="/resources" className="flex items-center gap-[5px] mb-[20px]">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.00016 0.666828L6.70016 1.38349L2.5835 5.50016L11.3335 5.50016L11.3335 6.50016L2.5835 6.50016L6.70016 10.6168L6.00016 11.3335L0.66683 6.00016L6.00016 0.666828Z"></path>
        </svg>
        <div className="text-[14px] md:text-[16px]">Tutorials</div>
      </Link>

      <div className="flex gap-[10px]">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <Image
            src={profilePicture}
            alt="Foto de Perfil"
            className="object-fit w-full h-full"
          />
        </div>

        <div className="">
          <p className="">Pelayo Felgueroso</p>
          <div className="flex items-center">
            <p>
              {date.month} {date.day}, {date.year}
            </p>
            <p className="mx-1">/</p>
            <div
              className="w-[14px] h-[14px] rounded-full"
              style={
                difficulty.toLocaleLowerCase() === "beginner"
                  ? { backgroundColor: "#00a054" }
                  : difficulty.toLocaleLowerCase() === "intermediate"
                  ? { backgroundColor: "orange" }
                  : difficulty.toLocaleLowerCase() === "advanced"
                  ? { backgroundColor: "#a00000" }
                  : difficulty.toLocaleLowerCase() === "expert"
                  ? { backgroundColor: "#8a00a0" }
                  : {}
              }
            />
            <p className="ml-1">{difficulty}</p>
          </div>
        </div>
      </div>

      <h1 className="mt-[20px] mb-[5px] text-[24px] font-medium">{title}</h1>
      <h2 className="mb-[30px] text-[14px] opacity-60">{short_description}</h2>

      <p className="mt-[20px] mb-[30px] text-[16px] text-[#4f576c] md:mb-[20px]">
        {description}
      </p>

      <div className="flex gap-[10px]">
        <Link
          href={`/resources/demos/${slug}`}
          target="_blank"
          className="flex items-center gap-2 bg-blue-100 text-blue-500 p-[10px] font-semibold rounded-lg group"
        >
          Live Demo
          <svg
            width="9"
            height="8"
            viewBox="0 0 9 8"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3 h-3 fill-blue-500 transition-all duration-200 group-hover:translate-x-[3px] group-hover:translate-y-[-3px]`}
          >
            <path d="M8.49966 1.01851C8.50988 0.742553 8.29446 0.510563 8.01851 0.500342L3.52159 0.33379C3.24564 0.32357 3.01365 0.538989 3.00343 0.814942C2.99321 1.09089 3.20862 1.32288 3.48458 1.33311L7.48184 1.48115L7.33379 5.47841C7.32357 5.75436 7.53899 5.98635 7.81494 5.99657C8.09089 6.0068 8.32288 5.79138 8.3331 5.51542L8.49966 1.01851ZM1.34023 7.8664L8.34023 1.3664L7.65977 0.633603L0.659774 7.1336L1.34023 7.8664Z"></path>
          </svg>
        </Link>

        <Link
          href={github_link}
          target="_blank"
          className="flex items-center gap-2 bg-blue-100 text-blue-500 p-[10px] font-semibold rounded-lg group"
        >
          Source Code
          <svg
            width="9"
            height="8"
            viewBox="0 0 9 8"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3 h-3 fill-blue-500 transition-all duration-200 group-hover:translate-x-[3px] group-hover:translate-y-[-3px]`}
          >
            <path d="M8.49966 1.01851C8.50988 0.742553 8.29446 0.510563 8.01851 0.500342L3.52159 0.33379C3.24564 0.32357 3.01365 0.538989 3.00343 0.814942C2.99321 1.09089 3.20862 1.32288 3.48458 1.33311L7.48184 1.48115L7.33379 5.47841C7.32357 5.75436 7.53899 5.98635 7.81494 5.99657C8.09089 6.0068 8.32288 5.79138 8.3331 5.51542L8.49966 1.01851ZM1.34023 7.8664L8.34023 1.3664L7.65977 0.633603L0.659774 7.1336L1.34023 7.8664Z"></path>
          </svg>
        </Link>
      </div>
    </header>
  );
};
