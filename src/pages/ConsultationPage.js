import { Table } from "@nextui-org/react";

const ConsultationPage = () => {
  return (
    <Table
      bordered
      shadow={false}
      color="secondary"
      aria-label="Example pagination  table"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
     
    >
      <Table.Header>
        <Table.Column>Numéro</Table.Column>
        <Table.Column>RIO</Table.Column>
        <Table.Column>ID demande</Table.Column>
        <Table.Column>Date création</Table.Column>
        <Table.Column>Date partage</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="1">
          <Table.Cell>50301564</Table.Cell>
          <Table.Cell>ABC123</Table.Cell>
          <Table.Cell>D001</Table.Cell>
          <Table.Cell>2023-07-01</Table.Cell>
          <Table.Cell>2023-07-05</Table.Cell>
        </Table.Row>
        <Table.Row  key="2">
        <Table.Cell>50301565</Table.Cell>
        <Table.Cell>DEF456</Table.Cell>
        <Table.Cell>D002</Table.Cell>
        <Table.Cell>2023-07-02</Table.Cell>
        <Table.Cell>2023-07-06</Table.Cell>
      </Table.Row>
      <Table.Row  key="3">
        <Table.Cell>50301566</Table.Cell>
        <Table.Cell>GHI789</Table.Cell>
        <Table.Cell>D003</Table.Cell>
        <Table.Cell>2023-07-03</Table.Cell>
        <Table.Cell>2023-07-07</Table.Cell>
      </Table.Row>
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={2}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
  );
};

export default ConsultationPage;
