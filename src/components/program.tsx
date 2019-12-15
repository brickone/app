import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
  container: {
    display: "flex"
  },
  placeholder: {
    background: "#dedede",
    flex: "none",
    height: 75,
    marginRight: 12,
    width: 75
  }
});

export interface IProgram {
  [key: string]: string;
}

interface IProps {
  program: IProgram;
}

/**
 * Displays program data
 * @param props Prgram properties
 */

const Program: React.FC<IProps> = props => {
  const classes = useStyles();
  
  return (
    <Grid container={true} spacing={3}>
      <Grid item={true} xs={12} sm={12} md={6} lg={6} xl={6}>
        <div className={classes.container}>
          <div className={classes.placeholder} />
          <div>
            <Typography className="capitalize" variant="subtitle1">{props.program.name}</Typography>
            <Typography variant="caption">{props.program.school}</Typography>
          </div>
        </div>
      </Grid>
      <Grid item={true} xs={12} sm={12} md={2} lg={2} xl={2}>
        <Typography variant="subtitle2">Degree</Typography>
        <Typography variant="caption">{props.program.degree}</Typography>
      </Grid>
      <Grid item={true} xs={12} sm={12} md={2} lg={2} xl={2}>
        <Typography variant="subtitle2">Delivery</Typography>
        <Typography variant="caption">{props.program.delivery}</Typography>
      </Grid>
      <Grid item={true} xs={12} sm={12} md={2} lg={2} xl={2}>
        <Typography variant="subtitle2">Tuition</Typography>
        <Typography variant="caption">
          {"$" + props.program.tuition.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Program;
