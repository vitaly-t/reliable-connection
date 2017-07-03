'use strict';

const EventEmitter = require('events');

const defaults = {
    attempts: 100,
    delays: [100, 1000, 5000, 30000]
};

class ReliableConnection extends EventEmitter {
    constructor(options) {
        super();

        options = options || {};

        let attempts = defaults.attempts, delays = defaults.delays;

        if(options.attempts){

        }
        //const attempts = options.attempts >= 0 ? options.attempts : defaults.attempts;

        if (Array.isArray(options.delays)) {
            delays = options.delays.map((value, idx) => {
                const d = parseInt(value);
                if (isFinite(d) && d >= 0) {
                    return d;
                }
                throw new TypeError('Invalid delay value at position ' + idx);
            });
        } else {
            delays = options.delays >= 0 ? [parseInt(options.delays)] : defaults.delays;
        }

        Object.defineProperty(this, 'attempts', {value: attempts, enumerable: true});
        Object.defineProperty(this, 'delays', {value: delays, enumerable: true});
    }
}

module.exports = ReliableConnection;

//const connection = new ReliableConnection({delays: [new String()]});

//console.log(connection);
