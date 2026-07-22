/** @module  color-rgba */
import parse from 'color-parse'
import rgb from 'color-space/rgb.js'
import hsl from 'color-space/hsl.js'
import hsv from 'color-space/hsv.js'
import hwb from 'color-space/hwb.js'
import cmyk from 'color-space/cmyk.js'
import xyz from 'color-space/xyz.js'
import xyzd50 from 'color-space/xyz-d50.js'
import xyy from 'color-space/xyy.js'
import lab from 'color-space/lab.js'
import lchab from 'color-space/lchab.js'
import luv from 'color-space/luv.js'
import lchuv from 'color-space/lchuv.js'
import oklab from 'color-space/oklab.js'
import oklch from 'color-space/oklch.js'
import lrgb from 'color-space/lrgb.js'
import p3 from 'color-space/p3.js'
import a98rgb from 'color-space/a98rgb.js'
import prophoto from 'color-space/prophoto.js'
import rec2020 from 'color-space/rec2020.js'

// every space color-parse can emit → [channel ranges, → rgb 0–255, input scale]
// (css color() channels are 0–1 fractions; color-space keeps conventional ranges)
const spaces = {
	rgb: [rgb.range, v => v],
	hsl: [hsl.range, v => hsl.rgb(...v)],
	hsv: [hsv.range, v => hsv.rgb(...v)],
	hsb: [hsv.range, v => hsv.rgb(...v)],
	hwb: [hwb.range, v => hwb.rgb(...v)],
	cmyk: [cmyk.range, v => cmyk.rgb(...v)],
	xyz: [xyz.range, v => xyz.rgb(...v)],
	xyy: [xyy.range, v => xyz.rgb(...xyy.xyz(...v))],
	lab: [lab.range, v => lab.rgb(...v)],
	lch: [lchab.range, v => lab.rgb(...lchab.lab(...v))],
	luv: [luv.range, v => xyz.rgb(...luv.xyz(...v))],
	lchuv: [lchuv.range, v => xyz.rgb(...lchuv.xyz(...v))],
	oklab: [oklab.range, v => oklab.rgb(...v)],
	oklch: [oklch.range, v => oklch.rgb(...v)],
	srgb: [rgb.range, v => v, 255],
	'srgb-linear': [lrgb.range, v => lrgb.rgb(...v)],
	'display-p3': [p3.range, v => xyz.rgb(...p3.xyz(...v))],
	'a98-rgb': [a98rgb.range, v => xyz.rgb(...a98rgb.xyz(...v))],
	'prophoto-rgb': [prophoto.range, v => xyz.rgb(...prophoto.xyz(...v))],
	rec2020: [rec2020.range, v => xyz.rgb(...rec2020.xyz(...v))],
	'xyz-d65': [xyz.range, v => xyz.rgb(...v), 100],
	'xyz-d50': [xyzd50.range, v => xyz.rgb(...xyzd50.xyz(...v)), 100]
}

// hue wraps (css: hsl(400…) ≡ hsl(40…)), everything else clamps into its range
const bound = (x, [lo, hi]) => hi === 360 ? ((x % 360) + 360) % 360 : Math.min(Math.max(x, lo), hi)

export default function rgba(color) {
	// template literals
	if (Array.isArray(color) && color.raw) color = String.raw(...arguments)
	if (color instanceof Number) color = +color

	//attempt to parse non-array arguments
	const parsed = parse(color)
	if (!parsed.space) return []

	const [range, torgb, scale = 1] = spaces[parsed.space] || []
	if (!range || parsed.values.length < range.length) return []

	//bound into the space's own channel ranges, land in rgb
	let values = torgb(range.map((r, i) => bound(parsed.values[i] * scale, r)))
	values = [...values].map(x => Math.min(Math.max(x, 0), 255))

	values.push(Math.min(Math.max(parsed.alpha, 0), 1))

	return values
}
