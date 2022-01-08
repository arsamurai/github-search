import React from 'react';
import Users from './pages/Users';
import User from './pages/User';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./scss/app.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" render={() => <Users />} exact />
        <Route path="/user/:login" render={(props) => <User login={props.match.params.login} /> } exact />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
