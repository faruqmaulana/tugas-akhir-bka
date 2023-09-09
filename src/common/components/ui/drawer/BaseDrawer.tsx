/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import styles from "~/styles/ui/Drawer.module.scss";
import XmarkIcon from "../../svg/XmarkIcon";

export type BaseDrawerPropsType = {
  header: string;
  content: React.ReactNode;
  setDrawerOpen: (arg: boolean) => void;
  isDrawerOpen: boolean;
};

const BaseDrawer = (props: BaseDrawerPropsType) => {
  const {
    header,
    content,
    setDrawerOpen,
    isDrawerOpen,
  } = props;

  return (
    <main className={`${styles.main} ${isDrawerOpen && styles.drawerOpen}`}>
      <section
        className={`${styles.container} ${isDrawerOpen && styles.drawerOpen}`}
      >
        <article className={`${styles.content}`}>
          <header className={`${styles.header}`}>
            {header}
            <div
              className={styles.closeButton}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              <XmarkIcon width={18} height={18} fill="##9BA1B5" />
            </div>
          </header>
          {content}
        </article>
      </section>
      <section
        className="h-full w-screen cursor-pointer"
        onClick={() => {
          setDrawerOpen(false);
        }}
      />
    </main>
  );
};

export default BaseDrawer;
