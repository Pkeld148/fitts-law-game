import React from 'react'
import {Grid, Button} from "@mui/material"

const ClickButton = (props) => {
  return (
    <Grid item xs={4}>
    <Button  variant="contained" color={props.color} sx={{ fontSize: props.size, opacity: props.opacity }}>
      CLICK
    </Button>
  </Grid>
  )
}

export default ClickButton