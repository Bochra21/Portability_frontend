import React from "react";
import {  Button,Text, Input, Grid } from "@nextui-org/react";

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

  // const selectedValue = React.useMemo(
  //   () => Array.from(selected).join(", "),
  //   [selected]
  // );

  return (
    <div>

      <Grid.Container gap={2}>
     
        <Grid xs={12} sm={4} >
          <Text  css={{ paddingRight: '10px' }} size="$md"> Numéro</Text>
          <Input
            type="search"
            placeholder="Search by number" />
        </Grid>
       

        <Grid xs={12} sm={4}>
          <Text  css={{ paddingRight: '10px' }} size="$md">ID demande</Text>
          <Input
            type="search"
            onChange={onSearchChange}
            placeholder="Search by ID demande"
          />
        </Grid>

        <Grid xs={12} sm={4}>
          <Text  css={{ paddingRight: '10px' }} size="$md">Date création</Text>
          <Input type="date" width="186px"  onChange={onSearchChange} />


        </Grid>

        <Grid xs={7} sm={4}>
          <Text  css={{ paddingRight: '10px' }} size="$md">Date partage :</Text>
        </Grid>
        <Grid xs={7} sm={4}>
          <Text  css={{ paddingRight: '10px' }} size="$md">Date début</Text>
          <Input type="date" width="186px" onChange={handledateDebutChange} />
        </Grid>
        <Grid xs={7} sm={4}>
          <Text  css={{ paddingRight: '10px' }} size="$md">Date fin</Text>
          <Input type="date" width="186px" onChange={handledateFinChange} />
        </Grid>

      
      </Grid.Container>
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
