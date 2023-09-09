import { type IconProps } from "~/common/models/types/IconProps";

const HourglassIcon = (props: IconProps) => {
  const {
    width = 18,
    height = 18,
    className = "",
    fill = "fill-yellow-600",
  } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      width={width}
      height={height}
      className={`${fill} ${className}`}
    >
      <path d="M32 0C14.3 0 0 14.3 0 32s14.3 32 32 32v11c0 42.4 16.9 83.1 46.9 113.1l67.8 67.9-67.8 67.9C48.9 353.9 32 394.6 32 437v11c-17.7 0-32 14.3-32 32s14.3 32 32 32h320c17.7 0 32-14.3 32-32s-14.3-32-32-32v-11c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zm64 75V64h192v11c0 19-5.6 37.4-16 53H112c-10.3-15.6-16-34-16-53zm16 309c3.5-5.3 7.6-10.3 12.1-14.9l67.9-67.8 67.9 67.9c4.6 4.6 8.6 9.6 12.2 14.9H112z" />
    </svg>
  );
};

export default HourglassIcon;
