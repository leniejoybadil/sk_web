self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("sk-app-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/announcements.html",
        "/projects.html",
        "/free.png",
        "/news.png"
      ]);
    })
  );
});