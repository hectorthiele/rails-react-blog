import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import ImageUploader from 'react-images-upload';
import { toast } from "react-toastify";

import Loading from '../layout/Loading';
import PostActions from '../redux/actions/PostActions';

class PostFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        snippet: '',
        content: '',
        image: null
      },
      submitDisabled: true,
      isSubmiting: false
    };
  }

  componentDidUpdate(prevProps) {

    if ((this.props.isLoading !== prevProps.isLoading) && !this.props.isLoading) {
      console.log("Props: ", this.props);
      console.log("prevProps: ", prevProps);
      if (this.props.success) {
        toast.success("Post saved successfully");
        // redirect to the index
        this.props.history.push(`/`);
      } else {
        toast.error(`Error found: ${this.props.message}`);
      }
    }
  }

  handleChange = (event) => {
    let { post } = this.state;
    let { name, value } = event.target;

    post[name] = value;
    this.setState({ post }, () => this.validatePostForm());
  }

  handleSelectImage = (event) => {
    let { post } = this.state;
    post['image'] = event[0];
    this.setState({ post }, () => this.validatePostForm());
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.savePost(this.state.post);
  }

  validatePostForm = () => {
    let { title, snippet, content, image } = this.state.post;

    let submitDisabled = true;
    if (title.length > 10 && snippet.length > 10 && content.length > 10 && image) {
      submitDisabled = false;
    }

    this.setState({ submitDisabled });
  }

  render() {

    if (this.props.isLoading) {
      return (<Loading />);
    }

    let { post } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='row'>
          <InputFieldGroup type='text' label='Title' name='title' value={post.title} onChange={this.handleChange} />
          <InputFieldGroup type='text' label='Snippet' name='snippet' value={post.snippet} onChange={this.handleChange} />
          <InputFieldGroup type='textarea' label='Content' name='content' value={post.content} onChange={this.handleChange} />

          <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={event => this.handleSelectImage(event)}
            imgExtension={['.jpg', '.png', '.jpeg']}
            withPreview={true}
            singleImage={true}
          />

          <ActionButtonForm cancelRoute='/' submitDisabled={this.state.submitDisabled} isSubmiting={this.props.isSubmiting} />
        </div>
      </form>
    );
  }
};


const InputFieldGroup = ({ type, label, name, value, onChange }) => {

  let tagProps = {
    className: 'form-control',
    placeholder: `Enter the ${name} post`,
    type,
    name,
    value,
    onChange
  };

  let tag = <input {...tagProps} />;
  if (type === 'textarea') {
    tag = <textarea rows={5} {...tagProps} />
  }
  return (
    <div className='form-group col-md-12'>
      <label>{label}</label>
      {tag}
      <small className='form-text text-muted'>Insert here the {name} of the post</small>
    </div>
  );
};

const ActionButtonForm = ({ cancelRoute, submitDisabled }) => {
  return (
    <div className='form-group col-md-12'>
      <Link className='btn btn-default' to={cancelRoute}>Cancel</Link>
      <button type='submit' className='actions btn btn-info' disabled={submitDisabled}>Save</button>
    </div>
  );
};


const structuredSelector = createStructuredSelector({
  post: state => state.post,
  isLoading: state => state.isLoading,
  success: state => state.success,
  message: state => state.message
});

const mapDispatchToProps = dispatch => ({
  savePost: (post) => {
    dispatch(PostActions.savePost(post))
  }
});

export default connect(structuredSelector, mapDispatchToProps)(PostFormView);