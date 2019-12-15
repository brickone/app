import { useLazyQuery } from "@apollo/react-hooks";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";

import { IProgram } from "../components/program";
import { GET_PROGRAMS } from "../graphql/programs";

const useStyles = makeStyles({
  container: { display: "flex", justifyContent: "center" },
  placeholder: {
    background: "#dedede",
    flex: "none",
    height: 275,
    marginRight: 12,
    width: 275
  },
  toolbar: {
    background: "#ededed"
  }
});

/**
 * Displays Program associated with url path parameter
 */

const Program: React.FC = () => {
  const classes = useStyles();
  const [program, setProgram] = React.useState<IProgram | undefined>();
  const [execute, results] = useLazyQuery(GET_PROGRAMS);
  const { match } = useReactRouter();

  const getProgram = () => {
    const query: any = match.params;
    const variables = { id: query.id };
    execute({ variables });
  };
  React.useEffect(getProgram, []);

  const setProgramState = () => {
    if (results.data && results.data.getPrograms) {
      setProgram(results.data.getPrograms);
    }
  };
  React.useEffect(setProgramState, [results]);

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Link to="/">Back to Search</Link>
      </Toolbar>
      <div className="wrapper">
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={12} sm={12} md={6} lg={6} xl={6} className={classes.container}>
            <div className={classes.placeholder} />
          </Grid>
          <Grid item={true} xs={12} sm={12} md={6} lg={6} xl={6}>
            {program && (
              <List>
                <ListItem>
                  <ListItemText className="capitalize" primary={<b>{program.name}</b>} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className="capitalize"
                    primary="School"
                    secondary={program.school}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Degree" secondary={program.degree} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Delivery" secondary={program.delivery} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Tuition"
                    secondary={
                      "$" + program.tuition.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </ListItem>
              </List>
            )}
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Program;
