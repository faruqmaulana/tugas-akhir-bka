/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const PageHeading = (props: any) => {
  const { className, subTitle, title } = props;
  const styleHeader = [];

  if (className) styleHeader.push(className);

  return (
    <div
      className={`flex items-center justify-between ${styleHeader.join(" ")}`}
    >
      <div className="flex items-end">
        <h1
          className={`text-3xl font-bold text-charcoal-900
            ${subTitle && "mr-1"}`}
        >
          {title}
        </h1>
        {subTitle && (
          <h4 className="text-lg font-bold text-secondary-400">
            &#40;
            {subTitle}
            &#41;
          </h4>
        )}
      </div>
    </div>
  );
};

export default PageHeading;
