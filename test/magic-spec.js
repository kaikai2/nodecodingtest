/*global describe, it, expect */
(function () {
    
    'use strict';

    // answer to question 1
    Function.prototype.magic = function () {
        var args = Array.prototype.slice.call(arguments),
            fun = this;
        return function () {
            var restArgs = Array.prototype.slice.call(arguments);
            return fun.apply(this, args.concat(restArgs));
        };
    };

    // test cases
    describe("implement magic as bind", function () {

        it("should", function () {
            var add = function (a, b) { return a + b; };
            var addTo = add.magic(2);

            var say = function (something) { return something; };
            var welcome = say.magic('Hi, how are you?');

            expect(addTo(5)).toEqual(7);
            expect(welcome()).toEqual('Hi, how are you?');
        });
    });
    
}());