import { Server, Model } from 'miragejs';

// eslint-disable-next-line import/prefer-default-export
export function makeServer(auth0Domain, { environment = 'development' } = {}) {
  const server = new Server({
    environment,

    models: {
      topic: Model,
      file: Model,
    },

    // eslint-disable-next-line no-shadow
    seeds(server) {
      // create the pseudo topic structures
      server.create('topic', { name: 'frontend', content: { css: { name: 'css.md', id: 12 }, links: { name: 'links.md', id: 13 }, Docker: { name: 'Docker.md', id: 14 } } });
      server.create('topic', { name: 'projects', content: { 'cool tools': { name: 'cool tools.md', id: 21 }, FunProjects: 'Fun projects.md', 'main notes': 'main notes.md' } });

      // craete a pseudo colection for files
      server.create('file', {
        id: 12,
        name: 'links.md',
        data: {
          topic: 'frontend', title: 'Links', content: '## these are the links', tags: ['#cloudIntelligence', '#home', '#booyah'],
        },
      });
      server.create('file', {
        id: 13,
        name: 'css.md',
        data: {
          topic: 'frontend', title: 'CSS', content: '## this is CSS', tags: ['#cloudIntelligence', '#home', '#booyah'],
        },
      });
      server.create('file', {
        id: 14,
        name: 'Docker.md',
        data: {
          topic: 'frontend', title: 'Docker', content: '## this is Docker', tags: ['#cloudIntelligence', '#home', '#booyah'],
        },
      });

      server.create('file', {
        id: 21,
        name: 'links.md',
        data: {
          topic: 'projects', title: 'Cool Tools', content: '## these are the tools', tags: ['#cloudIntelligence', '#home', '#booyah'],
        },
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/topics', (schema) => schema.topics.all());

      this.get('/file/:id', (schema, request) => schema.files.findBy({ id: request.params.id }));

      this.passthrough(`https://${auth0Domain.bypass}/oauth/token`);
    },
  });

  return server;
}
