/** @module  color-rgba */

'use strict'

var parse = require('color-parse')
var hsl = require('color-space/hsl')
var clamp = require('clamp')

module.exports = function rgba (color) {
	var values, i, l

	if (typeof color !== 'string' && typeof color !== 'number') throw Error('Argument should be a string')

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

	return values
}
