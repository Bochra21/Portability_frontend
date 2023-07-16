import React, { useState, useEffect } from "react";
import { Spacer, Pagination, Grid, Button, Table } from "@nextui-org/react";
import Filter from "./../components/Filter";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import axios from "axios";
import Cookies from "js-cookie";

const ConsultationPage = () => {
  const [dateDebut, setdateDebut] = useState(null);
  const [dateFin, setdateFin] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // const tableData = [
  //   ["50301564", "ABC123", "D001", "2023-07-01", "2023-07-05"],
  //   ["50301565", "DEF456", "D002", "2023-07-02", "2023-07-06"],
  //   ["50301566", "GHI789", "D003", "2023-07-03", "2023-07-07"],
  // ];

  const handledateDebutChange = (event) => {
    setdateDebut(new Date(event.target.value));
    console.log("handledateDebutChange: date debut=", dateDebut);
  };

  const handledateFinChange = (event) => {
    setdateFin(new Date(event.target.value));
  };

  const grayButton = {
    color: "rgb(52, 58 ,64)",
    backgroundColor: "rgb(52, 58 ,64,0.2)",
    fontFamily: "Open Sans",
  };

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/consultations")
      .then((response) => {
        if (response.data) {
        let arrayOfObjects=response.data;
          const arrayOfArrays = arrayOfObjects.map((obj) => Object.values(obj));

          console.log(arrayOfArrays);
          setTableData(arrayOfArrays);
          setLoading(false); // Set loading state to false when data is fetched
        } else {
          console.log("Response data is empty or not an array");
          setLoading(false); // Set loading state to false when data is fetched (even if it's empty)
        }
      })
      .catch((error) => {
        console.log("Error:", error.message);
        setLoading(false); // Set loading state to false on error
      });
  }, []); // Empty dependency array to run only once on initial render

  const handleExportCSV = () => {
    // Convert the table data to CSV format
    const csv = Papa.unparse(tableData);

    // Create a Blob object from the CSV data
    const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Save the Blob as a file using FileSaver
    saveAs(csvBlob, "table_data.csv");
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  //filtering the tableData array and saving the result array(s) in the filteredRowsByNumber variable.
  const filteredRowsByNumber = tableData.filter((row) =>
  row[1].toString().toLowerCase().includes(searchValue.toLowerCase())
);

const filteredRowsById = tableData.filter((row) =>
  row[0].toString().toLowerCase().includes(searchValue.toLowerCase())
);

const filteredRowsByCreationDate = tableData.filter((row) =>
  row[3].toString().toLowerCase().includes(searchValue.toLowerCase())
);


  // Filtering the tableData array based on the selected date range
  const filteredRowsByDateRange = tableData.filter((row) => {
    const datePartage = new Date(row[4]);
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    return datePartage >= startDate && datePartage <= endDate;
  });

  if (loading) {
    // Display a loading indicator or skeleton while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Spacer y={1} />
      <Filter
        onSearchChange={handleSearchChange}
        handledateDebutChange={handledateDebutChange}
        handledateFinChange={handledateFinChange}
      />
      <Spacer y={1} />
      <Table
        color="secondary"
        bordered
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        {/* Table Header */}
        <Table.Header>
          <Table.Column>Numéro</Table.Column>
          <Table.Column>RIO</Table.Column>
          <Table.Column>ID demande</Table.Column>
          <Table.Column>Date création</Table.Column>
          <Table.Column>Date partage</Table.Column>
        </Table.Header>

        {/* Table Body */}
        <Table.Body>
          {/* This method displays the rows of filteredRowsByNumber (if it contains any)  */}
          {searchValue !== "" &&
            filteredRowsByNumber.map((row, index) => (
              <Table.Row key={index}>
                  <Table.Cell>{row[1]}</Table.Cell>
                  <Table.Cell>{row[2]}</Table.Cell>
                  <Table.Cell>{row[0]}</Table.Cell>
                  <Table.Cell>{row[3]}</Table.Cell>
                  <Table.Cell>{row[4]}</Table.Cell>
                </Table.Row>
            ))}

          {searchValue !== "" &&
            filteredRowsById.map((row, index) => (
              <Table.Row key={index}>
                  <Table.Cell>{row[1]}</Table.Cell>
                  <Table.Cell>{row[2]}</Table.Cell>
                  <Table.Cell>{row[0]}</Table.Cell>
                  <Table.Cell>{row[3]}</Table.Cell>
                  <Table.Cell>{row[4]}</Table.Cell>
                </Table.Row>
            ))}

          {searchValue !== "" &&
            filteredRowsByCreationDate.map((row, index) => (
              <Table.Row key={index}>
              <Table.Cell>{row[1]}</Table.Cell>
              <Table.Cell>{row[2]}</Table.Cell>
              <Table.Cell>{row[0]}</Table.Cell>
              <Table.Cell>{row[3]}</Table.Cell>
              <Table.Cell>{row[4]}</Table.Cell>
            </Table.Row>
            ))}

          {dateDebut !== null && dateFin !== null
            ? filteredRowsByDateRange.map((row, index) => (
              <Table.Row key={index}>
              <Table.Cell>{row[1]}</Table.Cell>
              <Table.Cell>{row[2]}</Table.Cell>
              <Table.Cell>{row[0]}</Table.Cell>
              <Table.Cell>{row[3]}</Table.Cell>
              <Table.Cell>{row[4]}</Table.Cell>
            </Table.Row>
              ))
            : searchValue === "" &&
              tableData.map((row, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{row[1]}</Table.Cell>
                  <Table.Cell>{row[2]}</Table.Cell>
                  <Table.Cell>{row[0]}</Table.Cell>
                  <Table.Cell>{row[3]}</Table.Cell>
                  <Table.Cell>{row[4]}</Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>

        {/* Pagination */}
        <Table.Pagination
          animated={false}
          noMargin
          color="red"
          align="center"
          rowsPerPage={4}
          onPageChange={(page) => console.log({ page })}
          css={{
            ".nextui-c-cUthvm-dZWCtT-active-true": {
              boxShadow: "0px 0px 5px 2px rgba(255, 171, 108, 0.4)",
              borderRadius: "10px",
              backgroundColor: "rgb(255, 171, 108)",
            },
            ".nextui-c-cUthvm-dZWCtT-active-true .nextui-c-fItrmj": {
              color: "white",
            },
            ".nextui-c-fItrmj": { color: "#7e868c" },
          }}
        />
      </Table>

      <Spacer y={1} />
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

export default ConsultationPage;

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

/**The order of the columns in the response in unlike the order displayed
 * 
 * DISPLAYED             RESPONSE
 * 
 * 1                        0
 * 2                        1
 * 0                        2
 * 3                        3
 * 4                        4
 * 
 */
