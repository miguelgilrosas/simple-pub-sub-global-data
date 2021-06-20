'use strict'

const globalEnvironment = window || global
let SimplePubSubGlobalData

if (globalEnvironment.SimplePubSubGlobalData) {
	SimplePubSubGlobalData = globalEnvironment.SimplePubSubGlobalData
}
else {
	SimplePubSubGlobalData = {
		_data: {
			pubSubStructure: {
				subscriptions: {}
			},
			data: {},
		},

		getAllData() {
			return this._data.data
		},

		getData(item) {
			return this._data.data[item]
		},

		setData(item, value) {
			this._data.data[item] = value
		},

		removeData(item) {
			delete this._data.data[item]
		},

		removeAllData() {
			this._data.data = {}
		},

		subscribe(event, func) {
			const subs = this._data.pubSubStructure.subscriptions
			if (subs[event]) {
				subs[event].push(func)
			}
			else {
				subs[event] = [func]
			}
		},

		unsubscribe(event, func) {
			const funcList = this._data.pubSubStructure.subscriptions[event]
			if (funcList !== undefined && funcList.includes(func)) {
				funcList.splice(funcList.indexOf(func), 1)
			}
		},

		publish(event, data) {
			const funcList = this._data.pubSubStructure.subscriptions[event]
			if (funcList !== undefined) {
				funcList.forEach(func => setTimeout(func, 0, data))
			}
		}
	}

	// To allow imports or requires in destructuring form, ex.: import { getData } from 'simple-pub-sub-global-data'
	Object.keys(SimplePubSubGlobalData)
		.filter(k => typeof SimplePubSubGlobalData[k] === 'function')
		.forEach(k => SimplePubSubGlobalData[k] = SimplePubSubGlobalData[k].bind(SimplePubSubGlobalData))

	globalEnvironment.SimplePubSubGlobalData = SimplePubSubGlobalData
}

module.exports = SimplePubSubGlobalData
