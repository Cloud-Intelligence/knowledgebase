import request from '../utils/request';

// eslint-disable-next-line import/prefer-default-export
export function listDocuments() {
  return request({
    url: 'api/documents/',
    method: 'get',
  }).then((r) => r.data);
}

export function getDocument(id) {
  return request({
    url: `api/documents/${id}`,
    method: 'get',
  }).then((r) => r.data);
}

export function postDocument(data) {
  return request({
    url: 'api/documents/',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.data);
}

export function listTags() {
  return request({
    url: 'api/documents/tags/',
    method: 'get',
  }).then((r) => r.data);
}

export function listTopics() {
  return request({
    url: 'api/documents/topics/',
    method: 'get',
  }).then((r) => r.data);
}
