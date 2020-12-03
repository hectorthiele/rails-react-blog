import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify';
import 'react-toastify/dist/ReactToastify.css'
import 'react-images-upload/index.css';
import PostsView from "./post/PostsView";
import PostDetailView from "./post/PostDetailView";
import PostFormView from "./post/PostFormView";

import Header from './layout/Header';
import Footer from './layout/Footer';

import configureStore from "./redux/configureStore";

const store = configureStore();

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                    <ToastContainer />
                    <div className='container'>
                        <div className='row'>
                            <main>
                                <Switch>
                                    {/* maintain the order */}
                                    <Route path='/posts/new' component={PostFormView} />
                                    <Route path='/posts/:id/edit' component={PostFormView} />
                                    <Route path='/posts/:id' component={PostDetailView} />

                                    <Route exact path="/" component={PostsView} />
                                </Switch>
                            </main>
                        </div>
                    </div>
                    <Footer />
                </BrowserRouter>
            </Provider >
        )
    }
};

export default App;