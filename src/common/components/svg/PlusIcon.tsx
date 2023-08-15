/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const PlusIcon = (props: any) => {
  const { width = "16px", height = "16px", color = "#ffffff" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
    >
      <path
        id="Ic_plus"
        d="M14.857,8.536H9.714V3.393A1.143,1.143,0,0,0,8.571,2.25H7.429A1.143,1.143,0,0,0,6.286,3.393V8.536H1.143A1.143,1.143,0,0,0,0,9.679v1.143a1.143,1.143,0,0,0,1.143,1.143H6.286v5.143A1.143,1.143,0,0,0,7.429,18.25H8.571a1.143,1.143,0,0,0,1.143-1.143V11.964h5.143A1.143,1.143,0,0,0,16,10.821V9.679A1.143,1.143,0,0,0,14.857,8.536Z"
        transform="translate(0 -2.25)"
        fill={color}
      />
    </svg>
  );
};

export default PlusIcon;
