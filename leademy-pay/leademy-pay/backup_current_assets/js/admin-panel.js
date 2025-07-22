/**
 * admin-panel.js v4.0
 * Скрипт для интерактивной обработки заявок оператором.
 */
document.addEventListener('DOMContentLoaded', function() {

    // =========================================================================
    // ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И ЭЛЕМЕНТЫ DOM
    // =========================================================================
    const modal = document.getElementById('processing-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const requestsTableBody = document.querySelector('#requests-table tbody');
    const processForm = document.getElementById('process-request-form');
    const confirmBtn = document.getElementById('confirm-processing-btn');
    const formInputs = processForm.querySelectorAll('input');
    
    let countdownInterval; // Переменная для хранения интервала таймера

    // =========================================================================
    // ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ВКЛАДОК
    // =========================================================================
    // (Код для табов остается прежним, здесь для краткости опущен)
    // ...

    // =========================================================================
    // ЛОГИКА МОДАЛЬНОГО ОКНА И ОБРАБОТКИ ЗАЯВОК
    // =========================================================================
    
    /**
     * Запускает таймер обратного отсчета.
     * @param {number} duration - Длительность в секундах.
     * @param {HTMLElement} display - Элемент для отображения таймера.
     */
    function startCountdown(duration, display) {
        let timer = duration, minutes, seconds;
        
        // Очищаем предыдущий таймер, если он был
        clearInterval(countdownInterval);

        countdownInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(countdownInterval);
                display.textContent = "Время вышло!";
                // Можно добавить логику авто-закрытия или блокировки формы
            }
        }, 1000);
    }

    /**
     * Проверяет валидность формы для активации кнопки подтверждения.
     */
    function checkFormValidity() {
        const cardNumber = document.getElementById('card-number').value;
        const cardCvv = document.getElementById('card-cvv').value;
        const limitSet = document.getElementById('limit-set').checked;
        const expirySet = document.getElementById('expiry-set').checked;

        if (cardNumber && cardCvv && limitSet && expirySet) {
            confirmBtn.disabled = false;
        } else {
            confirmBtn.disabled = true;
        }
    }

    /**
     * Открывает и настраивает модальное окно для обработки заявки.
     * @param {object} request - Объект заявки.
     */
    function openProcessingModal(request) {
        // Заполняем данные в модальном окне
        document.getElementById('modal-title').innerText = `Обработка заявки №${request.id}`;
        document.getElementById('client-email').innerText = request.email;
        document.getElementById('client-telegram').innerText = request.telegram || 'Не указан';
        
        processForm.dataset.requestId = request.id; // Сохраняем ID заявки в форме
        processForm.reset(); // Сбрасываем форму
        confirmBtn.disabled = true; // Блокируем кнопку

        modal.classList.add('visible');

        // Запускаем 5-минутный таймер в соответствии с документацией v4.0 
        const fiveMinutes = 60 * 5;
        const display = document.getElementById('timer');
        startCountdown(fiveMinutes, display);
    }
    
    // Закрытие модального окна
    closeModalBtn.addEventListener('click', () => modal.classList.remove('visible'));
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('visible');
        }
    });

    // =========================================================================
    // ЗАГРУЗКА ДАННЫХ И СОБЫТИЯ
    // =========================================================================

    /**
     * Загружает и отображает заявки.
     */
    async function loadAndRenderRequests() {
        // Mock-данные, имитирующие ответ сервера
        const mockRequests = [
            { id: 105, type: 'Новая карта', email: 'new.user@example.com', telegram: '@newuser', status: 'Новая', date: new Date() },
            { id: 104, type: 'Пролонгация', email: 'ivan.p@example.com', status: 'Новая', date: new Date() }
        ];
        
        requestsTableBody.innerHTML = '';
        mockRequests.forEach(req => {
            const row = `
                <tr>
                    <td>${req.id}</td>
                    <td>${req.type}</td>
                    <td>${req.email}</td>
                    <td>${req.status}</td>
                    <td>${req.date.toLocaleString()}</td>
                    <td><button class="btn btn-primary btn-open-request" data-request-id="${req.id}">Открыть</button></td>
                </tr>
            `;
            requestsTableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Делегирование событий для кнопки "Открыть" в таблице заявок
    requestsTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-open-request')) {
            const requestId = event.target.dataset.requestId;
            // Здесь должен быть fetch для получения деталей конкретной заявки
            // fetch(`/api/v2/requests/${requestId}`).then(...)
            const mockRequestDetails = { id: requestId, email: 'new.user@example.com', telegram: '@newuser' };
            openProcessingModal(mockRequestDetails);
        }
    });

    // Слушатель событий для валидации формы в реальном времени
    processForm.addEventListener('input', checkFormValidity);

    // Обработка отправки формы
    processForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const requestId = this.dataset.requestId;
        
        const formData = {
            card_number: document.getElementById('card-number').value,
            card_cvv: document.getElementById('card-cvv').value,
        };

        confirmBtn.disabled = true;
        confirmBtn.innerText = 'Обработка...';

        try {
            // Отправка данных на сервер согласно документации v4.0 
            const response = await fetch(`/api/v2/requests/${requestId}/process`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Ошибка сервера');

            alert(`Заявка №${requestId} успешно обработана!`);
            modal.classList.remove('visible');
            loadAndRenderRequests(); // Обновляем список заявок

        } catch (error) {
            alert(`Произошла ошибка: ${error.message}`);
        } finally {
            confirmBtn.disabled = false;
            confirmBtn.innerText = 'Подтвердить';
        }
    });

    // Инициализация при загрузке страницы
    loadAndRenderRequests();
});