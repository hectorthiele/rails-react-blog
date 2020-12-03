
// const urlServer = 'http://localhost:3000';
const urlServer = 'https://hodinkee-blog.herokuapp.com';

const urlApi = `${urlServer}/api/v1`;

const URLResolver = {
  posts: {
    index: `${urlApi}/posts`
  },

};

export default URLResolver;
