<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Пример заглушки для проверки пользователя
Route::post('/v2/user/check', function (Request $request) {
    // Простая логика для заглушки: если email содержит 'test', то пользователь существует
    if (str_contains($request->email, 'test')) {
        return response()->json(['exists' => true]); //
    }
    return response()->json(['exists' => false]); //
});

// Заглушка для обработки заявки
Route::post('/v2/requests/{id}/process', function ($id) {
    return response()->json([
        'status' => 'success',
        'message' => 'Request processed successfully.'
    ]); //
});

// Заглушка для вебхука от Telegram
Route::post('/v2/telegram/webhook', function () {
    return response()->json(['status' => 'received']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
