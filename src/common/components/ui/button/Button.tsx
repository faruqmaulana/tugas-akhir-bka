import { type ButtonProps } from "~/common/models/types/ButtonProps";
import styles from "~/styles/ui/Button.module.scss";
import Spinner from "../../svg/Spinner";

const Button = (props: ButtonProps) => {
  const {
    buttonForm,
    children,
    buttonIcon,
    loaderIcon,
    isPrimary,
    isSecondary,
    isSuccess,
    isDanger,
    isDisabled,
    isGray,
    isGrayGradient,
    isPurple,
    isSmall,
    isMedium,
    isUppercase,
    isSubmit,
    isLoading,
    className,
    ...otherProps
  } = props;

  const styleButton = [styles.button];

  if (isPrimary) styleButton.push(styles.primary);
  if (isSecondary) styleButton.push(styles.secondary);
  if (isSuccess) styleButton.push(styles.success);
  if (isDanger) styleButton.push(styles.danger);
  if (isGrayGradient) styleButton.push(styles.grayGradient);
  if (isGray) styleButton.push(styles.gray);
  if (isPurple) styleButton.push(styles.purple);
  if (isSmall) styleButton.push(styles.small);
  if (isMedium) styleButton.push(styles.medium);
  if (isUppercase) styleButton.push(styles.textUppercase);
  if (isDisabled) styleButton.push(styles.disabled);
  if (className) styleButton.push(className);

  const getLoader = loaderIcon ?? <Spinner />;

  return (
    <button
      className={styleButton.join(" ")}
      type={isSubmit ? "submit" : "button"}
      form={buttonForm}
      disabled={isDisabled}
      {...otherProps}
    >
      {isLoading || buttonIcon ? (
        <div className="flex flex-row items-center justify-center gap-2">
          {children}
          {isLoading ? getLoader : buttonIcon}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export { Button };
