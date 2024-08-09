import { COLOR_SCHEMES } from "@/utils/Constants";
import { FC, useEffect, useState } from "react";

type MatricesCardProps = {
  title: string;
  value: number;
  index: number; // Accept an index prop to select the color scheme
};

const MatricesCard: FC<MatricesCardProps> = ({ title, value, index }) => {
  const [matricesValue, setMatricesValue] = useState<number>(0);

  useEffect(() => {
    const duration = 1000;
    const increment = value > matricesValue ? 1 : -1; 
    const stepTime = Math.abs(Math.floor(duration / (value - matricesValue)));
  
    const timer = setInterval(() => {
      setMatricesValue((prev) => {
        const nextValue = prev + increment;
        if ((increment > 0 && nextValue >= value) || (increment < 0 && nextValue <= value)) {
          clearInterval(timer);
          return value;
        }
        return nextValue;
      });
    }, stepTime);
  
    return () => clearInterval(timer);
  }, [matricesValue, value]);

  const styles = COLOR_SCHEMES[index % COLOR_SCHEMES.length];

  return (
    <section
      className={`${styles.bg} py-8 px-6 rounded-2xl flex flex-col gap-4 w-[32%] 2xl:w-1/4 justify-center items-center shadow-lg`}
    >
      <h3 className={`font-bold text-2xl ${styles.title}`}>{title}</h3>
      <p className={`font-extrabold text-4xl 2xl:text-5xl ${styles.value}`}>
        {matricesValue}
      </p>
      <div className={`w-full h-1 mt-4 ${styles.accent} rounded-full`}></div>
    </section>
  );
};

export default MatricesCard;
