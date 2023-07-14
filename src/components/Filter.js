import React from "react";
import { Dropdown, Input, Grid } from "@nextui-org/react";

/* onSearchChange (declaration is in the ConsultationPage)
takes the value entered and changes the searchValue variable */

const Filter = ({ onSearchChange }) => {
  const [selected, setSelected] = React.useState(new Set(["Numéro"]));
  const [selectedDate, setSelectedDate] = React.useState("");

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    // Display selected date in the console
    console.log(selectedDate);
  };

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", "),
    [selected]
  );

  return (
    <Grid.Container gap={2} style={{ display: "flex", alignItems: "center" }}>
      <Grid style={{ paddingRight: "0px", marginRight: "0px" }}>
        <Dropdown>
          <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
            {selectedValue}
          </Dropdown.Button>

          <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            <Dropdown.Item key="Numéro">Numéro</Dropdown.Item>
            <Dropdown.Item key="ID demande">ID demande</Dropdown.Item>
            <Dropdown.Item key="Date création">Date création</Dropdown.Item>
            <Dropdown.Item key="Date partage">Date partage</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
      <Grid>
        {" "}
        {selectedValue === "Numéro" && (
          <Input
            type="search"
            onChange={onSearchChange}
            placeholder="Search by number"
          />
        )}{" "}
      </Grid>
      <Grid>
        {" "}
        {selectedValue === "ID demande" && (
          <Input type="search" onChange={onSearchChange} />
        )}{" "}
      </Grid>
      <Grid>
        {" "}
        {selectedValue === "Date création" && (
          <div>
            <Input type="date" width="186px" onChange={handleDateChange} />
          </div>
        )}{" "}
      </Grid>

      <Grid>
        {" "}
        {selectedValue === "Date partage" && (
          <div>
            <Grid.Container gap={2} style={{ paddingLeft: "0px" }}>
              <Grid>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "60px",
                  }}
                >
                  <label style={{ marginRight: "15px", fontSize: "15px" }}>
                    Date début
                  </label>
                  <Input type="date" width="186px" />
                </div>
              </Grid>

              <Grid>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label style={{ marginRight: "15px", fontSize: "15px" }}>
                    Date fin
                  </label>
                  <Input type="date" width="186px" />
                </div>
              </Grid>
            </Grid.Container>
          </div>
        )}
      </Grid>
    </Grid.Container>
  );
};

export default Filter;