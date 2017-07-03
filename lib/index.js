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

        var attempts = ReliableConnection.defaults.attempts,
            delays = ReliableConnection.defaults.delays;

        if ('attempts' in config) {

        }

        if ('delays' in config) {
            if (Array.isArray(config.delays)) {
                delays = config.delays.map((value, idx) => {
                    const d = parseInt(value);
                    if (isFinite(d) && d >= 0) {
                        return d;
                    }
                    throw new TypeError('Invalid delay value at position ' + idx);
                });
            } else {
                delays = config.delays >= 0 ? [parseInt(config.delays)] : defaults.delays;
            }
        }


        /**
         * @method ReliableConnection#start
         * @description
         * Starts Connecting.
         */
        this.start = function () {

        };

        /**
         * @method ReliableConnection#stop
         * @description
         * Stops doing anything.
         */
        this.stop = function () {

        };

        /**
         * @method ReliableConnection#disconnect
         * @description
         * Disconnect.
         */
        this.disconnect = function () {

        };
    }

    /**
     * @enum {string}
     * @member ReliableConnection.status
     * @description
     * Connection status enum.
     *
     * @property idle
     * has never tried to connect, waits for `start()` to be called
     *
     * @property connected
     * currently connected `'connected', connection`
     *
     * @property disconnected
     * method disconnect just has been called
     *
     * @property connecting
     * trying to connect `{'connecting'}`
     *
     * @property failed
     * failed after the maximum number of attempts
     *
     * @property stopped
     * the driver was stopped by calling `stop()`
     *
     * @property error
     * reports every failed attempt to connect
     *
     */
    ReliableConnection.status = {
        idle: 'idle', // never tried to connect, waiting for start()
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
