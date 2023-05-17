"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectType = exports.StatusTypes = void 0;
/* Messages types  */
exports.StatusTypes = {
    100: 'Success',
    200: 'Already exist',
    201: 'Input does not exist',
    202: 'Request fail',
    203: 'Unauthorized',
    400: 'Input missing',
    401: 'Incorrect input',
    402: 'Incorrect input type',
    403: 'Not authorized',
    404: 'System error',
    405: 'Already connected',
    406: 'Missing Token',
    407: 'Token does not correspond to any session'
};
/* Connection  */
exports.ConnectType = {};
