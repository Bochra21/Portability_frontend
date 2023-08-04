import React, { useState, useEffect } from "react";
import { Spacer,Card, Pagination, Grid, Button, Table } from "@nextui-org/react";
import Filter from "./../components/Filter";
import axios from "axios";
import TelechargerBtn from "../components/TelechargerBtn";
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
   document.body.style.backgroundColor = "#FEF8FA"; 

    axios
      .get("http://localhost:8080/api/consultations")
      .then((response) => {
        if (response.data) {
          let arrayOfObjects = response.data;
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

    // Save the last visited route to local storage
    //  localStorage.setItem("lastVisitedRoute", window.location.pathname);
  }, []); // Empty dependency array to run only once on initial render

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  //Filtering the tableData array and saving the result array(s) in the filteredRowsByNumber variable.
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
    <div style={{ padding: "10px", margin: "6px" }}>
     
     <div style={{ paddingBottom: "10px" }}>
      <Filter
        onSearchChange={handleSearchChange}
        handledateDebutChange={handledateDebutChange}
        handledateFinChange={handledateFinChange}
      />
    </div>
      <div >
      <Card>
      <Table
        color="secondary"
        bordered
        css={{
          height: "auto",
          minWidth: "100%",
          paddingLeft: "25px",
          paddingRight: "25px",
         
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
             
              borderRadius: "10px",
              backgroundColor: "#BE92A2",
            },
            ".nextui-c-cUthvm-dZWCtT-active-true .nextui-c-fItrmj": {
              color: "white",
            },
            ".nextui-c-fItrmj": { color: "#7e868c" },
          }}
        />
      </Table>
      </Card>
      </div>
      <Spacer y={1} />
      <TelechargerBtn tableData={tableData} />
      <Spacer y={1} />
    </div>
  );
};

export default ConsultationPage;

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
