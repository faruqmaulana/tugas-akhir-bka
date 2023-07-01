/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import styles from "~/styles/layout/Header.module.scss";

const Header = ({ setShowAside, showAside }: any) => {
  const handleHamburgerButton = () => {
    setShowAside(!showAside);
  };

  return (
    <header className={`${styles.header} ${showAside && styles.full}`}>
      <button
        className={styles.hamburger}
        type="button"
        onClick={handleHamburgerButton}
      >
        <svg
          id="Burger"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="16"
          viewBox="0 0 20 16"
        >
          <rect
            id="Rectangle_558"
            data-name="Rectangle 558"
            width="20"
            height="2"
            rx="1"
            transform="translate(0 14)"
            fill="#ef4444"
          />
          <rect
            id="Rectangle_559"
            data-name="Rectangle 559"
            width="20"
            height="2"
            rx="1"
            transform="translate(0 7)"
            fill="#ef4444"
          />
          <rect
            id="Rectangle_560"
            data-name="Rectangle 560"
            width="20"
            height="2"
            rx="1"
            fill="#ef4444"
          />
        </svg>
      </button>
      <h1 className="text-center text-[22px] font-bold uppercase tracking-wide text-red-600">
        Biro Kemahasiswaan & Alumni
      </h1>
      <button
        type="button"
        className="flex h-full items-center bg-charcoal-300 px-4 transition-colors duration-300 hover:bg-charcoal-400"
      >
        <div className="mr-[10px] flex min-w-[100px] flex-col items-center">
          <h1 className="text-base font-bold text-red-600">Faruq</h1>
          <p className="text-right text-[14px] font-bold text-red-400">
            Mahasiwa
          </p>
        </div>

        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="6"
            viewBox="0 0 10 6"
          >
            <path
              id="Polygon_10"
              data-name="Polygon 10"
              d="M4.232.922a1,1,0,0,1,1.536,0L8.633,4.36A1,1,0,0,1,7.865,6H2.135a1,1,0,0,1-.768-1.64Z"
              transform="translate(10 6) rotate(180)"
              fill="#99acb4"
            />
          </svg>
        </div>
      </button>
    </header>
  );
};

export { Header };
