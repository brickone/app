import { useLazyQuery } from "@apollo/react-hooks";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import qs from "query-string";
import React from "react";
import useReactRouter from "use-react-router";

import { QUERY_PROGRAMS } from "../graphql/programs";
import Pagination from "./pagination";
import Program, { IProgram } from "./program";

interface IVariables {
  degree?: string;
  name?: string;
}

/**
 * Displays list of programs
 */

const Programs: React.FC = () => {
  const [programs, setPrograms] = React.useState<IProgram[]>([]);
  const [execute, results] = useLazyQuery(QUERY_PROGRAMS);
  const { location, history } = useReactRouter();
  const [page, setPage] = React.useState(0);
  const query = qs.parse(location.search);
  const rowsPerPage = 25;

  // Filters data on querystring parameters
  const handleFilter = () => {
    const variables: IVariables = {};
    if (_.isString(query.filter)) {
      variables.degree = query.filter;
    }
    if (_.isString(query.search)) {
      variables.name = query.search;
    }
    execute({ variables });
  };
  React.useEffect(handleFilter, [query.search, query.filter]);

  // Sorts data based on querystring parameters
  const handleSort = () => {
    if (!results.data || !results.data.queryProgramsByDegree) {
      return;
    }

    let data: IProgram[] = results.data.queryProgramsByDegree.items;
    if (query.sort === "ASC") {
      data = _.sortBy(data, ["tuition"]);
    }

    if (query.sort === "DESC") {
      data = _.sortBy(data, ["tuition"]).reverse();
    }

    setPrograms(data);
  };
  React.useEffect(handleSort, [query.sort]);
  React.useEffect(handleSort, [results]);

  const handleClick = (path: string) => () => {
    history.push(path);
  };

  return (
    <React.Fragment>
      <Toolbar disableGutters={true}>
        {query.search && (
          <Typography variant="h5">
            {programs.length} Online Programs for <span className="capitalize">{query.search}</span>
          </Typography>
        )}
        {!query.search && <Typography variant="h5">{programs.length} Online Programs</Typography>}
      </Toolbar>
      <List>
        {programs
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((program, index) => (
            <ListItem
              button={true}
              disableGutters={true}
              divider={true}
              key={index}
              onClick={handleClick("/" + program.id)}
            >
              <Program program={program} />
            </ListItem>
          ))}
      </List>
      <Pagination page={page} rowsPerPage={rowsPerPage} setPage={setPage} total={programs.length} />
    </React.Fragment>
  );
};

export default Programs;
