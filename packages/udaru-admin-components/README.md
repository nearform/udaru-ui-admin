# Udaru Admin

## Available Actions:

### Run Application for Development

```sh
$ yarn start # or npm start
```

### Build Application for Production

```sh
$ yarn build # or npm run build
```

Build Folders:

* `/packages/udaru-admin-components/dist/es` - ES Modules
* `/packages/udaru-admin-components/dist` - CommonJS Modules
* `/packages/udaru-admin-components/dist/umd` - UMD Build
* `/packages/udaru-admin-components/storybook-static` - Static Storybook Project

## Detailed Available Actions:

### Run

To run storybook:

```sh
$ yarn storybook # or npm run storybook
```

from `/packages/udaru-admin-components`

To run babel:

```sh
$ yarn watch # or npm run watch
```

from `/packages/udaru-admin-components`

To run both storybook and babel in parallel:

```sh
$ yarn start # or npm start
```

from `/packages/udaru-admin-components`

### Build

To make a build for production:

```sh
$ yarn build-library # or npm run build-library
```

from `/packages/udaru-admin-components`

To make a storybook static build:

```sh
$ yarn build-storybook # or npm run build-storybook
```

from `/packages/udaru-admin-components`

To run both:

```sh
$ yarn build # or npm run build
```

from `/packages/udaru-admin-components`
