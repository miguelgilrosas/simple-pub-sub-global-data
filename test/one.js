'use strict'

const SimplePubSubGlobalData = require("..")

module.exports = function one() {
	SimplePubSubGlobalData.subscribe('test1', () => {
		SimplePubSubGlobalData.setData('value', SimplePubSubGlobalData.getData('value') + 1)
		SimplePubSubGlobalData.publish('test2')
	})
	SimplePubSubGlobalData.setData('value', SimplePubSubGlobalData.getData('value') + 1)
}
