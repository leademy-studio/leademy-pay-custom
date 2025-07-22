<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Маршрут для главной страницы
Route::get('/', function () {
    return view('main'); // 'main' - это имя файла main.blade.php
});

// Маршрут для страницы входа
Route::get('/login', function () {
    return view('login'); // 'login' - это имя файла login.blade.php
});

// Маршрут для личного кабинета
Route::get('/account', function () {
    return view('user-account');
});

// Маршрут для админ-панели
Route::get('/admin', function () {
    return view('admin-panel');
});