import Grid from "@material-ui/core/Grid";
import React from "react";
import Filter from "../components/filter";
import Programs from "../components/programs";

/**
 * Displays list of programs
 */

const Homepage: React.FC = () => {
  return (
    <React.Fragment>
      <Filter />
      <div className="wrapper">
        <Grid container={true} spacing={3} justify="center">
          <Grid item={true} xs={12} sm={11} md={10} lg={8} xl={6}>
            <Programs />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
