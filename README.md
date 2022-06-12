<p align="center">
  <a href="https://warframedrops.netlify.app">
    <img src="public/assets/favicon.svg" width="128">
    <h1 align="center">Warframe Drops PWA</h1>
  </a>
</p>
<p align="center">
<a href="https://github.com/preactjs/preact" 
target="_blank"><img src="https://img.shields.io/badge/Preact-v10.5-673ab8?style=for-the-badge&logo=preact" alt="preact version" /></a>&nbsp;<a href="https://github.com/preactjs/preact" 
target="_blank"><img src="https://img.shields.io/badge/Vite-v2.9-646CFF?style=for-the-badge&logo=vite" alt="vite version" /></a>&nbsp;<img src="https://img.shields.io/badge/license-mit-red?style=for-the-badge&logo=none" alt="license" />
</p>

a warframe app that finds the best place to farm any in-game item by looking through the [official drop tables](https://n8k6e2y6.ssl.hwcdn.net/repos/hnfvc0o3jnfvc873njb03enrf56.html) published by Digital Extremes in a simple UI, installable on supported browsers for offline usage.

## Generated Data

Build process generates the following JSON files by downloading and parsing the drop data webpage provided by Digital Extremes.

List of in-game items sorted by drop chance in descending order.

#### **`/public/data/drops.json`**

```yaml
[
  {
    "name": "Smoking Body Ephemera Blueprint",
    "place": "Shadow Stalker",
    "rarity": "Very Common",
    "chance": "5.00",
  },
  { ... },
]
```

The metadata of the current build.

#### **`/public/data/info.json`**

```yaml
{
  "hash": "6cda902094785fa79df1ec64647e746d",
  "build": "2022/06/12",
  "update": "2022/06/09",
}
```

## Scripts

here is the list of some built-in npm scripts :

```yaml
{
  "scripts": {
    "dev": "vite", // start dev server
    "build": "vite build", // build for production
    "preview": "vite preview", // preview production build
    "prebuild": "node generateData.js" // generate drop data
  }
}
```

## License

MIT
