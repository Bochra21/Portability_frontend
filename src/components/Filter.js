import React from "react";
import {Divider, Spacer, Card, Button, Text, Input, Grid } from "@nextui-org/react";

/* onSearchChange (declaration is in the ConsultationPage)
takes the value entered and changes the searchValue variable */

const Filter = ({
  onSearchChange,
  handledateDebutChange,
  handledateFinChange,
}) => {
  const orangeButton = {
    color: "white",
    backgroundColor: "rgb(255, 171 ,108 )",
    fontFamily: "Open Sans",
  };

  const [selected, setSelected] = React.useState(new Set(["Numéro"]));

  const isMd = useMediaQuery(960);

  const Filter = {
    color: "black",
    backgroundColor: " #f1f1f8",
    fontFamily: "Open Sans",
  };

  // const selectedValue = React.useMemo(
  //   () => Array.from(selected).join(", "),
  //   [selected]
  // );

  return (
    <div >
      <Card style={{ padding: "6px", backgroundColor: "white" }}>
        <div  style={{ padding: "10px" }}>
          <Grid.Container gap={1}>
            <Grid xs={12} sm={12}>
           
                <FilterIcon />{" "}
                <div
                  style={{
                    paddingBottom: "2px",
                  
                    paddingLeft: "4px",
                  }}
                >
                  {" "}
                  Filtrer par{" "}
                </div>
             
            </Grid>
            <Divider orientation="vertical" />
            <Grid xs={12} sm={6}>
              <Text
                css={{ paddingRight: "10px", paddingTop: "10px" }}
                size="$md"
              >
                {" "}
                Numéro
              </Text>

              <Input
                type="search"
                placeholder="Search by number"
                css={{ $$inputColor: "#f1f1f8",paddingLeft:"50px" }}
              />
            </Grid>
          
            <Grid xs={12} sm={6}>
              <Text
                css={{ paddingRight: "31px", paddingTop: "10px" }}
                size="$md"
              >
                ID demande
              </Text>

              <Input
                type="search"
                onChange={onSearchChange}
                placeholder="Search by ID demande"
                css={{ $$inputColor: "#f1f1f8" }}
              />
            </Grid>

            <Grid xs={12} sm={6}>
              <Text
                css={{ paddingRight: "10px", paddingTop: "20px" }}
                size="$md"
              >
                Date création
              </Text>

              <Input
                type="date"
                width="186px"
                onChange={onSearchChange}
                css={{paddingLeft:"15px", $$inputColor: "#f1f1f8" }}
              />
            </Grid>

            <Grid xs={6} sm={3}>
             
             <div style={{marginRight:"61px"}}> Date Partage de</div>
               
            
                <Input
                type="date"
                width="186px"
                onChange={handledateDebutChange}
                css={{ $$inputColor: "#f1f1f8",marginRight:"10px" }}

              />
              <Text
                css={{ paddingRight: "10px", paddingTop: "20px" }}
                size="$md"
              >
                À
              </Text>
              <Input
                type="date"
                width="186px"
                onChange={handledateFinChange}
                css={{ $$inputColor: "#f1f1f8" }}
              />
            
           
            </Grid>
          </Grid.Container>
        </div>
      </Card>
    </div>
  );
};

export default Filter;

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = React.useState(false);

  const updateTarget = React.useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  React.useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);

    const handleChange = (e) => {
      updateTarget(e);
    };

    media.addListener(handleChange);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => {
      media.removeListener(handleChange);
    };
  }, []);

  return targetReached;
};

const FilterIcon = ({ fill, size, height, width, label, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 6h16M4 10h16M4 14h8" />
    </svg>
  );
};
