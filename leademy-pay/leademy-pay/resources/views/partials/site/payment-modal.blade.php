<div class="payment-modal" id="payment-modal">
    <div class="payment-modal-content">
        <span class="close-modal">&times;</span>
        <h3>Оформление заказа</h3>
        
        <form id="payment-form">
            <div class="form-group">
                <label for="customer-name">Имя</label>
                <input type="text" id="customer-name" class="form-control" required>
            </div>
            
            <div class="form-group">
                <label for="customer-surname">Фамилия</label>
                <input type="text" id="customer-surname" class="form-control" required>
            </div>
            
            <div class="form-group">
                <label for="customer-email">Email</label>
                <input type="email" id="customer-email" class="form-control" required>
            </div>
            
            <div class="form-group">
                <label for="customer-telegram">Аккаунт телеграм</label>
                <input type="text" id="customer-telegram" class="form-control" placeholder="@username">
            </div>
            
            <div class="payment-summary">
                <div class="summary-line">
                    <span>Баланс карты:</span>
                    <span id="modal-balance"></span>
                </div>
                <div class="summary-line">
                    <span>Обслуживание карты:</span>
                    <span id="modal-fee"></span>
                </div>
                <div class="summary-line total">
                    <span>Итого к оплате:</span>
                    <span id="modal-total"></span>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-primary modal-pay-btn">Оплатить</button>
            </div>
        </form>
    </div>
</div>