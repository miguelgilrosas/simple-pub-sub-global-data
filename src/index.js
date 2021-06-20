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

		subscribe(event, func, sync = false) {
			const subs = this._data.pubSubStructure.subscriptions
			if (subs[event]) {
				subs[event].push([func, sync])
			}
			else {
				subs[event] = [[func, sync]]
			}
		},

		unsubscribe(event, func) {
			let funcDataList = this._data.pubSubStructure.subscriptions[event]
			if (funcDataList !== undefined ) {
				funcDataList = funcDataList
					.filter(funcData => funcData[0] !== func)

				if (funcDataList.length === 0) {
					delete this._data.pubSubStructure.subscriptions[event]
					return
				}

				this._data.pubSubStructure.subscriptions[event] = funcDataList
			}
		},

		publish(event, data) {
			const funcList = this._data.pubSubStructure.subscriptions[event]
			if (funcList !== undefined) {
				funcList.forEach(funcData => {
					if (funcData[1]) {
						funcData[0](data)
					}
					else {
						setTimeout(funcData[0], 0, data)
					}
				})
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
