/** @module  color-rgba */

'use strict'

const parse = require('color-parse')
const hsl = require('color-space/hsl')
const clamp = require('clamp')

module.exports = function rgba (color, normalize = true) {
	let channels;

	let parsed = parse(color);

	if (!parsed.space) return null;

	parsed.values = parsed.values.map(v => clamp(v, 0, 255))

	if (parsed.space[0] === 'h') {
		parsed.values = hsl.rgb(parsed.values)
	}

	if (normalize) {
		parsed.values = parsed.values.map(v => v/255)
	}

	parsed.values.push(clamp(parsed.alpha, 0, 1))

	return parsed.values
}

