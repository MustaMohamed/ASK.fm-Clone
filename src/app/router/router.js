import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import NotFound from '../components/pages/404';
import Login from '../components/pages/Login';
import Signup from '../components/pages/Signup';

export default (
    <Router>
        <Switch>
            <Route path={'/router.basename/'} exact component={HomePage} />
            <Route path={'/router.basename/home'} exact component={HomePage} />
            <Route path={'/router.basename/login'} exact component={Login} />
            <Route path={'/router.basename/signup'} exact component={Signup} />
            <Route path={'/*'} exact component={NotFound} />
        </Switch>
    </Router>
);