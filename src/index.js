module.exports = class SimplePubSubGlobalData {
	static _data = {
		pubSubStructure: {
			subscriptions: {}
		},
		data: {},
	}

	static getAllData() {
		return this._data.data
	}

	static getData(item) {
		return this._data.data[item]
	}

	static setData(item, value) {
		this._data.data[item] = value
	}

	static removeData(item) {
		delete this._data.data[item]
	}

	static removeAllData() {
		this._data.data = {}
	}

	static subscribe(event, func) {
		const subs = this._data.pubSubStructure.subscriptions
		if (subs[event]) {
			subs[event].push(func)
		}
		else {
			subs[event] = [func]
		}
	}

	static unsubscribe(event, func) {
		const funcList = this._data.pubSubStructure.subscriptions[event]
		if (funcList  !== undefined && funcList.includes(func)) {
			funcList.splice(funcList.indexOf(func), 1)
		}
	}

	static publish(event, data) {
		const funcList = this._data.pubSubStructure.subscriptions[event]
		if (funcList !== undefined) {
			funcList.forEach(func => setTimeout(func, 0, data))
		}
	}
}
