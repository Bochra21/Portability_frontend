import React, { useState } from "react";
import { Spacer, Table } from "@nextui-org/react";
import Filter from "./../components/Filter";

const ConsultationPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  //filtering the tableData array and saving the result array(s) in the filteredRowsByNumber variable.
  const filteredRowsByNumber = tableData.filter((row) =>
    row[0].toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredRowsById = tableData.filter((row) =>
    row[2].toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredRowsByCreationDate = tableData.filter((row) =>
    row[3].toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <Spacer y={1} />
      <Filter onSearchChange={handleSearchChange} />
      <Spacer y={1} />
      <Table
        bordered
        shadow={false}
        color="secondary"
        aria-label="Example pagination table"
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
          {filteredRowsByNumber.map((row, index) => (
            <Table.Row key={index}>
              {row.map((cell, cellIndex) => (
                <Table.Cell key={cellIndex}>{cell}</Table.Cell>
              ))}
            </Table.Row>
          ))}

          {filteredRowsById.map((row, index) => (
            <Table.Row key={index}>
              {row.map((cell, cellIndex) => (
                <Table.Cell key={cellIndex}>{cell}</Table.Cell>
              ))}
            </Table.Row>
          ))}

          {filteredRowsByCreationDate.map((row, index) => (
            <Table.Row key={index}>
              {row.map((cell, cellIndex) => (
                <Table.Cell key={cellIndex}>{cell}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>

        {/* Pagination */}
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={2}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </div>
  );
};

const tableData = [
  ["50301564", "ABC123", "D001", "2023-07-01", "2023-07-05"],
  ["50301565", "DEF456", "D002", "2023-07-02", "2023-07-06"],
  ["50301566", "GHI789", "D003", "2023-07-03", "2023-07-07"],
];

export default ConsultationPage;
