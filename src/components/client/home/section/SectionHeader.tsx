import { ReactElement } from "react";

interface TitreAcompagnementProps {
  title: string;
  slogan?: string;
  right?: ReactElement
}

const TitreAcompagnement = (props: TitreAcompagnementProps) => {
  const { title, slogan, right } = props;
  return (
    <div className="flex flex-col items-center text-center gap-2 pt-2 md:flex-row md:justify-between md:items-center md:text-left">
      <div className="flex flex-col gap-0.5 my-6">
        <p className="text-base font-bold text-primary-main">{slogan}</p>
        <p className="text-2xl font-bold text-text-primary">{title}</p>
      </div>
      {right}
    </div>
  );
};

export default TitreAcompagnement;