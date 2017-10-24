const assert = require('assert')
const rgba = require('./')

assert.deepEqual(rgba('rgba(1,2,3,.5)'), [1,2,3,.5])
assert.deepEqual(rgba('rgba(0,0,0,0)'), [0,0,0,0])
assert.deepEqual(rgba('hsla(0,0,0,1)'), [0,0,0,1])
assert.deepEqual(rgba('rgba(255,255,255,1)', true), [1,1,1,1])
assert.deepEqual(rgba('rgba(127.5,127.5,127.5,.5)', true), [.5,.5,.5,.5])
assert.deepEqual(rgba([1,1,1,1]), [1,1,1,1])
assert.deepEqual(rgba('rgb(300,300,300)', true), [1,1,1,1])
assert.deepEqual(rgba('rgba(-300,-300,-300,-1)'), [0,0,0,0])
assert.deepEqual(rgba([0,0,0,0]), [0,0,0,0])

assert.deepEqual(rgba('xyz'), [])
// console.log(rgba('hsla(170, 50%, 45%, 1)'))


assert.deepEqual(rgba(new Uint8Array([255, 255, 255, 255]), true), [1, 1, 1, 1])
assert.deepEqual(rgba(new Uint8Array([255, 255, 255, 1])), [255, 255, 255, 1])
assert.deepEqual(rgba([0, 0.25, 0, 1], false), [0, 63.75, 0, 255])
assert.deepEqual(rgba([0, 0, 0, 1], false), [0, 0, 0, 255])
assert.deepEqual(rgba(new Uint8Array([0, 255, 0, 255]), true), [0, 1, 0, 1])
