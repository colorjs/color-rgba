import assert from 'assert'
import rgba from './index.js'

assert.deepEqual(rgba('rgba(1,2,3,.5)'), [1, 2, 3, .5])
assert.deepEqual(rgba('rgba(0,0,0,0)'), [0, 0, 0, 0])
assert.deepEqual(rgba('hsla(0,0,0,1)'), [0, 0, 0, 1])
assert.deepEqual(rgba('rgba(-300,-300,-300,-1)'), [0, 0, 0, 0])

assert.deepEqual(rgba('red'), [255, 0, 0, 1])
assert.deepEqual(rgba('rgb(80, 120, 160)'), [80, 120, 160, 1])
assert.deepEqual(rgba('rgba(80, 120, 160, .5)'), [80, 120, 160, .5])
assert.deepEqual(rgba('rgba(80 120 160 / .5)'), [80, 120, 160, .5])
assert.deepEqual(rgba('hsl(291 80% 50%)'), [198.89999999999995, 25.499999999999993, 229.5, 1])
assert.deepEqual(rgba('hsl(0.8083333333333333turn 80% 50%)'), [198.89999999999995, 25.499999999999993, 229.5, 1])
assert.deepEqual(rgba('hsla(109, 50%, 50%, .75)'), [87.125, 191.25, 63.75, 0.75])
assert.deepEqual(rgba('#f00'), [255, 0, 0, 1])
assert.deepEqual(rgba`#f00`, [255, 0, 0, 1])

assert.deepEqual(rgba('xyz'), [])
// console.log(rgba('hsla(170, 50%, 45%, 1)'))

assert.deepEqual(rgba('srgb(0.85098 0.121569 0.160784)'), [])

assert.deepEqual(rgba(0x00ff00), [0, 255, 0, 1])
assert.deepEqual(rgba(new Number(0x00ff00)), [0, 255, 0, 1])

assert.deepEqual(rgba([1, 1, 1, 1]), [1, 1, 1, 1])
assert.deepEqual(rgba(new Uint8Array([255, 255, 255, 255])), [255, 255, 255, 1])

// CSS Color 4 spaces — reference coordinates from colorjs.io / IEC 61966-2-1
const round = v => v.map(x => Math.round(x))
assert.deepEqual(round(rgba('lab(54.291 80.805 69.891)')), [255, 0, 0, 1])        // red, Lab D50 (colorjs.io)
assert.deepEqual(round(rgba('lch(54.291 106.837 40.858)')), [255, 0, 0, 1])       // red, LCh D50 (colorjs.io)
assert.deepEqual(round(rgba('oklch(0.62796 0.25768 29.234)')), [255, 0, 0, 1])    // red (colorjs.io)
assert.deepEqual(round(rgba('oklab(0.62796 0.22486 0.12585)')), [255, 0, 0, 1])   // red (colorjs.io)
assert.deepEqual(rgba('color(srgb 0.5 0.7 0.1)'), [127.5, 178.5, 25.5, 1])
assert.deepEqual(round(rgba('color(display-p3 1 1 1)')), [255, 255, 255, 1])
assert.deepEqual(round(rgba('color(xyz-d65 0.4124 0.2126 0.0193)')), [255, 0, 0, 1])  // sRGB red primary (IEC 61966-2-1)
assert.deepEqual(round(rgba('cmyk(0, 100, 100, 0)')), [255, 0, 0, 1])
assert.deepEqual(round(rgba('hwb(0, 0%, 0%)')), [255, 0, 0, 1])

// hue wraps per CSS Color 4 §7 (hsl(400…) ≡ hsl(40…)), not clamps
assert.deepEqual(rgba('hsl(400, 100%, 50%)'), rgba('hsl(40, 100%, 50%)'))
assert.deepEqual(rgba('hsl(-320, 100%, 50%)'), rgba('hsl(40, 100%, 50%)'))

// channel-starved strings are not colors
assert.deepEqual(rgba('rgb(1 2)'), [])
