## Quench

### v5.8.0 (September 23, 2020)

- Integrating `prettier` in with `eslint`/`stylelint` to simplify text editor setup [#44](https://github.com/Velir/frontend-starter/pull/44)
- Upgrading stylelint to 3.7 (`blacklist` -> `disallowed-list`) [#47](https://github.com/Velir/frontend-starter/pull/47)
- Updating `runJsTask.js` to warn if `package.json` is missing.
- Retiring `runPatternLabTask.js`

### v5.7.0 (May 5, 2020)
(post [EGH](https://github.com/Velir/GV-HLS/) changes)

- Renamed `/client` to `/frontend`
- Always generate js sourcemaps [#34](https://github.com/Velir/frontend-starter/issues/34)
- Add postcss-encode-background-svgs [#35](https://github.com/Velir/frontend-starter/issues/35)
- Update babelrc to handle core-js polyfills [#36](https://github.com/Velir/frontend-starter/issues/36)
- Adding stylelint-order [#39](https://github.com/Velir/frontend-starter/pull/39) [#40](https://github.com/Velir/frontend-starter/issues/40)

### v5.6.3 (November 6, 2019)

- Replacing sass-lint with stylelint
- Updating some eslint rules
- Fixing bug with runBrowserSync when both a proxy and server and defined (https://github.com/Velir/frontend-starter/issues/29)
- Removing svgmin from `runSvgSpriteTask.js` (https://github.com/Velir/frontend-starter/issues/32)

#### v5.5.3 (September, 19, 2019)

- Making `runJsTask.js` more robust by avoiding infinite loops with circular dependencies.
- Fixing IE bug in `runJsTask.js` with transpiling core-js (https://github.com/zloirock/core-js/issues/514#issuecomment-476533317)

#### v5.5.2 (June 21, 2019)

- Fixing bug with postcss ordering that cause autoprefixer grid to not add `-ms` prefixes.
- Updating autoprefixer default option to be `grid: "autoplace"` (see https://github.com/postcss/autoprefixer#grid-autoplacement-support-in-ie)

#### v5.5.1 (June 13, 2019)

- Moving browser list out of `runSassTask` and in to `.browserslistrc` [#21](https://github.com/Velir/frontend-starter/issues/21)
- Updating node modules and fixing breaking changes for `core-js` version 3

### v5.5.0 (June 10, 2019)

- Adding [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)

### v5.4.2 (May 24, 2019)

- Warning if browser-sync task is called with watch false
- Adding task descriptions in `logHelp`

### v5.3.1 (May 23, 2019)

- Running quench files through prettier
- Addressing TODO in browser-sync task
- Adding glob support to match `.js` or `.jsx` files in `runJsTask.js`
- Updating readme with better Jenkins commands

### v5.2.0 (April 22, 2019)

- Adding react-hooks eslint rule

### v5.1.0 (March 13, 2019)

- Fixing bug with window machines not watching

### v5.0.0 (October 2, 2018)

- Adding `.babelrc` file instead of hardcoding the babel config inside of `createJsTask`.
- Upgrading babel to version 7.
- Renaming `createCssTask` to `createSassTask` to disambiguate between other css tasks.
- Removing `createJsConcatTask` in favor of configuring `createJsSimpleTask`.
- Fixing bug in `createBrowserSync` task so local.js `proxy` is respected
- Removing fileExists in favor of fs.existsSync
- Upgrading to Gulp 4
- Transpiling node_modules for IE compatibility
