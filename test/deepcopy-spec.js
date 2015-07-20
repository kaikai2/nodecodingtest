/*global describe, it, expect */
(function () {

    'use strict';
    
    // answer to question 3
    function deepCopy(obj) {
        var arr, newObj, i;
        if (obj instanceof Array) {
            arr = [];
            for (i = 0; i < obj.length; i += 1) {
                arr.push(deepCopy(obj[i]));
            }
            return arr;
        }
        if (obj instanceof Object) {
            newObj = {};
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    newObj[i] = deepCopy(obj[i]);
                }
            }
            return newObj;
        }

        return obj;
    }

    // test cases
    describe("deepcopy", function () {

        it("should copy numeric, boolean and string", function () {

            expect(deepCopy(1)).toEqual(1);

            expect(deepCopy(true)).toEqual(true);
        
            expect(deepCopy('abc')).toEqual('abc');
        });

        it("should not change the content of param", function () {
            var a = {a: [], b: false, c: {}};
            deepCopy(a);
            expect(a).toEqual({a: [], b: false, c: {}});
        });
        
        it("should copy array, object, and should not return the same instance", function () {

            var cases = [
                [],
                [1, 2, 3],
                ["a", 1, false],
                {},
                {a: 1, b: "b", c: true}
            ], i, c;
            
            for (i = 0; i < cases.length; i += 1) {
                c = cases[i];
                expect(deepCopy(c)).toEqual(c);
                expect(deepCopy(c)).not.toBe(c);
            }
        });
        
        it("should copy recurrsive array and objects, and should not return the same instance", function () {

            var cases = [
                [[], [[]]],
                [1, {}, false, {a: []}, []],
                {a: [false, []], b: {c: {}}}
            ], i, c;
            
            for (i = 0; i < cases.length; i += 1) {
                c = cases[i];
                expect(deepCopy(c)).toEqual(c);
                expect(deepCopy(c)).not.toBe(c);
            }
        });
    });
    
}());