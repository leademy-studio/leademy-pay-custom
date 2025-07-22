/**
 * Leademy Pay Application Entry Point
 */

window._ = require('lodash');

/**
 * Подключаем jQuery и Bootstrap
 */
try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap-sass');
} catch (e) {}

/**
 * Подключаем axios для AJAX
 */
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * CSRF токен
 */
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

/**
 * Подключаем ваши кастомные модули
 */
require('./components/main');
require('./components/payment');
require('./components/admin-panel');  
require('./components/user-account');
