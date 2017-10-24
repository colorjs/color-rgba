/** @module  color-rgba */

'use strict'

var parse = require('color-parse')
var hsl = require('color-space/hsl')
var clamp = require('clamp')

module.exports = function rgba (color, normalize) {
	var values, i, l

	if (color.length && typeof color !== 'string') {
		values = Array(4)

		//consider uint8 array as 0..255 channel values
		if (color instanceof Uint8Array) {
			values[0] = color[0]
			values[1] = color[1]
			values[2] = color[2]
			values[3] = color[3] != null ? color[3] : 255

			if (normalize === true) {
				values[0] /= 255
				values[1] /= 255
				values[2] /= 255
				values[3] /= 255
			}

			return values
		}

		//consider every other array type as 0..1 float values
		values[0] = color[0]
		values[1] = color[1]
		values[2] = color[2]
		values[3] = color[3] != null ? color[3] : 1

		if (normalize === false) {
			values[0] *= 255
			values[1] *= 255
			values[2] *= 255
			values[3] *= 255
		}

		return values
	}

	//attempt to parse non-array arguments
	var parsed = parse(color)

	if (!parsed.space) return []

	values = Array(3)
	values[0] = clamp(parsed.values[0], 0, 255)
	values[1] = clamp(parsed.values[1], 0, 255)
	values[2] = clamp(parsed.values[2], 0, 255)

	if (parsed.space[0] === 'h') {
		values = hsl.rgb(values)
	}

	values.push(clamp(parsed.alpha, 0, 1))

	if (normalize === false) {
		values[3] *= 255
	}
	else if (normalize === true) {
		values[0] /= 255
		values[1] /= 255
		values[2] /= 255
	}

	return values
}
