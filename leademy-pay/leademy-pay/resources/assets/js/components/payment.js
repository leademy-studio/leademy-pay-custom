document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // ЧАСТЬ 1: ИНИЦИАЛИЗАЦИЯ И УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ
    // =========================================================================

    const modal = document.getElementById('payment-modal');
    const closeBtn = document.querySelector('.close-modal');
    const payButton = document.querySelector('.btn-primary:not(.modal-pay-btn)');
    const paymentForm = document.getElementById('payment-form');

    if (!modal || !closeBtn || !payButton || !paymentForm) {
        console.error("Ключевые элементы модального окна не найдены.");
        return;
    }

    const formatNumber = (num) => num.toLocaleString('ru-RU', { maximumFractionDigits: 2 });

    const openPaymentModal = () => {
        const usdValue = parseFloat(document.getElementById('usd-input').value.replace(/\s/g, '').replace(',', '.')) || 0;
        const rubValue = parseFloat(document.getElementById('rub-input').value.replace(/\s/g, '').replace(',', '.')) || 0;
        const feeValue = parseFloat(document.getElementById('duration-select').value);
        const totalValue = rubValue + feeValue;

        const errorMessageDiv = document.getElementById('error-message');
        if (totalValue < 1) {
            if(errorMessageDiv) errorMessageDiv.textContent = 'Минимальная сумма к оплате - 1 рубль';
            return;
        }
        if(errorMessageDiv) errorMessageDiv.textContent = '';

        document.getElementById('modal-balance').textContent = `${formatNumber(usdValue)} USD`;
        document.getElementById('modal-fee').textContent = `${formatNumber(feeValue)} RUB`;
        document.getElementById('modal-total').textContent = `${formatNumber(totalValue)} RUB`;

        modal.style.display = 'flex';
    };

    payButton.addEventListener('click', openPaymentModal);
    if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');


    // =========================================================================
    // ОСНОВНАЯ ЛОГИКА: ОБРАБОТКА ОТПРАВКИ ФОРМЫ (ИЗ ОБНОВЛЕННОЙ ВЕРСИИ)
    // =========================================================================

    paymentForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitButton = paymentForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Проверка данных...';

        const customerEmail = document.getElementById('customer-email').value.trim();
        if (!customerEmail) {
            alert('Пожалуйста, введите ваш Email.');
            submitButton.disabled = false;
            submitButton.textContent = 'Оплатить';
            return;
        }

        try {
            // ШАГ 1: Проверяем, существует ли пользователь
            const userCheckResponse = await fetch('/api/v2/user/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ email: customerEmail })
            });
            if (!userCheckResponse.ok) throw new Error('Ошибка проверки пользователя.');
            const userData = await userCheckResponse.json();

            // ШАГ 2: Определяем 'action' в зависимости от сценария
            let action = '';
            const durationSelect = document.getElementById('duration-select');
            const selectedOption = durationSelect.options[durationSelect.selectedIndex];
            const termInMonths = selectedOption.text.includes('1 мес') ? 1 : (selectedOption.text.includes('6 мес') ? 6 : 12);

            if (!userData.exists) {
                action = 'create_new'; // Сценарий A
            } else {
                action = (termInMonths === 1) ? 'top_up' : 'prolong'; // Сценарий B1 или B2
            }

            submitButton.textContent = 'Переходим к оплате...';

            // ШАГ 3: Собираем все данные и инициируем платеж
            const requestData = {
                action: action,
                firstName: document.getElementById('customer-name').value.trim(),
                lastName: document.getElementById('customer-surname').value.trim(),
                email: customerEmail,
                telegram: document.getElementById('customer-telegram').value.trim(),
                // ВАЖНО: Убедитесь, что в HTML есть поле с id="customer-phone" для работы маски
                phone: document.getElementById('customer-phone') ? document.getElementById('customer-phone').value.trim() : '',
                amountUSD: parseFloat(document.getElementById('modal-balance').textContent.replace(/[^\d.,]/g, '').replace(',', '.')) || 0,
                amountRUB: parseFloat(document.getElementById('modal-total').textContent.replace(/[^\d.,]/g, '').replace(',', '.')) || 0,
                term: selectedOption.text,
            };

            const response = await fetch('/api/v2/payment/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || 'Не удалось инициализировать платеж.');
            }

            const result = await response.json();

            // ШАГ 4: Перенаправляем пользователя на страницу оплаты
            if (result.paymentUrl) {
                window.location.href = result.paymentUrl;
            } else {
                throw new Error('Не удалось получить ссылку на оплату.');
            }

        } catch (error) {
            console.error('Ошибка при обработке платежа:', error);
            alert('Произошла ошибка: ' + error.message);
            submitButton.disabled = false;
            submitButton.textContent = 'Оплатить';
        }
    });


    // =========================================================================
    // ЧАСТЬ 2: ВСПОМОГАТЕЛЬНЫЕ СКРИПТЫ ДЛЯ ПОЛЕЙ ВВОДА
    // =========================================================================

    // --- Маска для ввода номера телефона ---
    // ВАЖНО: Убедитесь, что в HTML есть поле <input id="customer-phone">
    const phoneInput = document.getElementById('customer-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('7') || value.startsWith('8')) {
                value = '7' + value.substring(1);
            }
            let formattedValue = '';
            if (value.length > 0) formattedValue = '+' + value.substring(0, 1);
            if (value.length > 1) formattedValue += ' (' + value.substring(1, 4);
            if (value.length > 4) formattedValue += ') ' + value.substring(4, 7);
            if (value.length > 7) formattedValue += ' ' + value.substring(7, 9);
            if (value.length > 9) formattedValue += ' ' + value.substring(9, 11);
            e.target.value = formattedValue;
        });
    }

    // --- Подсказки для ввода Email ---
    const emailInput = document.getElementById('customer-email');
    const emailDomains = ['gmail.com', 'yandex.ru', 'mail.ru', 'vk.com', 'icloud.com'];
    let suggestionsContainer = null;
    let selectedIndex = -1;
    let suggestionItems = [];

    if (emailInput) {
        const showEmailSuggestions = (inputElement, domains) => {
            const value = inputElement.value;
            const atIndex = value.indexOf('@');
            const username = value.substring(0, atIndex);
            const currentDomain = value.substring(atIndex + 1);

            const filteredDomains = domains.filter(d => d.startsWith(currentDomain));

            if (suggestionsContainer) suggestionsContainer.remove();
            if (filteredDomains.length === 0) return;

            suggestionsContainer = document.createElement('div');
            suggestionsContainer.className = 'email-suggestions';
            const rect = inputElement.getBoundingClientRect();
            Object.assign(suggestionsContainer.style, {
                position: 'absolute',
                top: (rect.bottom + window.scrollY) + 'px',
                left: rect.left + 'px',
                width: rect.width + 'px',
                maxHeight: '150px',
                overflowY: 'auto',
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                zIndex: '2100'
            });

            suggestionItems = [];
            filteredDomains.forEach(domain => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.style.padding = '8px 12px';
                item.style.cursor = 'pointer';
                item.textContent = domain;
                item.addEventListener('click', () => {
                    inputElement.value = username + '@' + domain;
                    if (suggestionsContainer) suggestionsContainer.remove();
                });
                suggestionsContainer.appendChild(item);
                suggestionItems.push(item);
            });

            document.body.appendChild(suggestionsContainer);
            selectedIndex = -1;
        };

        const updateSelection = () => {
            suggestionItems.forEach((item, index) => {
                item.style.backgroundColor = (index === selectedIndex) ? '#f0f0f0' : 'white';
            });
        };

        emailInput.addEventListener('input', () => {
            if (emailInput.value.includes('@')) {
                showEmailSuggestions(emailInput, emailDomains);
            } else {
                if (suggestionsContainer) suggestionsContainer.remove();
            }
        });

        emailInput.addEventListener('keydown', (e) => {
            if (!suggestionsContainer) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = (selectedIndex < suggestionItems.length - 1) ? selectedIndex + 1 : 0;
                updateSelection();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = (selectedIndex > 0) ? selectedIndex - 1 : suggestionItems.length - 1;
                updateSelection();
            } else if (e.key === 'Enter' && selectedIndex > -1) {
                e.preventDefault();
                suggestionItems[selectedIndex].click();
            } else if (e.key === 'Escape') {
                if (suggestionsContainer) suggestionsContainer.remove();
            }
        });

        document.addEventListener('click', (e) => {
            if (suggestionsContainer && !suggestionsContainer.contains(e.target) && e.target !== emailInput) {
                suggestionsContainer.remove();
            }
        });
    }
});
