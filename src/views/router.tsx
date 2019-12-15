import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppBar from '../components/appbar';
import Homepage from './homepage';
import Program from './program';

const Router: React.FC = () => {
  return (
    <React.Fragment>
      <AppBar />
      <Switch>
        <Route component={Homepage} exact={true} path="/" />
        <Route component={Program} exact={true} path="/:id" />
      </Switch>
    </React.Fragment>
  );
};

export default Router;
