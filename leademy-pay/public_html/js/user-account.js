document.addEventListener('DOMContentLoaded', function() {
    
    // --- ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ВКЛАДОК (без изменений) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === button.dataset.tab) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // =========================================================================
    // НОВАЯ ЛОГИКА ДЛЯ УПРАВЛЕНИЯ КАРТОЙ (V4.0)
    // =========================================================================

    const cardsContainer = document.getElementById('cards');

    cardsContainer.addEventListener('click', function(event) {
        const cardItem = event.target.closest('.card-item');
        if (!cardItem) return;

        // --- Логика для кнопки "Показать CVV" ---
        if (event.target.classList.contains('btn-show-cvv')) {
            const cvvDisplay = cardItem.querySelector('.cvv-display');
            const originalText = cvvDisplay.innerText;
            
            // Здесь должен быть fetch-запрос к бэкенду для получения CVV
            // Согласно документации, CVV не хранится и получается по запросу [cite: 37, 52, 53]
            alert('Запрос на получение CVV отправлен...');
            
            // Имитация получения и отображения CVV на 15 секунд
            cvvDisplay.innerText = 'CVV: 123';
            cvvDisplay.style.color = 'var(--color-primary)';
            setTimeout(() => {
                cvvDisplay.innerText = originalText;
                cvvDisplay.style.color = '';
            }, 15000);
        }

        // --- Логика для кнопки "Заморозить" ---
        if (event.target.classList.contains('btn-freeze')) {
            const button = event.target;
            const statusBadge = cardItem.querySelector('.status-badge');
            const isFrozen = button.textContent === 'Разморозить';
            
            if (confirm(`Вы уверены, что хотите ${isFrozen ? 'разморозить' : 'заморозить'} карту?`)) {
                // Имитация запроса на сервер для заморозки/разморозки карты [cite: 47]
                if (isFrozen) {
                    button.textContent = 'Заморозить';
                    statusBadge.textContent = 'Активна';
                    statusBadge.classList.remove('status-blocked');
                    statusBadge.classList.add('status-active');
                } else {
                    button.textContent = 'Разморозить';
                    statusBadge.textContent = 'Заморожена';
                    statusBadge.classList.remove('status-active');
                    statusBadge.classList.add('status-blocked');
                }
            }
        }
    });


    // =========================================================================
    // НОВАЯ ЛОГИКА ДЛЯ СМЕНЫ ПАРОЛЯ (V4.0)
    // =========================================================================

    const passwordForm = document.getElementById('change-password-form');
    if (passwordForm) {
        const currentPassword = document.getElementById('current-password');
        const newPassword = document.getElementById('new-password');
        const repeatPassword = document.getElementById('repeat-password');
        const saveBtn = document.getElementById('save-password-btn');
        const cancelBtn = document.getElementById('cancel-password-btn');
        const toggleButtons = passwordForm.querySelectorAll('.password-toggle');

        // Функция валидации формы
        const validatePasswordForm = () => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{12,}$/;
            const isNewPasswordValid = passwordRegex.test(newPassword.value);
            const passwordsMatch = newPassword.value === repeatPassword.value && newPassword.value !== '';
            
            // Кнопка сохранения активна, только если все условия выполнены [cite: 50]
            if (currentPassword.value && isNewPasswordValid && passwordsMatch) {
                saveBtn.disabled = false;
            } else {
                saveBtn.disabled = true;
            }
        };

        // Переключение видимости пароля [cite: 49]
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.textContent = type === 'password' ? 'Показать' : 'Скрыть';
            });
        });
        
        // Слушатели для валидации в реальном времени
        [currentPassword, newPassword, repeatPassword].forEach(input => {
            input.addEventListener('input', validatePasswordForm);
        });

        // Отмена изменений [cite: 51]
        cancelBtn.addEventListener('click', () => {
            passwordForm.reset();
            validatePasswordForm();
        });

        // Отправка формы
        passwordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Пароль успешно изменен! (Имитация)');
            this.reset();
            validatePasswordForm();
        });
    }
});