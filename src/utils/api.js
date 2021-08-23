//api.js
import service from './request'

export function getGraph() {
  return service({
    url: '/graph/show',
    method: 'get'
  })
};
