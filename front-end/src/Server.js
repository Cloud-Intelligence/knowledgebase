import { Server, Model } from 'miragejs';

// eslint-disable-next-line import/prefer-default-export
export function makeServer(auth0Domain, { environment = 'development' } = {}) {
  const server = new Server({
    environment,

    models: {
      document: Model,
      file: Model,
    },

    // eslint-disable-next-line no-shadow
    seeds(server) {
      // create the pseudo documents
      server.create('document', { title: 'css', id: 12, topic: 'frontend' });
      server.create('document', { title: 'links', id: 13, topic: 'frontend' });
      server.create('document', { title: 'Docker', id: 14, topic: 'frontend' });
      server.create('document', { title: 'cool tools', id: 21, topic: 'projects' });
      server.create('document', { title: 'fun stuff', id: 31, topic: 'fun' });

      // craete a pseudo colection for files
      server.create('file', {
        id: 12,
        data: {
          title: 'Links', content: '## these are the links', tags: ['#cloudIntelligence', '#home', '#booyah'],
        },
      });
      server.create('file', {
        id: 13,
        data: {
          title: 'CSS', content: '## this is CSS', tags: ['#cloudIntelligence', '#home', '#booyah'],
        },
      });
      server.create('file', {
        id: 14,
        data: {
          title: 'Docker', content: '## this is Docker', tags: ['#cloudIntelligence', '#home', '#booyah'],
        },
      });

      server.create('file', {
        id: 21,
        data: {
          title: 'Cool Tools', content: '## these are the tools', tags: ['#cloudIntelligence', '#home', '#booyah'],
        },
      });
      server.create('file', {
        id: 31,
        data: {
          title: 'fun stuffs', content: '## this is fun', tags: ['#cloudIntelligence', '#home', '#booyah', '#yay'],
        },
      });
    },

    routes() {
      this.timing = 0;

      this.urlPrefix = 'http://localhost:5000';

      this.namespace = '/api';

      this.get('/documents', (schema) => ({ data: schema.documents.all().models }));

      this.get('/documents/:id', (schema, request) => {
        const req = schema.files.findBy({ id: request.params.id });
        return {
          data: {
            content: req.data.content,
            tags: req.data.tags,
            title: req.data.title,
          },
        };
      });

      this.get('/documents/tags', (schema) => {
        const tags = [];
        const req = schema.files.all().models;
        // eslint-disable-next-line array-callback-return
        req.map((file) => {
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < file.attrs.data.tags.length; index++) {
            if (!tags.includes(file.attrs.data.tags[index])) {
              tags.push(file.attrs.data.tags[index]);
            }
          }
        });
        return {
          data: {
            tags,
          },
        };
      });

      this.get('/documents/topics', (schema) => {
        const topics = [];
        const req = schema.documents.all().models;
        // eslint-disable-next-line array-callback-return
        req.map((document) => {
          if (!topics.includes(document.topic)) {
            topics.push(document.topic);
          }
        });
        return {
          data: {
            topics,
          },
        };
      });

      this.passthrough(`https://${auth0Domain.bypass}/oauth/token`);
    },
  });

  return server;
}
