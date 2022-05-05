import * as React from "react";



import {  } from "../../../utils/my-types";


import Select from "react-select";

import { Card, CardContent , Typography} from "@mui/material";

import {
  MenuedOutlets,MenuedOutlet
} from "../../../utils/my-types";

interface SelectableMenusProps {
  selectableMenuedOutlets: MenuedOutlets;
  
}



interface SelectableMenuProps {
  mo: MenuedOutlet;
}

const SelectableMenu:React.FC<SelectableMenuProps> = ({mo}) => {


  const { outlet, menu } = mo;

  
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {outlet.name}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        <Typography variant="body2"></Typography>
      </CardContent>
    </Card>
  );

};

const SelectableMenuedOutlets: React.FC<SelectableMenusProps> = ({
  selectableMenuedOutlets,
}) => {

  return (
    <>
      {selectableMenuedOutlets.map((mo) => (
        <SelectableMenu mo={mo} />
      ))}
    </>
  );

};
export default SelectableMenuedOutlets;
