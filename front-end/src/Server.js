import { Server, Model } from 'miragejs';
import mockData from './utils/mockData';

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
      server.create('document', { title: 'Test1', id: 12, topic: 'Topic1' });
      server.create('document', { title: 'Test2', id: 13, topic: 'Topic2' });

      // craete a pseudo colection for files
      server.create('file', {
        id: 12,
        data: {
          title: 'Test1',
          content: mockData,
          tags: ['cloudIntelligence', 'home', 'booyah'],
        },
      });
      server.create('file', {
        id: 13,
        data: {
          title: 'Test2', content: mockData, tags: ['cloudIntelligence', 'home', 'booyah'],
        },
      });
    },

    routes() {
      this.timing = 0;

      this.urlPrefix = 'http://localhost:5000';

      this.namespace = '/api';

      let id = 100;

      this.post('/documents', (schema, request) => {
        const attr = JSON.parse(request.requestBody);
        id += 1;
        schema.documents.create({
          title: attr.data.title,
          id,
          topic: attr.topic,
        });
        schema.files.create({
          id,
          data: {
            title: attr.data.title,
            content: attr.data.content,
            tags: attr.data.tags,
          },
        });
        return { success: true, id };
      });

      this.get('/documents', (schema) => ({ data: schema.documents.all().models }));

      this.post('/documents/:id', (schema, request) => {
        const docId = request.params.id;
        const docData = JSON.parse(request.requestBody);
        const fileReq = schema.files.findBy({ id: docId });
        const docReq = schema.documents.findBy({ id: docId });
        fileReq.update({ id: docId, data: docData.data });
        docReq.update({ id: docId, title: docData.data.title, topic: docData.topic });
      });

      this.get('/documents/:id', (schema, request) => {
        const fileReq = schema.files.findBy({ id: request.params.id });
        const docReq = schema.documents.findBy({ id: request.params.id });
        return {
          data: {
            topic: docReq.topic,
            data: {
              content: fileReq.data.content,
              tags: fileReq.data.tags,
              title: fileReq.data.title,
            },
          },
        };
      });

      this.delete('/documents/:id', (schema, request) => {
        const reqFile = schema.files.findBy({ id: request.params.id });
        const reqDoc = schema.documents.findBy({ id: request.params.id });
        reqFile.destroy();
        reqDoc.destroy();
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
          data: tags,
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
          data: topics,
        };
      });

      this.passthrough(`https://${auth0Domain.bypass}/oauth/token`);
    },
  });

  return server;
}
