const MasterDataIcon = ({ open }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="14"
      viewBox="0 0 12 14"
    >
      <path
        id="Ic_master_data"
        d="M12,2V3.25c0,1.1-2.687,2-6,2s-6-.9-6-2V2C0,.9,2.687,0,6,0S12,.9,12,2Zm0,2.812V7.625c0,1.1-2.687,2-6,2s-6-.9-6-2V4.813c1.289.906,3.648,1.328,6,1.328S10.711,5.719,12,4.813Zm0,4.375V12c0,1.1-2.687,2-6,2s-6-.9-6-2V9.188c1.289.906,3.648,1.328,6,1.328S10.711,10.094,12,9.188Z"
        fill={`${open ? '#ffffff' : '#fff'}`}
      />
    </svg>
  );
};

export default MasterDataIcon;
