/** @module  color-rgba */
import parse from 'color-parse'
import hsl from 'color-space/hsl.js'

export default function rgba (color) {
	// template literals
	if (Array.isArray(color) && color.raw) color = String.raw(...arguments)

	var values, i, l

	//attempt to parse non-array arguments
	var parsed = parse(color)

	if (!parsed.space) return []

	values = Array(3)
	values[0] = Math.min(Math.max(parsed.values[0], 0), 255)
	values[1] = Math.min(Math.max(parsed.values[1], 0), 255)
	values[2] = Math.min(Math.max(parsed.values[2], 0), 255)

	if (parsed.space[0] === 'h') {
		values = hsl.rgb(values)
	}

	values.push(Math.min(Math.max(parsed.alpha, 0), 1))

	return values
}
