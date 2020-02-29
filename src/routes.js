import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './views/Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  );
}
