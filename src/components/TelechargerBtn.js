import { Button } from "@nextui-org/react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
const TelechargerBtn = ({tableData}) => {


  const grayButton = {
    color: "rgb(52, 58 ,64)",
    backgroundColor: "rgb(52, 58 ,64,0.2)",
    fontFamily: "Open Sans",
  };

  const handleExportCSV = () => {
    // Convert the table data to CSV format
    const csv = Papa.unparse(tableData);

    // Create a Blob object from the CSV data
    const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Save the Blob as a file using FileSaver
    saveAs(csvBlob, "table_data.csv");
  };


  

  return (
    <div>
      <Button
        onClick={handleExportCSV}
        icon={<SaveIcon fill="currentColor" />}
        color="error"
        flat
        style={grayButton}
      >
        <b> Télécharger csv </b>
      </Button>
    </div>
  );
};

export default TelechargerBtn;


export const SaveIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <path
        fill={fill}
        d="M20 3H4C2.897 3 2 3.897 2 5v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-6 17h-4v-2h4v2zm6-4H4V5h16v11zm0-13H4V5h16v1z"
      />
    </svg>
  );
};