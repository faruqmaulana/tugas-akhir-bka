/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import styles from "~/styles/ui/StepperVertical.module.scss";
import CheckIcon from "../../svg/CheckIcon";
import React from "react";
import HourglassIcon from "../../svg/HourglassIcon";
import { STATUS } from "~/common/enums/STATUS";
import { handleBgColor, handleTextColor } from "~/common/helpers/handleBgColor";
import { FileX, Repeat } from "lucide-react";

export type StepperVerticalProp = {
  id: string;
  status: string;
  userName: string;
  catatan: string | null;
  date: string;
};

const StepperVertical = (props: {
  data: StepperVerticalProp[] | undefined;
}) => {
  const { data } = props;

  const handleIcon = (status: string) => {
    if (status === STATUS.PROCESSED) {
      return <HourglassIcon width={18} height={18} />;
    }
    if (status === STATUS.APPROVE) {
      return <CheckIcon width={18} height={18} />;
    }
    if (status === STATUS.REJECT) {
      return <FileX width={20} />;
    }
    if (status === STATUS.REPROCESS) {
      return <Repeat width={20} />;
    }
  };

  return (
    <table className={styles.container}>
      {data?.map((step) => (
        <tbody className={styles.wrapper} key={`${step.id}`}>
          <tr className={styles.header}>
            <td>
              <div
                className={`flex h-8 w-8 items-center justify-center ${
                  styles.icon
                } ${handleBgColor(step.status)}`}
              >
                {handleIcon(step.status)}
              </div>
            </td>
            <td className={`${styles.title} ${handleTextColor(step.status)}`}>
              {step.status}
            </td>
          </tr>
          <tr className={styles.content}>
            <td className={styles.contentWrapper}>
              <div className={`${styles.divider}`} />
            </td>
            <td>
              <div className="flex flex-col">
                <p className={styles.desc}>{step.userName}</p>
                <p className={styles.desc}>{step.date}</p>
                {step.catatan && (
                  <p className={`${styles.desc} mt-2`}>
                    Catatan: {step.catatan}
                  </p>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default StepperVertical;
