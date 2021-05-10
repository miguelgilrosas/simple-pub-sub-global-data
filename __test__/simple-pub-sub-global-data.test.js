'use strict'

const Spsgd = require('..')

describe('Data store', () => {
	test('Save and retrieve', () => {
		Spsgd.setData('value1', 'Hello World')
		expect(Spsgd.getData('value1')).toBe('Hello World')

		Spsgd.setData('value2', 42)
		expect(Spsgd.getData('value2')).toBe(42)

		Spsgd.setData('value3', [1, 2, 3])
		expect(Spsgd.getData('value3')).toEqual([1, 2].concat([3]))

		Spsgd.setData('value3', [1, 2, 4])
		expect(Spsgd.getData('value3')).toEqual([1, 2].concat([4]))
		expect(Spsgd.getData('value3')).not.toEqual([1, 2].concat([3]))
	})

	test('Retrieve unsaved data', () => {
		expect(Spsgd.getData('value4')).toBeUndefined()
	})

	test('Remove', () => {
		Spsgd.removeData('value1')
		expect(Spsgd.getData('value1')).toBeUndefined()

		Spsgd.removeAllData()
		expect(Spsgd.getData('value2')).toBeUndefined()
		expect(Spsgd.getData('value3')).toBeUndefined()
		expect(Spsgd.getAllData()).toEqual({})
	})
})

describe('Pub-Sub', () => {
	test('Subscribe and publish', () => {
		Spsgd.subscribe('test1', data => Spsgd.setData('test1', data))
		Spsgd.publish('test1', 'Yes')
		setTimeout(() => expect(Spsgd.getData('test1')).toBe('Ye' + 's'), 0)

		// To test: Publish an event does not run functions subscribed with another event
		Spsgd.publish('test2', 'No')
		setTimeout(() => expect(Spsgd.getData('test1')).not.toBe('N' + 'o'), 0)
	})

	test('Unsusbscribe', () => {
		Spsgd.subscribe('test3', data => Spsgd.setData('test3', data))

		Spsgd.unsubscribe('test3', data => Spsgd.setData('test3', data))
		Spsgd.publish('test3', 'Up')
		setTimeout(
			() => {
				expect(Spsgd.getData('test3')).not.toBe('U' + 'p')
				expect(Spsgd.getData('test3')).toBeUndefined()
			}
			, 0
		)
	})
})
