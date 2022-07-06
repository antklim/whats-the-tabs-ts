# whats-the-tabs-ts
This is an example service to find guitar tabs for the songs. The songs could be
searched by name pattern or by artist name. The service uses [Songsterr API](https://www.songsterr.com)
to get tabs.

## Application architecture
```
+--------+      +----------------+     +---------------+
| Client | ---> | Whats The Tabs |---> | Songsterr API |
+--------+      +----------------+     +---------------+
```
