import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import Logo from "./logo";
import Menu from "./menu";
import Search from "./search";

const useStyles = makeStyles(theme => ({
  item: {
    alignItems: "center",
    display: "flex"
  },
  root: {
    borderBottom: `${theme.palette.primary.main} solid 1px`
  }
}));

const MuiAppBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static" elevation={0}>
      <div className="wrapper">
        <Grid container={true} spacing={3}>
          <Grid className={classes.item} item={true} xs={12} sm={6} md={4} lg={3} xl={3}>
            <Logo />
          </Grid>
          <Hidden smDown={true}>
            <Grid className={classes.item} item={true} xs={12} sm={12} md={5} lg={6} xl={6}>
              <Search />
            </Grid>
          </Hidden>
          <Hidden xsDown={true}>
            <Grid
              className={classes.item}
              style={{ justifyContent: "flex-end" }}
              item={true}
              xs={12}
              sm={6}
              md={3}
              lg={3}
              xl={3}
            >
              <Menu />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </AppBar>
  );
};

export default MuiAppBar;
