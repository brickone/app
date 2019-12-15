import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

const useStyles = makeStyles(theme => ({
  divider: {
    height: 28,
    margin: 4
  },
  item: {
    alignItems: "center",
    display: "flex"
  },
  root: {
    borderBottom: `${theme.palette.primary.main} solid 1px`
  }
}));

const Menu = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Button size="small">Sign In</Button>
      <Divider className={classes.divider} orientation="vertical" />
      <Button size="small" endIcon={<ExpandMoreIcon />}>
        More
      </Button>
    </React.Fragment>
  );
};

export default Menu;
