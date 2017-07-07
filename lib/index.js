(function (window) {
    'use strict';

    /**
     * @class ReliableConnection
     * @description
     * Connection Class.
     *
     * @param {object} config
     * Connection Configuration.
     *
     * @param {number} [config.attempts=10]
     * Maximum number of connection attempts.
     *
     * @param {number | number[]} [config.delays=[100, 1000, 5000, 30000]]
     * Delays between connection attempts, in milliseconds.
     *
     * It can be either a single delay, or an array of delays. The last delay in the array
     * is reused when the number of attempts is greater than the array's length.
     *
     * @param {function} config.onConnect
     * A callback to establish a connection and return a promise.
     *
     * @param {function} config.onStatus
     * Status change notification, with the following parameters:
     *  - `status`
     *  - `data`
     *
     * @returns {ReliableConnection}
     */
    function ReliableConnection(config) {
        if (!(this instanceof ReliableConnection)) {
            return new ReliableConnection(config);
        }

        if (!config || typeof config !== 'object') {
            throw new TypeError('Invalid configuration object.');
        }

/*
        var attempts = ReliableConnection.defaults.attempts,
            delays = ReliableConnection.defaults.delays;

        if ('attempts' in config) {

        }

        if ('delays' in config) {
            if (Array.isArray(config.delays)) {
                delays = config.delays.map(function(value, idx) {
                    var d = parseInt(value);
                    if (isFinite(d) && d >= 0) {
                        return d;
                    }
                    throw new TypeError('Invalid delay value at position ' + idx);
                });
            } else {
                delays = config.delays >= 0 ? [parseInt(config.delays)] : defaults.delays;
            }
        }
*/

        /**
         * @method ReliableConnection#start
         * @description
         * Initiates connection attempts.
         *
         * It is to be called after creating the class, or after calling `stop()`.
         *
         * The method does nothing, if the current status is either `connected` or `connecting`.
         */
        this.start = function () {

        };

        /**
         * @method ReliableConnection#stop
         * @description
         * Notifies the driver of ceasing all connectivity at once, and to reset itself to the initial state.
         *
         * The connection either already has been closed, or to be closed on status = `stopped`.
         */
        this.stop = function () {
            notifyStatus.call(this, ReliableConnection.status.stopped);
        };

        /**
         * @method ReliableConnection#disconnect
         * @description
         * Notifies the driver of the lost connection, to trigger reconnection attempts.
         */
        this.disconnect = function () {

        };

    }

    function notifyStatus(cb, status, data) {
        if (typeof cb === 'function') {
            var self = this;
            setTimeout(function () {
                cb.call(self, status, data);
            });
        }
    }

    /**
     * @enum {string}
     * @member ReliableConnection.status
     * @description
     * Connection status enum.
     *
     * @property idle
     * Means the class is in the state of doing nothing.
     *
     * It is acquired in the following cases:
     *  - Immediately following instantiation of the class (the default state)
     *  - After reaching the state of `failed`
     *  - After reaching the state of `stopped`
     *
     * `data` = previous state: `undefined` when the class was just created,
     *  or `stopped`/`failed` otherwise.
     *
     * @property connected
     * The connection just has been established.
     *
     * `data` - an object with connection details + statistics:
     *  - `connection` - the object that represents the connection
     *  - `success` - number of times the connection has been established since
     *     the class was created or method `stop` was called.
     *  - `attempts` - number of attempts it took to successfully connect
     *
     * @property disconnected
     * method `disconnect` just has been called
     *
     * @property connecting
     * trying to connect `{'connecting'}`
     *
     * @property failed
     * Permanent failure, after the maximum number of attempts has been reached.
     *
     * @property stopped
     * Method `stop()` just has been called, the driver is about to become `idle`.
     *
     * @property error
     * Another connection attempt has failed.
     *
     * `data` - the error status object:
     *  - `error` - the connection error, which is the rejection reason from `onConnect`
     *  - `start` - Date/Time when the current connection session started
     *  - `count` - number of connection attempts made in the current connection session
     *  - `terminal` - boolean that's set when it was the last connection attempt
     */
    ReliableConnection.status = {
        idle: 'idle',
        connected: 'connected',
        disconnected: 'disconnected',
        connecting: 'connecting',
        failed: 'failed',
        stopped: 'stopped',
        error: 'error'
    };

    /**
     * @member ReliableConnection.defaults
     * @description
     * Default connection configuration.
     */
    ReliableConnection.defaults = {
        attempts: 10,
        delays: [100, 1000, 5000, 30000]
    };

    /* istanbul ignore else */
    if (typeof module === 'object' && module && typeof module.exports === 'object') {
        module.exports = ReliableConnection;
    }
    else {
        window.ReliableConnection = ReliableConnection;
    }
})(this);
