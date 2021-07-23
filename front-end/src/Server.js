import { Server, Model } from 'miragejs';

// eslint-disable-next-line import/prefer-default-export
export function makeServer({ environment = 'development' } = {}) {
  const server = new Server({
    environment,

    models: {
      topic: Model,
      file: Model,
    },

    // eslint-disable-next-line no-shadow
    seeds(server) {
    // create the pseudo topic structures
      server.create('topic', { name: 'frontend', content: { css: 'css.md', links: 'links.md', Docker: 'Docker.md' } });
      server.create('topic', { name: 'projects', content: { 'cool tools': 'cool tools.md', FunProjects: 'Fun projects.md', 'main notes': 'main notes.md' } });

      // craete a pseudo colection for files
      server.create('file', { name: 'Home', data: { title: 'Home', content: '## this is home', tags: ['#cloudIntelligence', '#home', '#booyah'] } });
    },

    routes() {
      this.namespace = 'api';

      this.get('/topics', (schema) => schema.topics.all());

      this.get('/file/:name', (schema, request) => schema.files.findBy({ name: request.params.name }));

      this.passthrough('https://dev-2li3-ipg.eu.auth0.com/oauth/token');
    },
  });

  return server;
}
