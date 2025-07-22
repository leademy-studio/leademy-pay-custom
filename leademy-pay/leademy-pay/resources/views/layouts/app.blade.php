{{-- 
    Этот файл является главным шаблоном и должен находиться по пути:
    leademy-pay/resources/views/layouts/app.blade.php
--}}

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leademy Pay - @yield('title', 'Главная')</title>

    <!-- Подключаем CSS из папки public_html -->
    <link rel="stylesheet" href="{{ asset('css/index.css') }}">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
</head>
<body>

    {{-- ✅ Вот здесь мы подключаем вашу шапку --}}
    @include('partials.site.header')

    <main class="main-section">
        {{-- Сюда будет вставлен уникальный контент каждой страницы (main, login и т.д.) --}}
        @yield('content')
    </main>

    {{-- ✅ А здесь мы подключаем ваше модальное окно --}}
    @include('partials.site.payment-modal')

    <!-- Подключаем JS из папки public_html -->
    <script src="{{ asset('js/main.js') }}"></script>
    <script src="{{ asset('js/payment.js') }}"></script>
    
    {{-- Место для дополнительных скриптов, если они нужны на отдельных страницах --}}
    @stack('scripts')
</body>
</html>
