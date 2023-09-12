import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface Props {
  label: string;
  children: React.ReactNode;
}

function Item(props: Props) {
  const { label, children } = props;
  return (
    <>
      <Grid item xs={4}>
        <Typography variant="body1">{label}</Typography>
      </Grid>
      <Grid item xs={8}>
        {children}
      </Grid>
    </>
  );
}

export default Item;
