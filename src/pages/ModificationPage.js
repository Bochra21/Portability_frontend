import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Grid,
  Card,
  Text,
  Spacer,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import TelechargerBtn from "../components/TelechargerBtn";

const ModificationPage = () => {
  const [tableData, setTableData] = useState([]);
  //Data
  const [number, setNumber] = useState(0);
  const [idDemande, setIdDemande] = useState(0);
  const [rio, setRio] = useState("");
  const [creationDate, setCreationDate] = useState(null);
  const [shareDate, setShareDate] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#F8F1F8"; 
    // Save the last visited route to local storage
  //  localStorage.setItem("lastVisitedRoute", window.location.pathname);
    axios.get("http://localhost:8080/api/consultations").then((response) => {
      if (response.data) {
        let arrayOfObjects = response.data;
        const arrayOfArrays = arrayOfObjects.map((obj) => Object.values(obj));

        console.log(arrayOfArrays);
        setTableData(arrayOfArrays);
      } else {
        console.log("Response data is empty or not an array");
      }
    });
  }, []);

  const AddDemande = async (event) => {
    const formattedCreationDate = creationDate.toISOString().slice(0, 10);
    const formattedShareDate = shareDate.toISOString().slice(0, 10);
    // // event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/addDemande",
        {
          idDemande: idDemande,
          number: number,
          rio: rio,
          creationDate: formattedCreationDate,
          shareDate: formattedShareDate,
        }
      );

      // Display the response message
      console.log("Response:", response.data);
      // You can also set the response message to a state variable and display it in the UI
      // setResponseMessage(response.data);
    } catch (error) {
      console.log("Error:", error);
    }

    console.log("numero", number);
    console.log("idDemande", idDemande);
    console.log("rio", rio);

    console.log("creationDate", formattedCreationDate);
    console.log("shareDate", formattedShareDate);
  };

  const Refresh = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/consultations")
        .then((response) => {
          if (response.data) {
            let arrayOfObjects = response.data;
            const arrayOfArrays = arrayOfObjects.map((obj) =>
              Object.values(obj)
            );
            setTableData(arrayOfArrays);
          } else {
            console.log("Response data is empty or not an array");
          }
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteDemande = async (idDemande) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/deleteDemande/${idDemande}`
      );
      // Display the response message
      console.log("Delete Response:", response.data);
      Refresh();
      // (You may need to make a new API call to fetch the updated data)
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const grayButton = {
    color: "rgb(52, 58 ,64)",
    backgroundColor: "rgb(52, 58 ,64,0.2)",
    fontFamily: "Open Sans",

    marginTop: "5px",
  };

  return (
    <div style={{ padding: "6px", margin: "6px" }}>
  
      <Card  variant="bordered" css={{ backgroundColor:"white",paddingLeft: "25px" }}>
        <Card.Body>
          <center>
            <Text size="$xl">Lancer une demande</Text>
          </center>
          <Spacer y={1} />

          <table>
            <tbody>
              <tr>
                <td>
                  <Grid.Container gap={2}>
                    <Grid xs={12} sm={4}>
                      <Text
                        css={{ paddingRight: "46px", paddingTop: "10px" }}
                        size="$md"
                      >
                        Numéro
                      </Text>
                      <Input
                     
                        id="number"
                        name="number"
                        value={number}
                        type="number"
                        placeholder="Numéro Orange"
                        css={{ $$inputColor: "#f1f1f8" }}

                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </Grid>

                    <Grid xs={12} sm={4}>
                      <Text
                        css={{ paddingRight: "75px", paddingTop: "10px" }}
                        size="$md"
                      >
                        RIO
                      </Text>
                      <Input
                        id="rio"
                        name="rio"
                        value={rio}
                        placeholder="Exemple: ABC122"
                        css={{ $$inputColor: "#f1f1f8" }}

                        onChange={(e) => setRio(e.target.value)}
                      />
                    </Grid>

                    <Grid xs={12} sm={4}>
                      <Text
                        css={{ paddingRight: "10px", paddingTop: "10px" }}
                        size="$md"
                      >
                        ID demande
                      </Text>
                      <Input
                        id="idDemande"
                        name="idDemande"
                        value={idDemande}
                        type="number"
                        placeholder="Exemple: 11000"
                        css={{ $$inputColor: "#f1f1f8" }}

                        onChange={(e) => setIdDemande(e.target.value)}
                      />
                    </Grid>

                    <Grid xs={12} sm={4}>
                      <Text
                        css={{ paddingRight: "10px", paddingTop: "10px" }}
                        size="$md"
                      >
                        Date création
                      </Text>
                      <Input
                        id="creationDate"
                        name="creationDate"
                        value={creationDate}
                        type="date"
                        width="186px"
                        css={{ $$inputColor: "#f1f1f8" }}

                        onChange={(e) =>
                          setCreationDate(new Date(e.target.value))
                        }
                      />
                    </Grid>

                    <Grid xs={7} sm={4}>
                      <Text
                        css={{ paddingRight: "10px", paddingTop: "10px" }}
                        size="$md"
                      >
                        Date partage{" "}
                      </Text>
                      <Input
                        id="shareDate"
                        name="shareDate"
                        value={shareDate}
                        type="date"
                        width="186px"
                        css={{ $$inputColor: "#f1f1f8" }}

                        onChange={(e) => setShareDate(new Date(e.target.value))}
                      />
                    </Grid>

                    <Grid xs={7} sm={4}>
                      <Button onPress={AddDemande} style={grayButton}>
                        <b> Lancer</b>
                      </Button>
                    </Grid>
                  </Grid.Container>
                </td>
              </tr>
            </tbody>
          </table>

          <Spacer y={2} />
        </Card.Body>
      </Card>
      <Spacer y={1} />

      <Card>
        <Table
          aria-label="Example table with static content"
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
            <Table.Column></Table.Column>
          </Table.Header>

          {/* Table Body */}
          <Table.Body>
            {tableData.map((row, index) => (
              <Table.Row key={index}>
                <Table.Cell>{row[1]}</Table.Cell>
                <Table.Cell>{row[2]}</Table.Cell>
                <Table.Cell>{row[0]}</Table.Cell>
                <Table.Cell>{row[3]}</Table.Cell>
                <Table.Cell>{row[4]}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="black"
                    auto
                    style={grayButton}
                    onPress={() => deleteDemande(row[0])}
                  >
                    <b> Supprimer </b>
                  </Button>
                </Table.Cell>
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
      <Spacer y={1}></Spacer>
      <TelechargerBtn tableData={tableData} />
      <Spacer y={1} />
    </div>
  );
};

export default ModificationPage;
