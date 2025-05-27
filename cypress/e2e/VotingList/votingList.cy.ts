describe('проверяем доступность приложения', function() {
    it('сервис должен быть доступен по адресу localhost:8080', function() {
        cy.visit('http://localhost:8080'); 
    });
});