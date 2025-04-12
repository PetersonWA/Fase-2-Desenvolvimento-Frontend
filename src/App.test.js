// esse test ta quebrado testes de conectividade com a API realizados com o cypress

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('Testes do App', () => {
  test('exibe a tela inicial com o título Diário de Leitura', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/diário de leitura/i)).toBeInTheDocument();
  });

  test('navega para a página Sobre e exibe o texto explicativo', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const linkSobre = screen.getByText(/sobre/i);
    userEvent.click(linkSobre);

    await waitFor(() => {
      expect(screen.getByText(/crud de um reading jornal/i)).toBeInTheDocument();
    });
  });

  test('renderiza a lista de livros com dados mockados', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, titulo: 'Livro Mockado', autor: 'Autor X', ano: 2024 },
      ],
    });

    render(
      <MemoryRouter initialEntries={['/lista-de-livros']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/livro mockado/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/autor x/i)).toBeInTheDocument();
    });
  });

  test('exibe o formulário de cadastro de livros', () => {
    render(
      <MemoryRouter initialEntries={['/cadastro-de-livros']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/autor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ano/i)).toBeInTheDocument();
  });
});
