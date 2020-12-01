import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PostsView from "./post/PostsView";
// import DashboardView from "./dashboard/DashboardView";
import configureStore from "./redux/configureStore";
const store = configureStore();

class App extends Component {

    render (){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={PostsView} />
                        {/*<Route exact path='/' render={() => ("Home")} />*/}
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
};

export default App;