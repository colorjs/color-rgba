/** @module  color-rgba */

'use strict'

var parse = require('color-parse')
var rgb = require('color-space/rgb')
var hsl = require('color-space/hsl')

module.exports = function rgba (color) {
	// template literals
	if (Array.isArray(color) && color.raw) color = String.raw.apply(null, arguments)

	var values, i, l

	//attempt to parse non-array arguments
	var parsed = parse(color)

	if (!parsed.space) return []

	var minLimits = parsed.space[0] === 'h' ? hsl.min : rgb.min
	var maxLimits = parsed.space[0] === 'h' ? hsl.max : rgb.max

	values = Array(3)
	values[0] = Math.min(Math.max(parsed.values[0], minLimits[0]), maxLimits[0])
	values[1] = Math.min(Math.max(parsed.values[1], minLimits[1]), maxLimits[1])
	values[2] = Math.min(Math.max(parsed.values[2], minLimits[2]), maxLimits[2])

	if (parsed.space[0] === 'h') {
		values = hsl.rgb(values).map(Math.round)
	}

	values.push(Math.min(Math.max(parsed.alpha, 0), 1))

	return values
}
