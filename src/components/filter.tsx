import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import qs from 'query-string';
import React from 'react';
import useReactRouter from 'use-react-router';

const label = {
  ASC: "Cost (Low to High)",
  DESC: "Cost (High to Low)",
  Relevancy: "Relevancy"
};

const useStyles = makeStyles(theme => ({
  active: {
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer"
    },
    color: theme.palette.primary.main
  },
  divider: {
    backgroundColor: "#666",
    height: 16,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 2
  },
  filter: {
    display: "flex",
    flex: 1
  },
  option: {
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer"
    }
  },
  root: {
    textTransform: "none"
  },
  toolbar: {
    background: "#ededed"
  }
}));

/**
 * Adds querystring parameters to be used in the 
 * filtering and sorting of programs
 */

const Filter: React.FC = () => {
  const classes = useStyles();
  const { location, history } = useReactRouter();
  const query = qs.parse(location.search);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [filter, setFilter] = React.useState(["Associate's", "Bachelor's"]);
  const [sort, setSort] = React.useState<"Relevancy" | "ASC" | "DESC">("Relevancy");

  React.useEffect(() => {
    setFilter(query.filter ? [query.filter as string] : ["Associate's", "Bachelor's"]);
    setSort((query.sort as "Relevancy" | "ASC" | "DESC" | undefined) || "Relevancy");
  }, [query.filter, query.sort]);

  const handleSort = (by: "Relevancy" | "ASC" | "DESC") => () => {
    handleClose();
    setSort(by);
    query.sort = by;
    if (by === "Relevancy") {
      delete query.sort;
    }
    history.push("?" + qs.stringify(query));
  };

  // Add filter to querystring
  const handleFilter = (degree: string) => () => {
    let newFilter = filter.filter(value => value !== degree)
    const index = filter.indexOf(degree);
    if (index === -1) {
      newFilter = [...filter, degree]
    }

    setFilter(newFilter)

    if (newFilter.length === 2) {
      delete query.filter;
    } else if (newFilter.length === 1) {
      query.filter = newFilter[0];
    } else {
      query.filter = "empty";
    }

    history.push("?" + qs.stringify(query));
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar className={classes.toolbar}>
      <Typography className={classes.filter} variant="subtitle2">
        Filter By: Certificates
        <Divider className={classes.divider} orientation="vertical" />
        <span
          className={filter.indexOf("Associate's") !== -1 ? classes.active : classes.option}
          onClick={handleFilter("Associate's")}
        >
          Associate's
        </span>
        <Divider className={classes.divider} orientation="vertical" />
        <span
          className={filter.indexOf("Bachelor's") !== -1 ? classes.active : classes.option}
          onClick={handleFilter("Bachelor's")}
        >
          Bachelor's
        </span>
      </Typography>
      <Button
        className={classes.root}
        endIcon={<ExpandMoreIcon />}
        onClick={handleOpen}
        size="small"
      >
        Sort By: {label[sort]}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleSort("Relevancy")}>Relevancy</MenuItem>
        <MenuItem onClick={handleSort("ASC")}>Cost (Low to High)</MenuItem>
        <MenuItem onClick={handleSort("DESC")}>Cost (High to Low)</MenuItem>
        <MenuItem disabled={true}>Distance</MenuItem>
        <MenuItem disabled={true}>Duration</MenuItem>
      </Menu>
    </Toolbar>
  );
};

export default Filter;
