document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // ЛОГИКА КАЛЬКУЛЯТОРА
    // =========================================================================
    const calculatorForm = document.getElementById('calculator');
    if (calculatorForm) {
        const rubInput = document.getElementById('rub-input');
        const usdInput = document.getElementById('usd-input');
        const presetButtonsContainer = document.getElementById('preset-amounts');
        const durationSelect = document.getElementById('duration-select');
        const summaryBalance = document.getElementById('summary-balance');
        const summaryFee = document.getElementById('summary-fee');
        const summaryTotal = document.getElementById('summary-total');
        const errorMessage = document.getElementById('error-message');
        const priceHint = document.getElementById('price-hint');

        const COMMISSION = 14; // Комиссия в рублях
        let currencyRate = null;
        let isRubInputActive = true;
        let rateLastUpdated = 0;
        const RATE_UPDATE_INTERVAL = 3600000; // 1 час

        const fetchCurrencyRate = async () => {
            const now = Date.now();
            if (currencyRate && (now - rateLastUpdated) < RATE_UPDATE_INTERVAL) {
                return currencyRate;
            }
            disableForm(true, 'Загрузка курса...');
            try {
                const response = await fetch('/api/currency-rate');
                if (!response.ok) throw new Error('Ошибка получения данных от сервера');
                const data = await response.json();
                if (!data.rate || isNaN(data.rate)) throw new Error('Некорректный формат курса');
                currencyRate = parseFloat(data.rate);
                rateLastUpdated = now;
                return currencyRate;
            } catch (error) {
                console.error('Ошибка при получении курса валют:', error);
                currencyRate = 91.50; // Запасной курс
                return currencyRate;
            } finally {
                disableForm(false);
            }
        };

        const formatNumber = (num) => num.toLocaleString('ru-RU', { maximumFractionDigits: 2 });
        const parseFormattedNumber = (str) => parseFloat(str.replace(/\s/g, '').replace(',', '.')) || 0;

        const updateCalculations = () => {
            if (!currencyRate) return;
            const rubValue = parseFormattedNumber(rubInput.value);
            const usdValue = parseFormattedNumber(usdInput.value);

            if (isRubInputActive) {
                usdInput.value = formatNumber(rubValue / (currencyRate + COMMISSION));
            } else {
                rubInput.value = formatNumber(usdValue * (currencyRate + COMMISSION));
            }
            updateSummary();
        };
        
        const updateSummary = () => {
            const usdValue = parseFormattedNumber(usdInput.value);
            const rubValue = parseFormattedNumber(rubInput.value);
            const feeValue = parseFloat(durationSelect.value);
            summaryBalance.textContent = `${formatNumber(usdValue)} USD`;
            summaryFee.textContent = `${formatNumber(feeValue)} RUB`;
            summaryTotal.textContent = `${formatNumber(rubValue + feeValue)} RUB`;
        };

        const disableForm = (disabled, message = '') => {
            const inputs = calculatorForm.querySelectorAll('input, select, button');
            inputs.forEach(input => input.disabled = disabled);
            if (errorMessage) errorMessage.textContent = message;
        };

        function updatePriceHint() {
            const selectedOption = durationSelect.options[durationSelect.selectedIndex];
            if (priceHint) priceHint.textContent = selectedOption.dataset.hint || '';
        }

        rubInput.addEventListener('focus', () => isRubInputActive = true);
        usdInput.addEventListener('focus', () => isRubInputActive = false);

        rubInput.addEventListener('input', () => {
            isRubInputActive = true;
            rubInput.value = rubInput.value.replace(/[^0-9.,\s]/g, '');
            updateCalculations();
        });

        usdInput.addEventListener('input', () => {
            isRubInputActive = false;
            usdInput.value = usdInput.value.replace(/[^0-9.,\s]/g, '');
            updateCalculations();
        });

        presetButtonsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('preset-btn')) {
                presetButtonsContainer.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                usdInput.value = e.target.dataset.value;
                isRubInputActive = false;
                updateCalculations();
            }
        });

        durationSelect.addEventListener('change', () => {
            updatePriceHint();
            updateSummary();
        });

        fetchCurrencyRate().then(rate => {
            currencyRate = rate;
            disableForm(false);
        }).catch(error => {
            disableForm(true, error.message);
        });

        updatePriceHint();
    }

    // =========================================================================
    // ЛОГИКА МОБИЛЬНОЙ НАВИГАЦИИ (HEADER)
    // =========================================================================
    const menuButton = document.querySelector('.navbar-menu-icon');
    const mobileMenu = document.querySelector('.mobile-nav-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            this.classList.toggle('w--open');
            mobileMenu.classList.toggle('is--open');
        });
    }

    // =========================================================================
    // ЛОГИКА АВТОРИЗАЦИИ
    // =========================================================================
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const loginBtn = document.getElementById('login-btn');
        const recoverBtn = document.getElementById('recover-btn');
        const forgotPasswordLink = document.getElementById('forgot-password-link');
        const notificationModal = document.getElementById('notification-modal');

        let isRecoveryMode = false;

        const toggleRecoveryMode = () => {
            isRecoveryMode = !isRecoveryMode;

            loginBtn.classList.toggle('hidden', isRecoveryMode);
            recoverBtn.classList.toggle('hidden', !isRecoveryMode);
            passwordInput.disabled = isRecoveryMode;

            if (isRecoveryMode) {
                forgotPasswordLink.textContent = 'Вернуться к входу';
            } else {
                forgotPasswordLink.textContent = 'Забыл пароль';
            }
        };

        const showNotification = () => {
            if (notificationModal) {
                notificationModal.classList.remove('hidden');
                setTimeout(() => {
                    notificationModal.classList.add('hidden');
                }, 3000);
            }
        };

        const generateRandomPassword = (length) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            let password = '';
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        };

        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                toggleRecoveryMode();
            });
        }

        if (recoverBtn) {
            recoverBtn.addEventListener('click', () => {
                if (emailInput.value.trim() === '') {
                    alert('Пожалуйста, введите ваш e-mail для восстановления.');
                    return;
                }
                
                const newPassword = generateRandomPassword(12);
                console.log(`Сгенерирован новый пароль для ${emailInput.value}: ${newPassword}`);
                
                showNotification();
            });
        }

        loginForm.addEventListener('submit', (e) => {
            if (!isRecoveryMode) {
                e.preventDefault();
                const email = emailInput.value;
                const password = passwordInput.value;
                console.log('Попытка входа с данными:', { email, password });
                alert(`Попытка входа для пользователя: ${email}`);
                // Здесь будет ваш AJAX-запрос на сервер
            }
        });
    }
});
