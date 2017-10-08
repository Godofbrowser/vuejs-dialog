/**
 * Created by Emmy on 10/7/2017.
 */

import * as Utility from '../../src/plugin/js/utilities'
import should from 'should'


describe('Utility #cloneObj', function () {
    it('The problem: Altering an object "objA" affects "objB"', function () {
        let objA = {foo: 'abc', bar: '123'};
        let objB = objA;
        objA.bar = '1234';
        should(objA).be.exactly(objB)
    })

    it('The solution: cloned object should not be equal to original after altering', function () {
        let objA = {foo: 'abc', bar: '123'};
        let objB = Utility.cloneObj(objA);
        objA.bar = '1234';
        should(objA).not.be.exactly(objB)
    })
})

describe('Utility #mergeObjs', function () {
    it('"objC" should be "objA" and "objB"', function () {
        let objA = {foo: 'abc'};
        let objB = {bar: '123'};
        let objC = Utility.mergeObjs(objA, objB);

        should(objC).have.keys('foo', 'bar')
    })
})

describe('Utility #firstIndex', function () {
    let arr = [{color: 'yellow'}, {color: 'red'}, {color: 'blue'}]

    it('First index of red should be 1', function () {
        should(Utility.firstIndex(arr, 'red', 'color')).be.exactly(1).and.a.Number()
    })

    it('First index of yellow should be 0', function () {
        should(Utility.firstIndex(arr, 'yellow', 'color')).be.exactly(0).and.a.Number()
    })

    it('First index of blue should be 0', function () {
        should(Utility.firstIndex(arr, 'blue', 'color')).be.exactly(2).and.a.Number()
    })

    it('First index of black should be undefined', function () {
        should(Utility.firstIndex(arr, 'black', 'color')).be.exactly(-1).and.a.Number()
    })
})