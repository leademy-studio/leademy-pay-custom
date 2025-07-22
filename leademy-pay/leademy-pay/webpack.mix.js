const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management - Leademy Pay
 |--------------------------------------------------------------------------
 */

// Основное приложение
mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

// Копируем статические ресурсы
mix.copyDirectory('resources/assets/images', 'public/img')
   .copyDirectory('resources/assets/fonts', 'public/fonts');

// Дополнительные файлы для админки (если нужно отдельно)
if (mix.inProduction()) {
    mix.version(); // Добавляет хеши для кеширования
}
