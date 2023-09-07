/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import styles from "~/styles/ui/StepperVertical.module.scss";
import CheckIcon from "../../svg/CheckIcon";
import React from "react";

export type StepperVerticalProp = {
  id: string;
  status: string;
  userName: string;
  catatan?: string;
  date: string;
};

const StepperVertical = (props: { data: StepperVerticalProp[] }) => {
  const { data} = props;

  return (
    <table className={styles.container}>
      {data?.map((step) => (
        <tbody className={styles.wrapper} key={`${step.id}`}>
          <tr className={styles.header}>
            <td className={styles.icon}>
              <CheckIcon width={18} height={18} />
            </td>
            <td className={`${styles.title} ${styles[step.status]}`}>
              {step.status}
            </td>
          </tr>
          <tr className={styles.content}>
            <td className={styles.contentWrapper}>
              <div className={`${styles.divider}`} />
            </td>
            <div className="flex flex-col">
              <td className={styles.desc}>{step.userName}</td>
              <td className={styles.desc}>{step.catatan}</td>
              <td className={styles.desc}>{step.date}</td>
            </div>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default StepperVertical;
