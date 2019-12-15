import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import useReactRouter from "use-react-router";

const Logo: React.FC = () => {
  const { history } = useReactRouter();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <React.Fragment>
      <IconButton>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="primary" onClick={handleClick}>
        Affordable Online Degrees
      </Typography>
    </React.Fragment>
  );
};

export default Logo;
