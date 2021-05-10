'use strict'

const SimplePubSubGlobalData = require("..")

module.exports = function two() {
	SimplePubSubGlobalData.subscribe('test2', () => {
		SimplePubSubGlobalData.setData('value', SimplePubSubGlobalData.getData('value') + 1)
	})
	SimplePubSubGlobalData.setData('value', SimplePubSubGlobalData.getData('value') + 1)
}
