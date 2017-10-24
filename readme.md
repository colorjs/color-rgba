# color-rgba [![Build Status](https://travis-ci.org/colorjs/color-rgba.png)](https://travis-ci.org/colorjs/color-rgba)

Convert color string to array with channels: `rgba(127,127,127,.1)` → `[.5,.5,.5,.1]`. Optionally ensure output array format.

## Usage

[![npm install color-rgba](https://nodei.co/npm/color-rgba.png?mini=true)](https://npmjs.org/package/color-rgba/)

### `rgba(string|array, normalize?)`

Returns an array with channel values, optionally normalized to `_0..1_` or `_0..255_` range. By default returns values exactly as they are in input string.

```js
const rgba = require('color-rgba')

//parses css string and converts to rgb space
rgba('rgba(80, 120, 160, .5)') // [80, 120, 160, .5]
rgba('rgba(80, 120, 160, .5)', true) // [.31, .47, .62, .5]
rgba('rgba(80, 120, 160, .5)', false) // [80, 120, 160, 127]
rgba('hsla(170, 50%, 45%, 1)', true) // [.225, .675, .6, 1]

//detects & sanitizes arrays/typed arrays
rgba([0, 0.25, 0, 1], false) // [0, 63.75, 0, 255]
rgba(new Uint8Array([0, 64, 0, 1]), true) // [0, 0.25, 0, 1]
```

## Related

* [color-alpha](https://github.com/dfcreative/color-alpha) — change alpha of a color string.
* [color-interpolate](https://github.com/dfcreative/color-interpolate) — interpolate by color palette.
* [color-parse](https://github.com/dfcreative/color-parse) — comprehensive color string parser.

## License

MIT.
