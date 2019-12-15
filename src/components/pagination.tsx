import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";

const useStyles = makeStyles(() => ({
  container: { display: "flex", justifyContent: "flex-end" },
  root: {
    minWidth: 32
  }
}));

interface IProps {
  page: number;
  rowsPerPage: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Paginates through program data
 * @param props Properties used for pagination
 */

const Pagination: React.FC<IProps> = props => {
  const classes = useStyles();
  const [pages, setPages] = React.useState<number[]>([]);

  // Adds page numbers to state
  React.useEffect(() => {
    const arrOfPages = [];
    let x = 0;
    for (x; x * props.rowsPerPage < props.total; x++) {
      arrOfPages.push(x);
    }
    setPages(arrOfPages);
  }, [props.rowsPerPage, props.total]);

  const handlePrev = () => {
    props.setPage(props.page - 1);
  };

  const handleSetPage = (page: number) => () => {
    props.setPage(page);
  };

  const handleNext = () => {
    props.setPage(props.page + 1);
  };

  return (
    <div className={classes.container}>
      <Button disabled={!Boolean(props.page)} onClick={handlePrev} size="small" variant="outlined">
        Previous
      </Button>
      {pages.map((page, index) => (
        <Button
          className={classes.root}
          disabled={page === props.page}
          key={index}
          onClick={handleSetPage(page)}
          size="small"
          variant="outlined"
        >
          {page + 1}
        </Button>
      ))}
      <Button
        disabled={(props.page + 1) * props.rowsPerPage >= props.total}
        onClick={handleNext}
        size="small"
        variant="outlined"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
