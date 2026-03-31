import React, { useEffect, useState } from "react";
import { MdClose, MdNotificationsActive } from "react-icons/md";
import {
  InAppNotification,
  subscribeToNotifications,
} from "../notifications";

const NotificationToast = () => {
  const [notifications, setNotifications] = useState<InAppNotification[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((notification) => {
      setNotifications((current) => [...current, notification]);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (notifications.length === 0) {
      return undefined;
    }

    const timers = notifications.map((notification) =>
      window.setTimeout(() => {
        setNotifications((current) =>
          current.filter((item) => item.id !== notification.id),
        );
      }, notification.durationMs),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [notifications]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3">
      {notifications.map((notification) => (
        <article
          key={notification.id}
          className="pointer-events-auto overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-[0_18px_45px_rgba(0,43,110,0.18)]"
        >
          <div className="clinical-gradient h-1.5 w-full" />
          <div className="flex gap-3 p-4">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MdNotificationsActive className="text-[20px]" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-headline text-sm font-bold text-on-surface">
                {notification.title}
              </h4>
              <p className="mt-1 text-sm leading-5 text-on-surface-variant">
                {notification.body}
              </p>
            </div>

            <button
              type="button"
              aria-label="Dismiss notification"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
              onClick={() =>
                setNotifications((current) =>
                  current.filter((item) => item.id !== notification.id),
                )
              }
            >
              <MdClose className="text-[18px]" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default NotificationToast;
