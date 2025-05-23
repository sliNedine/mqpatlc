
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 685, hash: '0592deaa846ce43144150200c6d712b37d95c065338e30934024912a4b4c71d3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1030, hash: '1e5ecaed0a5fdcccb10c491c2b6f4919e22ea9c60a8d93b373c38edb12b1b187', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 4075, hash: '316407f72b44f0e5ed1d80b617c50784ab51caa98d6245d65b8622e47eebbb0b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-HRHGHRFF.css': {size: 290, hash: 'ZOEei0QEAR0', text: () => import('./assets-chunks/styles-HRHGHRFF_css.mjs').then(m => m.default)}
  },
};
