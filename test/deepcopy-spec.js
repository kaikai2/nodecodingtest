/*global describe, it, expect */
(function () {

    'use strict';
    
    // answer to question 3
    function deepCopy(obj) {
        if (obj instanceof Array) {
            var arr = [];
            for (var i = 0; i < obj.length; i++) {
                arr.push(deepCopy(obj[i]));
            }
            return arr;
        }
        if (obj instanceof Object) {
            var newObj = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = deepCopy(obj[key]);
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
            ];
            
            for (var i = 0; i < cases.length; i++) {
                var c = cases[i];
                expect(deepCopy(c)).toEqual(c);
                expect(deepCopy(c)).not.toBe(c);
            }
        });
        
        it("should copy recurrsive array and objects, and should not return the same instance", function () {

            var cases = [
                [[], [[]]],
                [1, {}, false, {a: []}, []],
                {a: [false, []], b: {c: {}}}
            ];
            
            for (var i = 0; i < cases.length; i++) {
                var c = cases[i];
                expect(deepCopy(c)).toEqual(c);
                expect(deepCopy(c)).not.toBe(c);
            }
        });
    });
    
}());