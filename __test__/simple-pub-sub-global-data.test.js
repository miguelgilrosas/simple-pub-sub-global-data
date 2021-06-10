'use strict'

const Save = require('./tests-aux/save')
	, Load = require('./tests-aux/load')
	, {getData} = require('..')

describe('Data store', () => {
	test('Save and retrieve', () => {
		Save.setData('value1', 'Hello World')
		expect(getData('value1')).toBe('Hello World')

		Save.setData('value2', 42)
		expect(Load.getData('value2')).toBe(42)

		Save.setData('value3', [1, 2, 3])
		expect(Load.getData('value3')).toEqual([1, 2].concat([3]))

		Save.setData('value3', [1, 2, 4])
		expect(Load.getData('value3')).toEqual([1, 2].concat([4]))
		expect(Load.getData('value3')).not.toEqual([1, 2].concat([3]))
	})

	test('Retrieve unsaved data', () => {
		expect(Load.getData('value4')).toBeUndefined()
	})

	test('Remove', () => {
		Save.removeData('value1')
		expect(Load.getData('value1')).toBeUndefined()

		Save.removeAllData()
		expect(Load.getData('value2')).toBeUndefined()
		expect(Load.getData('value3')).toBeUndefined()
		expect(Load.getAllData()).toEqual({})
	})
})

describe('Pub-Sub', () => {
	test('Subscribe and publish', () => {
		Save.subscribe('test1', data => Save.setData('test1', data))
		Load.publish('test1', 'Yes')
		setTimeout(() => expect(Load.getData('test1')).toBe('Ye' + 's'), 0)

		// To test: Publish an event does not run functions subscribed with another event
		Load.publish('test2', 'No')
		setTimeout(() => expect(Load.getData('test1')).not.toBe('N' + 'o'), 0)
	})

	test('Unsusbscribe', () => {
		Save.subscribe('test3', data => Save.setData('test3', data))

		Load.unsubscribe('test3', data => Save.setData('test3', data))
		Load.publish('test3', 'Up')
		setTimeout(
			() => {
				expect(Load.getData('test3')).not.toBe('U' + 'p')
				expect(Load.getData('test3')).toBeUndefined()
			}
			, 0
		)
	})
})
