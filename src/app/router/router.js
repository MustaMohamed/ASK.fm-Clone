import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import NotFound from '../components/pages/404';

export default (
    <Router>
        <Switch>
            <Route path={'/router.basename/'} exact component={HomePage} />
            <Route path={'/router.basename/home'} exact component={HomePage} />
            <Route path={'/*'} exact component={NotFound} />
        </Switch>
    </Router>
);