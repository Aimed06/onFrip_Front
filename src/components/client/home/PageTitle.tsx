interface PageTitleProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    buttons?: React.ReactNode;
    bottomBorder?: boolean;
  }
  const PageTitle = ({
    title,
    subtitle,
    buttons,
    bottomBorder,
  }: PageTitleProps) => {
    return (
      <div
        className={`container mx-auto ${
          bottomBorder ? "border-b border-[#D9D9D9]" : ""
        }  py-6  -mb-1 flex flex-col   items-center md:flex-row justify-between`}
      >
        <div className="flex flex-col items-center justify-center w-full gap-4 md:items-start">
          <h3 className="flex items-center gap-2 text-3xl font-bold text-text-primary">
            {title}
          </h3>
          <h5 className="text-[14px] font-medium text-text-secondary flex items-center gap-2">
            {subtitle}
          </h5>
        </div>
        <div className="flex gap-2">{buttons}</div>
      </div>
    );
  };
  
  export default PageTitle;