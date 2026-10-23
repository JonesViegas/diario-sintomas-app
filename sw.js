/* Service worker do Diário de sintomas.
   Guarda só os arquivos do app para funcionar sem internet.
   Os dados do paciente ficam no IndexedDB e nunca passam por aqui. */
const VERSION = 'v9';
const CACHE = 'diario-sintomas-' + VERSION;
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon.svg',
  './icons/favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('diario-sintomas-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

// Tocar num aviso abre o app (ou traz para a frente) e leva para a tela certa.
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const act = e.notification.data?.act || '';
  e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(list => {
    const c = list[0];
    if (c) { c.postMessage({act}); return c.focus(); }
    return self.clients.openWindow('./' + (act ? '?acao=' + encodeURIComponent(act) : ''));
  }));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // Abre sempre, mesmo offline: tenta a rede e cai para o cache.
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
