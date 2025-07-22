<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Панель оператора - Leademy Pay</title>
    <link rel="stylesheet" href="/assets/css/index.css">
    <link rel="stylesheet" href="/assets/css/admin.css">
    <script src="/assets/js/admin-panel.js" defer></script>
</head>
<body>

    <header class="admin-header">
        <h1>Панель оператора v4.0</h1>
        <a href="#">Выход</a>
    </header>
    <main class="main-section" style="padding: 30px;">
        <div class="container">
            <div class="tab-navigation">
                <button class="tab-button active" data-tab="requests-tab">Панель Заявок</button>
                <button class="tab-button" data-tab="clients-tab">Клиенты</button>
                <button class="tab-button" data-tab="cards-tab">Карты</button>
            </div>

            <div class="tab-content">

                <div id="requests-tab" class="tab-pane active">
                    <div class="pane-content-wrapper">
                        <h2>Очередь заявок на обработку</h2>
                        <table class="admin-table" id="requests-table">
                            <thead>
                                <tr>
                                    <th>ID Заявки</th>
                                    <th>Тип</th>
                                    <th>Email клиента</th>
                                    <th>Статус</th>
                                    <th>Дата</th>
                                    <th>Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                </tbody>
                        </table>
                    </div>
                </div>
                
                <div id="clients-tab" class="tab-pane">
                     <div class="pane-content-wrapper">
                        <h2>Список клиентов</h2>
                        <table class="admin-table" id="clients-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Имя</th>
                                    <th>Email</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                
                <div id="cards-tab" class="tab-pane">
                    <div class="pane-content-wrapper">
                        <h2>Список карт</h2>
                         <table class="admin-table" id="cards-table">
                            <thead>
                                <tr>
                                    <th>ID Карты</th>
                                    <th>ID Клиента</th>
                                    <th>Номер карты</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <div class="modal-overlay" id="processing-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Обработка заявки</h2>
                <button class="close-modal" id="close-modal-btn">&times;</button>
            </div>
            
            <div id="modal-body">
                <div class="timer-display" id="timer">05:00</div>
                
                <form class="processing-form" id="process-request-form">
                    <p><strong>Клиент:</strong> <span id="client-email"></span></p>
                    <p><strong>Telegram:</strong> <span id="client-telegram"></span></p>

                    <div class="form-group">
                        <label for="card-number">Номер карты</label>
                        <input type="text" id="card-number" name="card_number" required>
                    </div>
                    <div class="form-group">
                        <label for="card-cvv">CVV</label>
                        <input type="text" id="card-cvv" name="card_cvv" required>
                    </div>

                    <div class="checkbox-group">
                        <input type="checkbox" id="limit-set" name="limit_set" required>
                        <label for="limit-set">Выставлен ли лимит расходов по карте?</label>
                    </div>
                     <div class="checkbox-group">
                        <input type="checkbox" id="expiry-set" name="expiry_set" required>
                        <label for="expiry-set">Выставлен ли срок действия карты?</label>
                    </div>

                    <div class="modal-footer">
                         <button type="submit" class="btn btn-primary" id="confirm-processing-btn" disabled>Подтвердить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>