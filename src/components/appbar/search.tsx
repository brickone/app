import { useLazyQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete, { RenderInputParams } from "@material-ui/lab/Autocomplete";
import _ from "lodash";
import qs from "query-string";
import React from "react";
import useReactRouter from "use-react-router";

import { QUERY_PROGRAMS } from "../../graphql/programs";
import { IProgram } from "../program";

const useStyles = makeStyles(() => ({
  field: { flex: 1 },
  search: { display: "flex", flex: 1 }
}));

const Search = () => {
  const classes = useStyles();
  const { history, location } = useReactRouter();
  const query = qs.parse(location.search);
  const [programs, setPrograms] = React.useState<IProgram[]>([]);
  const getOptionLabel = (option: IProgram) => option.name || "";
  const [value, setValue] = React.useState(query.search);
  const [execute, results] = useLazyQuery(QUERY_PROGRAMS);

  const handleSearch = (name: string) => {
    const variables = { name, limit: 5 };
    execute({ variables });
  };

  React.useEffect(() => {
    if (!results.data || !results.data.queryProgramsByDegree) {
      return;
    }

    setPrograms(results.data.queryProgramsByDegree.items);
  }, [results]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    handleSearch(event.target.value);
  };

  const renderInput = (params: RenderInputParams) => (
    <TextField
      {...params}
      fullWidth={true}
      placeholder={(query.search as string) || "Search Programs"}
      size="small"
      value={value || ""}
      onChange={handleChange}
      variant="outlined"
    />
  );

  const handleSubmit = () => {
    if (_.isEmpty(value)) {
      history.push("/");
      return;
    }
    history.push("/?search=" + value);
  };

  const handleClick = (event: React.ChangeEvent<{}>, program: IProgram) => {
    if (program.name) {
      setValue(program.name);
      history.push("?search=" + program.name);
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.field}>
        <Autocomplete
          freeSolo={true}
          getOptionLabel={getOptionLabel}
          className="capitalize"
          options={programs}
          onChange={handleClick}
          renderInput={renderInput}
        />
      </div>
      <Button
        color="primary"
        onClick={handleSubmit}
        style={{ boxShadow: "none", marginLeft: -5 }}
        type="submit"
        variant="contained"
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
