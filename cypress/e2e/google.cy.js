describe('Teste na página do Google', () => {
  Cypress.on('uncaught:exception', () => false); // Opcional: Ignorar erros não tratados

  beforeEach(function () {
    // interpretar todas as requisições e remove os logs
    cy.intercept('GET', '**/*', { log: false });
    cy.intercept('POST', '**/*', { log: false });
    cy.intercept('PUT', '**/*', { log: false });
    cy.intercept('DELETE', '**/*', { log: false });
  })



  it('Deve carregar a página inicial do Google', () => {
    // Visitar o Google
    cy.visitGoogle(); // Aqui o endereço completo esta na nossa configuração BaseUrl no config.

    // Verificar se o título da página é correto
    cy.title().should('include', 'Google');
    // Verificar se o logo está visível
    cy.get('#hplogo').should('be.visible');
  });

  it('Deve exibir a barra de pesquisa', function () {
    cy.visitGoogle();
    // Verificar se o campo de busca está visível
    cy.get('.gLFyf').should('be.visible');
  });

  it('Deve verificar se o dropdown aplique sugestões', function () {
    cy.visitGoogle();
    cy.get('.gLFyf') // Campo de pesquisa
      .type('Cypress');

    // Verifica se o dropdown de sugestões está visível
    cy.get('.erkvQe').should('be.visible');

    // Valida se alguma sugestão contém a palava "Cypress"
    cy.get('.erkvQe li span').should('contain', 'Cypress');
  });

  it('Deve acessar a página do Google Imagens', function () {
    cy.visitGoogle();
    // Clica no link "Imagens" no canto superior direito
    cy.contains('Imagens').click();
    // Verifica o título da página
    cy.title().should('include', 'Imagens');
    // Valida se a barra de pesquisa está visível
    cy.get('.gLFyf').should('be.visible');
  });

  it('Deve exibir os botões de pesquisa na barra principal de pesquisa do Google', function () {
    cy.visitGoogle();
    // Verifica se o botão do microfone está visível
    cy.get('.goxjub').should('be.visible')
    // Verifica se o botão do teclado "Inserção de Texto" está visível
    cy.get('.ly0Ckb').should('be.visible')
    // Verifica se o botão de camera "Pesquisa por imagem" está visível
    cy.get('.Gdd5U').should('be.visible')
  });

  it('Deve exibir os botões de "Pesquisa Google" & "Estou com sorte"', function () {
    cy.visitGoogle();
    cy.get('.gNO89b').should('be.visible');
    cy.get('.RNmpXc').should('be.visible');
  });

  it('Deve ser possível verificar os links do rodapé', function () {
    cy.visitGoogle();
    // Verificar os links que aparecem em baixo da página "Parte inferior" realmente funcionam
    cy.contains('Sobre').should('have.attr', 'href');
    cy.contains('Publicidade').should('have.attr', 'href');
    cy.contains('Negócios').should('have.attr', 'href');
    cy.contains('Como funciona a Pesquisa').should('have.attr', 'href');
    cy.contains('Privacidade').should('have.attr', 'href');
    cy.contains('Termos').should('have.attr', 'href');
    // Apenas o campo configuração não é um link
    cy.get('.ayzqOc').should('be.visible');
  });

  it('Deve ser possível acessar a página de configurações', function () {
    cy.visitGoogle();
    // Acessa o menu de configuração e válidar todos os botôes da página
    cy.contains('Configurações').click();
    cy.contains('Configurações de Pesquisa').click({ force: true });
    cy.contains('Fazer login').should('have.attr', 'href');
    cy.get('.sjVJQd').should('be.visible');
    cy.get('.lnnMGf').should('be.visible');
    cy.get('.fftALe').should('be.visible');
    cy.get('.YpcDnf').should('be.visible');
    cy.get('.OPuSkc').should('be.visible');
    cy.get('.pkgtHd').should('be.visible');
    cy.get('.DkFjre').should('be.visible');
    cy.get('.Oar8Pc').should('be.visible');
  });

  it('Deve verificar o funcionamento em diferentes resoluções de tela "Responsividade"', function () {
    const viewports = [[1280, 720], [768, 1024], [375, 667]]

    viewports.forEach(function (viewport) {
      cy.viewport(viewport[0], viewport[1]);
      cy.visitGoogle();
      cy.get('.gLFyf').should('be.visible'); // Verifica se a barra de pesquisa aparece
    });
  });

  it('Deve ser possível limpar o campo de pesquisa', function () {
    cy.visitGoogle();
    // Digitar algo no campo de pesquisa
    cy.get('.gLFyf').type('Eu vou escrever alguma coisa aqui apenas pra eu APAGAR!');

    // Limpa o campo de pesquisa
    cy.get('.gLFyf').clear()

    // Valida que o campo está vazio
    cy.get('.gLFyf').should('have.value', '');
  });
});