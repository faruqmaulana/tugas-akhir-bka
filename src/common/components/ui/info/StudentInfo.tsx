import InfoIcon from "../../svg/InfoIcon";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export type StudentInfo = {
  name: string;
  npm: string;
  prodiName: string;
  semester: string;
};

const StudentInfo = (props: StudentInfo) => {
  const { name, npm, prodiName, semester } = props;
  return (
    <Popover>
      <PopoverTrigger className="align-sub ml-1">
        <InfoIcon height="10" width="10" />
      </PopoverTrigger>
      <PopoverContent className="rounded-md border-charcoal-1000 text-xs md:text-sm">
        <table className="border-separate border-spacing-1">
          <tr>
            <td className="font-semibold">Nama&nbsp;</td>
            <td>:&nbsp; {name || "-"} &nbsp;</td>
          </tr>
          <tr>
            <td className="font-semibold">NBI&nbsp;</td>
            <td>:&nbsp; {npm || "-"} &nbsp;</td>
          </tr>
          <tr>
            <td className="font-semibold">Prodi&nbsp;</td>
            <td>:&nbsp; {prodiName || "-"} &nbsp;</td>
          </tr>
          <tr>
            <td className="font-semibold">Semester&nbsp;</td>
            <td>:&nbsp; {semester || "-"} &nbsp;</td>
          </tr>
        </table>
      </PopoverContent>
    </Popover>
  );
};

export default StudentInfo;
