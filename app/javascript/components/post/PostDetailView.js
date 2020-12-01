import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PostActions from '../redux/actions/PostActions';

//custom components
import Header from '../layout/Header';
import Footer from '../layout/Footer';


class PostDetailView extends Component {
    componentDidMount() {
        let { id }  = this.props.match.params;
        console.log('PARAM: ', id);
        if (id){
            this.props.getPost(id);
        }
    }

    render() {

        if (!this.props.post){
            return (
                <div className='loading'> Loading...</div>
            );
        }

        let { post } =  this.props;
        return (
            <div>
                <Header />
                <div className='container'>
                    <div className='row'>
                        <main>
                            <div className='posts-listing'>
                                <div className='container'>
                                    <div className='row'>
                                        <h2>
                                            {post.title}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <Footer />
            </div>
        );
    };
};

const structuredSelector = createStructuredSelector({
    post: state => state.post
});

const mapDispatchToProps = dispatch => ({
    getPost: (id) => {
        dispatch(PostActions.getPost(id))
    }
});
export default connect(structuredSelector, mapDispatchToProps)(PostDetailView);