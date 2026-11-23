// The Umami tracker (site.analytics) adds this when it loads. Without it, events are simply not sent.
interface Window {
  umami?: { track: (event: string, data?: Record<string, string>) => void };
}
