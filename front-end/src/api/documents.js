import request from '../utils/request';

// eslint-disable-next-line import/prefer-default-export
export function listDocuments() {
  return request({
    url: 'api/documents/',
    method: 'get',
  }).then((r) => r.data);
}
