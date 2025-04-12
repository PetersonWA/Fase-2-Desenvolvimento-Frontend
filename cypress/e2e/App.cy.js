// App.cy.js


describe('Diário de Leitura - Testes E2E', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('deve exibir o título da página', () => {
      cy.contains('Diário de Leitura').should('be.visible');
    });
  
  });
  describe('testado pagina sobre', () => {
    beforeEach(() => {
      cy.visit('/sobre');
    });
  
    it('deve exibir o conteúdo da pagina sobre', () => {
      cy.contains('Está é uma aplicação para um CRUD de um Reading jornal.').should('be.visible');
    });
  
  });
  
  describe('testado formulario com campos vazios', () => {
  it('não deve permitir envio com campos vazios', () => {
      cy.visit('/');
      cy.contains('Cadastro').click();
  
      // Enviar formulário sem preencher
      cy.get('form').submit();
  
      // Verificar se os campos continuam na tela (formulário não foi fechado)
      cy.get('input[name="title"]').should('exist');
      cy.get('input[name="author"]').should('exist');
  
      // Opcional: verificar mensagens de erro se existirem
      cy.contains('Por favor, preencha todos os campos antes de enviar.').should('exist'); // ou substitua com o texto que você usa
    });
  });
  
  
  describe('Testando o formulário de novo livro', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); // Abre a aplicação
  
      // Aguarda e clica no botão que mostra o formulário
      cy.contains('Cadastro').click(); 
    });
  
    it('preenche e envia o formulário', () => {
      // Agora o formulário deve estar visível
      cy.get('input[name="title"]').type('O Pequeno Príncipe');
      cy.get('input[name="author"]').type('Antoine de Saint-Exupéry');
      cy.get('input[name="genre"]').type('Infantil');
      cy.get('input[name="readAt"]').type('2024-04-11'); // Formato YYYY-MM-DD');
  
      // Envia o formulário
      cy.get('form').submit();
  
      // Verifica se o livro apareceu na lista
      cy.visit('http://localhost:3000/lista-de-livros');
      cy.contains('O Pequeno Príncipe').should('exist');
    });
  });
  
  
  describe('Testando a edição de um livro', () => {
    beforeEach(() => {
      cy.visit('/lista-de-livros');
    });
  
    it('edita um livro existente', () => {
      cy.contains('O Pequeno Príncipe').should('exist');
  
      // Clica no botão de editar com aria-label
      cy.contains('O Pequeno Príncipe')
        .parent()
        .find('button[aria-label ^="editar livro"]')
        .click();
  
      // Altera o título
      cy.get('input[name="title"]').clear().type('O Pequeno Príncipe Editado');
  
      // Clica no botão de salvar (ícone do GiConfirmed)
      cy.get('button[aria-label ^="salvar livro"]').click();
  
      // Verifica se novo nome aparece
      cy.contains('O Pequeno Príncipe Editado').should('exist');
      //cy.contains('O Pequeno Príncipe').should('not.exist');
    });
  });
  
  describe('Cancelar a edição de um livro', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.contains('Cadastro').click();
  
      // Cria um livro
      cy.get('input[name="title"]').type('Livro Cancelado');
      cy.get('input[name="author"]').type('Autor Original');
      cy.get('input[name="genre"]').type('Gênero Original');
      cy.get('input[name="readAt"]').type('2024-04-10');
      cy.get('form').submit();
  
      cy.visit('/lista-de-livros');
    });
  
    it('não deve salvar alterações se a edição for cancelada', () => {
      // Clica para editar
      cy.get('[aria-label ^="editar livro"]').first().click();
  
      // Altera os campos
      cy.get('input[name="title"]').clear().type('Título Editado');
      cy.get('input[name="author"]').clear().type('Autor Editado');
  
      // Clica no botão de cancelar
      cy.get('button[aria-label ^="cancelar edição"]').click(); // se você adicionou esse aria-label
  
      // Verifica que os dados **originais** ainda estão lá
      cy.contains('Livro Cancelado').should('exist');
      cy.contains('Autor Original').should('exist');
      cy.contains('Título Editado').should('not.exist');
      cy.contains('Autor Editado').should('not.exist');
    });
  });
  
  describe('Cancelar a exclusão de um livro', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.contains('Cadastro').click();
  
      // Cria um livro específico pra esse teste
      cy.get('input[name="title"]').type('Livro a Manter');
      cy.get('input[name="author"]').type('Autor Permanente');
      cy.get('input[name="genre"]').type('Teste');
      cy.get('input[name="readAt"]').type('2024-04-11');
      cy.get('form').submit();
  
      cy.visit('/lista-de-livros');
    });
  
    it('não deve excluir o livro se o usuário cancelar na confirmação', () => {
      // Espiona o window.confirm e força a resposta como false
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(false);
      });
  
      // Clica no botão de excluir
      
      cy.get('button[aria-label ^="excluir livro "]').first().click();
  
      // Verifica se o livro ainda está visível
      cy.contains('Livro a Manter').should('exist');
      cy.contains('Autor Permanente').should('exist');
    });
  });
  
  
  
  describe('Testando a exclusão de um livro', () => {
    beforeEach(() => {
      cy.visit('/lista-de-livros');
    });
  
    it('exclui um livro da lista', () => {
      cy.contains('O Pequeno Príncipe Editado').should('exist');
  
      // Clica no botão com aria-label correspondente
      cy.contains('O Pequeno Príncipe Editado')
        .parent()
        .find('button[aria-label ^="excluir livro "]')
        .click();
  
      // Confirma o alert de confirmação
      cy.on('window:confirm', () => true); // Aceita a confirmação
  
      // Verifica se sumiu da lista
      cy.contains('O Pequeno Príncipe Editado').should('not.exist');
    });
  });
  
  