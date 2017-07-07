'use strict';

var RC = require('../lib');

describe('Main', function () {
    it('must be able to load', function () {
        var error = new TypeError('Invalid configuration object.');
        expect(function () {
            new RC();
        }).toThrow(error);
    });
});
