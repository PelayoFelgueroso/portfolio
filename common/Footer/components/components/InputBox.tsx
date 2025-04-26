import type React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../FooterForm";

interface Props {
  label: string;
  placeholder: string;
  textArea?: boolean;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
  error?: string;
}

export const InputBox = ({
  label,
  placeholder,
  textArea = false,
  name,
  register,
  error,
}: Props) => {
  const stopPropagation = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      onWheel={stopPropagation}
      className={`relative flex flex-col items-stretch ${
        textArea ? "h-full pb300" : "pb100"
      }`}
    >
      <label className="text100 text-whiteCustom">{label}</label>

      <div className="relative flex justify-center items-center">
        {!textArea ? (
          <input
            placeholder={placeholder}
            type="text"
            maxLength={256}
            {...register(name)}
            className={`text-whiteCustom/75 block leading-[1.4857] h-[38px] w-full border-b-[1px] ${
              error ? "border-red-500" : "border-grayCustom/30"
            } text-[clamp(14px,_1.4vw,_16px)] align-middle placeholder:text100 placeholder:text-grayCustom/30 focus:outline-none peer input-form`}
          />
        ) : (
          <textarea
            placeholder={placeholder}
            maxLength={5000}
            {...register(name)}
            className={`text-whiteCustom/75 resize-none field-sizing-content min-h-[10vh] overflow-hidden xs:min-h-[20vh] block leading-[1.4857] w-full border-b-[1px] ${
              error ? "border-red-500" : "border-grayCustom/30"
            } text-[clamp(14px,_1.4vw,_16px)] align-middle placeholder:text100 placeholder:text-grayCustom/30 focus:outline-none peer input-form`}
          />
        )}

        <div
          className={`absolute bottom-0 w-[0%] h-[1px] ${
            error ? "bg-red-500" : "bg-whiteCustom"
          } transition-all duration-300 peer-focus:w-full`}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
