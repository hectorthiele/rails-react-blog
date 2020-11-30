import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardView from "../components/dashboard/DashboardView";
import PostsView from "../components/post/PostsView";

const RouteApp = (
    <Router>
        <Switch>
            <Route path="/" exact component={DashboardView} />
            <Route path="/posts" exact component={PostsView} />
        </Switch>
    </Router>
);

export default RouteApp;