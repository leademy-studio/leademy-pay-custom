<!DOCTYPE html>
<html lang="ru">
<head>
    <link rel="stylesheet" href="{{ 'assets/css/index.css'|theme }}">
</head>
<body>
<header class="combine-nav2_component">
    <div class="navbar-container">
        <div class="navbar__wrap">
            <div class="header-left-part">
                <a href="/" aria-current="page" class="navbar-logo-link">
                    <img alt="Логотип" src="{{ 'assets/img/logo.svg'|theme }}" loading="lazy" class="navbar-logo">
                </a>
                <nav class="header-links">
                    <a href="#" class="header-link">Пополнить карту</a>
                    <a href="#" class="header-link">Правовая информация</a>
                </nav>
            </div>

            <div class="navbar-button-wrapper">
                <a href="#" class="header-btn">Связаться с нами</a>
                <a href="#" class="avatar-button">
                    <img src="{{ 'assets/img/ava.svg'|theme }}" alt="Avatar" class="avatar-image">
                </a>
                <div class="navbar-menu-icon">
                    <div class="menu-icon">
                        <div class="menu-icon-top"></div>
                        <div class="menu-icon-center"></div>
                        <div class="menu-icon-bottom"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="navbar-container-blur"></div>
        <nav class="mobile-nav-menu">
            <a href="#" class="header-link">Пополнить карту</a>
            <a href="#" class="header-link">Правовая информация</a>
            <a href="#" class="header-btn mobile-menu-btn">Связаться с нами</a>
        </nav>
    </div>
</header>
</body>
</html>