/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import styles from "~/styles/ui/Card.module.scss";

import { type CardProps } from "~/common/models/CardProps";

const Card = (props: CardProps) => {
  const {
    children,
    className,
    headerClassName,
    subHeaderClassName,
    header,
    subHeader,
    style
  } = props;

  const styleCard = [];
  const styleCardHeader = [];
  const styleCardSubHeader = [];

  if (className) styleCard.push(className);
  if (headerClassName) styleCardHeader.push(headerClassName);
  if (subHeaderClassName) styleCardSubHeader.push(subHeaderClassName);

  return (
    <div className={`${styles.card} ${styleCard.join(" ")} p-[30px]`} style={style}>
      <div className="flex">
        {header && (
          <h1
            className={`text-[20px] font-bold text-gray-700 ${styleCardHeader.join(
              " "
            )}`}
          >
            {header}
          </h1>
        )}
      </div>
      {subHeader && (
        <p
          className={`text-[16px] text-[#5D6171] ${styleCardSubHeader.join(
            " "
          )}`}
        >
          {subHeader}
        </p>
      )}
      {children}
    </div>
  );
};

export default Card;
