{{-- 1. Указываем, что эта страница "наследует" главный мастер-шаблон --}}
@extends('layouts.app')

{{-- 2. Задаем уникальный заголовок для этой страницы --}}
@section('title', 'Авторизация')

{{-- 3. Определяем секцию 'content' --}}
@section('content')

    {{-- Здесь ТОЛЬКО уникальный HTML-код для страницы входа --}}
    <div class="login-container" style="padding-top: 5vh;">
        <form id="login-form" class="login-form">
            <h2 class="login-title">Авторизация</h2>

            <!-- Поле для Email -->
            <div class="login-form-group">
                <input type="email" id="email" class="login-form-input" placeholder=" " required>
                <label for="email" class="login-form-label">Введите ваш емейл</label>
            </div>

            <!-- Поле для Пароля -->
            <div class="login-form-group">
                <input type="password" id="password" class="login-form-input" placeholder=" " required>
                <label for="password" class="login-form-label">Введите ваш пароль</label>
            </div>

            <!-- Контейнер для кнопок -->
            <div class="login-button-container">
                <button type="submit" id="login-btn" class="btn btn-primary btn-login">Войти</button>
                <button type="button" id="recover-btn" class="btn btn-primary btn-recover hidden">Восстановить пароль</button>
            </div>

            <a href="#" id="forgot-password-link" class="forgot-password-link">Забыл пароль</a>
        </form>
    </div>

    <!-- Модальное окно для уведомления -->
    <div id="notification-modal" class="notification-modal hidden">
        <div class="notification-content">
            <p>Данные отправлены на ваш e-mail.</p>
        </div>
    </div>

@endsection
