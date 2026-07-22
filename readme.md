# color-rgba [![test](https://github.com/colorjs/color-rgba/actions/workflows/test.js.yml/badge.svg)](https://github.com/colorjs/color-rgba/actions/workflows/test.js.yml) [![size](https://img.shields.io/bundlephobia/minzip/color-rgba?label=size)](https://bundlephobia.com/result?p=color-rgba) ![stable](https://img.shields.io/badge/stability-stable-green)

Convert color string to array with rgba channel values: `"rgba(127,127,127,.1)"` → `[127,127,127,.1]`.

## Usage

`$ npm install color-rgba`

```js
import rgba from 'color-rgba'

rgba('red') // [255, 0, 0, 1]
rgba('rgb(80, 120, 160)') // [80, 120, 160, 1]
rgba('rgba(80, 120, 160, .5)') // [80, 120, 160, .5]
rgba('hsla(109, 50%, 50%, .75)') // [87.125, 191.25, 63.75, .75]
rgba('oklch(0.628 0.258 29.234)') // [255, 0, 0, 1]
rgba('color(display-p3 1 0 0)') // [255, 0, 0, 1]
rgba`rgb(80 120 160 / 50%)` // [80, 120, 160, .5]
```

## API

### `let [r, g, b, alpha] = rgba(color)`

Returns rgba channel values for any string [color-parse](https://ghub.io/color-parse) recognizes: hex, keywords, `rgb[a]()`, `hsl[a]()`/`hsv()`/`hwb()`, `cmyk()`, `lab()`/`lch()`, `oklab()`/`oklch()`, `luv()`/`lchuv()`, `xyz()`/`xyy()`, `color(srgb | srgb-linear | display-p3 | a98-rgb | prophoto-rgb | rec2020 | xyz-d50 | xyz-d65 …)` — plus arrays, numbers and template literals. Conversions come from [color-space](https://ghub.io/color-space). `r`, `g`, `b` are `0..255`, `alpha` is `0..1`; hues wrap per CSS, other channels clamp into their documented ranges. Unrecognized input returns `[]`.

## Related

* [color-normalize](https://github.com/colorjs/color-normalize) − convert any input color argument into a defined output format.
* [color-alpha](https://github.com/colorjs/color-alpha) − change alpha of a color string.
* [color-interpolate](https://github.com/colorjs/color-interpolate) − interpolate by color palette.


<p align=center><a href="https://github.com/krsnzd/license/">🕉</a></p>
