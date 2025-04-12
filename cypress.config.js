const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false, // se não for usar o suporte global
  },
});
// Para rodar os testes, use o comando: npx cypress open