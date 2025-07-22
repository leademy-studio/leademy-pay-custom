{{-- 1. Указываем, что эта страница "наследует" главный мастер-шаблон --}}
@extends('layouts.app')

{{-- 2. Задаем уникальный заголовок для этой страницы --}}
@section('title', 'Личный кабинет')

{{-- 3. Определяем секцию 'content' --}}
@section('content')

    {{-- Здесь ТОЛЬКО уникальный HTML-код для страницы личного кабинета --}}
    <div class="container" style="padding-top: 50px;">
        <div class="text-content" style="max-width: 100%; text-align: left; align-items: flex-start; gap: 20px;">
            {{-- Имя пользователя должно будет подставляться из контроллера --}}
            <h1>Добрый день, {{-- Auth::user()->name ?? '[имя пользователя]' --}}!</h1>
            <p>Здесь вы можете управлять вашими картами и просматривать историю операций.</p>
        </div>

        <div class="tab-navigation" style="margin-top: 40px;">
            <button class="tab-button active" data-tab="cards-tab">Карты</button>
            <button class="tab-button" data-tab="history-tab">История транзакций</button>
            <button class="tab-button" data-tab="settings-tab">Настройки безопасности</button>
        </div>

        <div class="tab-content">
            <div id="cards-tab" class="tab-pane active">
                <section id="cards" class="content-wrapper" style="flex-direction: column; align-items: stretch;">
                    <div class="cards-grid">
                        {{-- Этот блок должен будет генерироваться в цикле на основе данных из БД --}}
                        <div class="card-item" data-card-id="101">
                            <div class="card-header">
                                <h3>Visa Virtual</h3>
                                <span class="status-badge status-active">Активна</span>
                            </div>
                            <div class="card-number">
                                4000 1234 5678 9010
                            </div>
                            <div class="card-details">
                                <span>Срок: 12/26</span>
                                <span class="cvv-display">CVV: ***</span>
                            </div>
                            <div class="card-balance">
                                <span>Баланс:</span>
                                <span>$50.00</span>
                            </div>
                            <div class="card-actions">
                                <button class="btn btn-secondary btn-show-cvv">Показать CVV</button>
                                <button class="btn btn-secondary btn-freeze">Заморозить</button>
                                <button class="btn" style="background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" style="height: 20px;">
                                    Google Pay
                                </button>
                                <button class="btn" style="background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="ApplePay" style="height: 20px;">
                                    Apple Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
            <div id="history-tab" class="tab-pane">
                <section id="history" class="content-wrapper" style="flex-direction: column; align-items: stretch;">
                    {{-- Сюда будет загружаться история транзакций --}}
                </section>
            </div>

            <div id="settings-tab" class="tab-pane">
                <section id="security" class="content-wrapper" style="flex-direction: column; align-items: flex-start;">
                    <h2>Смена пароля</h2>
                    <p>Пароль должен содержать минимум 12 символов, включая заглавные и строчные буквы, цифры и 1 спецсимвол.</p>
                    <form id="change-password-form">
                        <div class="form-group">
                            <label for="current-password">Текущий пароль</label>
                            <input type="password" id="current-password" required>
                            <button type="button" class="password-toggle">Показать</button>
                        </div>
                        <div class="form-group">
                            <label for="new-password">Новый пароль</label>
                            <input type="password" id="new-password" required>
                            <button type="button" class="password-toggle">Показать</button>
                        </div>
                        <div class="form-group">
                            <label for="repeat-password">Повторите новый пароль</label>
                            <input type="password" id="repeat-password" required>
                            <button type="button" class="password-toggle">Показать</button>
                        </div>
                        <div class="form-actions">
                            <button type="submit" id="save-password-btn" class="btn btn-primary" disabled>Сохранить пароль</button>
                            <button type="button" id="cancel-password-btn" class="btn btn-secondary">Отмена</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>

@endsection

{{-- 4. Подключаем JS-файл, специфичный для этой страницы --}}
@push('scripts')
    <script src="{{ asset('js/user-account.js') }}" defer></script>
@endpush
