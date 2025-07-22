{{-- 1. Указываем, что эта страница "наследует" главный мастер-шаблон --}}
@extends('layouts.app')

{{-- 2. Задаем уникальный заголовок для этой страницы (будет вставлен в @yield('title')) --}}
@section('title', 'Оплата зарубежных сервисов')

{{-- 3. Определяем секцию 'content', которая будет вставлена в @yield('content') в мастер-шаблоне --}}
@section('content')

    {{-- Здесь ТОЛЬКО уникальный HTML-код для главной страницы --}}
    <div class="container">
        <div class="content-wrapper">
            <div class="text-content">
                <h1 class="gradient-text">Оплата зарубежных сервисов с помощью вашей виртуальной карты</h1>
                <p>Выпуск prepaid-карты с любым номиналом за 5 минут <br>с поддержкой Apple Pay и Google Pay</p>
            </div>

            <div id="calculator" class="calculator">
                <h2>Выберите номинал</h2>
                <div class="inputs-wrapper">
                    <div class="input-group">
                        <label class="gradient-text">отдаете</label>
                        <div class="input-field-wrapper">
                            <input type="text" id="rub-input" placeholder="0">
                            <span>RUB</span>
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="gradient-text">получаете</label>
                        <div class="input-field-wrapper">
                            <input type="text" id="usd-input" placeholder="0">
                            <span>USD</span>
                        </div>
                    </div>
                    <button class="swap-icon">
                        {{-- Путь к изображению теперь нужно указывать через хелпер asset() --}}
                        <img src="{{ asset('img/swap-icon.svg') }}" width="24" height="24" alt="Swap">
                    </button>
                </div>

                <div class="preset-amounts" id="preset-amounts">
                    <button class="preset-btn" data-value="10">10 USD</button>
                    <button class="preset-btn" data-value="25">25 USD</button>
                    <button class="preset-btn" data-value="50">50 USD</button>
                    <button class="preset-btn" data-value="100">100 USD</button>
                    <button class="preset-btn" data-value="500">500 USD</button>
                </div>

                <div class="duration-select-wrapper">
                    <select id="duration-select">
                        <option value="0" data-hint="бесплатно">Срок действия карты: 1 мес</option>
                        <option value="1800" data-hint="+ 1 800 RUB">Срок действия карты: 6 мес</option>
                        <option value="3400" data-hint="+ 3 400 RUB">Срок действия карты: 12 мес</option>
                    </select>
                    <span id="price-hint" class="price-hint"></span>
                </div>

                <div class="summary">
                    <div class="summary-row">
                        <span>Баланс карты</span>
                        <span id="summary-balance">0.00 USD</span>
                    </div>
                    <div class="summary-row">
                        <span>Обслуживание карты</span>
                        <span id="summary-fee">0.00 RUB</span>
                    </div>
                    <div class="summary-row total-row">
                        <span>Итого к оплате</span>
                        <span id="summary-total">0.00 RUB</span>
                    </div>
                </div>

                <div class="buttons-wrapper">
                    <button class="btn btn-secondary">
                        <span class="gradient-text">Безналичный <br> платеж</span>
                    </button>
                    <button class="btn btn-primary">К оплате</button>
                </div>
                 <div id="error-message" class="error-message"></div>
            </div>
        </div>
    </div>

@endsection
