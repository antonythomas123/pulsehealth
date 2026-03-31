self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  const fallbackPayload = {
    title: "PulseHealth",
    body: "You have a new update waiting.",
    url: "/dashboard",
  };

  let payload = fallbackPayload;

  if (event.data) {
    try {
      payload = {
        ...fallbackPayload,
        ...event.data.json(),
      };
    } catch (error) {
      payload = {
        ...fallbackPayload,
        body: event.data.text(),
      };
    }
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      data: { url: payload.url },
      tag: payload.tag || "pulsehealth-push",
      renotify: true,
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl =
    event.notification.data && event.notification.data.url
      ? event.notification.data.url
      : "/dashboard";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }

      return undefined;
    }),
  );
});
