
const urlServer = 'http://localhost:3000';

const urlApi = `${urlServer}/api/v1`;

const URLResolver = {
  posts: {
    index: `${urlApi}/posts`,
    show: `${urlApi}/posts`,
    create: `${urlApi}/posts`,
  },

};

export default URLResolver;
