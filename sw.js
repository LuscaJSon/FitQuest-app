const CACHE_NAME = 'fitquest-v10';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalação: Guarda os ficheiros no cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('FitQuest: Guardando ficheiros em cache');
      return cache.addAll(assets);
    })
  );
});

// Ativação: Limpa caches antigos se houver atualização
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Estratégia de Fetch: Tenta carregar do cache primeiro, se não conseguir, vai à rede
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

