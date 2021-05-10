'use strict'

const SimplePubSubGlobalData = require('..')
	, one = require('./one.js')
	, two = require('./two.js')

function testMain() {
	SimplePubSubGlobalData.setData('value', 0)
	one()
	two()
	SimplePubSubGlobalData.publish('test1')

	setTimeout(
		() => {
			if (SimplePubSubGlobalData.getData('value') !== 4) {
				console.log('Error: Some tests failed.')
				process.exit(1)
			}

			console.log('Tests passed')
			process.exit(0)
		}
		, 1000
	)
}

testMain()
