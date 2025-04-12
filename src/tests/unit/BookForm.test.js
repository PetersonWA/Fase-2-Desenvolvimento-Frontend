// src/Components/BookForm/BookForm.test.js
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import BookForm from '../../Components/BookForm/BookForm';

test('renderiza o título principal do formulário', () => {
  render(<BookForm onAddBook={() => {}} />); // Passa uma função vazia pra evitar erro com a prop

  // Verifica se o título "Cadastrar" está visível
  const tituloPrincipal = screen.getByText(/cadastrar/i);
  expect(tituloPrincipal).toBeInTheDocument();

  // Verifica se o subtítulo também está na tela
  const subtitulo = screen.getByText(/adicione a leitura realizada/i);
  expect(subtitulo).toBeInTheDocument();
});

test('renderiza todos os campos do formulário', () => {
    render(<BookForm onAddBook={() => {}} />);
  
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/autor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gênero/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lido na data/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar livro/i })).toBeInTheDocument();
});
  
test('exibe erro ao tentar enviar com campos vazios', () => {
    render(<BookForm onAddBook={() => {}} />);
  
    const botao = screen.getByRole('button', { name: /adicionar livro/i });
    fireEvent.click(botao);
  
    expect(screen.getByText(/por favor, preencha todos os campos antes de enviar./i)).toBeInTheDocument();
});

test('exibe mensagem de sucesso ao preencher corretamente', () => {
  render(<BookForm onAddBook={() => {}} />);

  fireEvent.change(screen.getByLabelText(/título/i), {
    target: { value: 'Dom Casmurro' },
  });

  fireEvent.change(screen.getByLabelText(/autor/i), {
    target: { value: 'Machado de Assis' },
  });

  fireEvent.change(screen.getByLabelText(/gênero/i), {
    target: { value: 'Romance' },
  });

  fireEvent.change(screen.getByLabelText(/lido na data/i), {
    target: { value: '2023-10-10' },
  });

  fireEvent.click(screen.getByRole('button', { name: /adicionar livro/i }));

  expect(screen.getByText(/livro adicionado com sucesso/i)).toBeInTheDocument();
});

test('reseta campos após envio com sucesso', () => {
    render(<BookForm onAddBook={() => {}} />);
  
    const tituloInput = screen.getByLabelText(/título/i);
    const autorInput = screen.getByLabelText(/autor/i);
    const generoInput = screen.getByLabelText(/gênero/i);
    const dataInput = screen.getByLabelText(/lido na data/i);
  
    fireEvent.change(tituloInput, { target: { value: '1984' } });
    fireEvent.change(autorInput, { target: { value: 'George Orwell' } });
    fireEvent.change(generoInput, { target: { value: 'Distopia' } });
    fireEvent.change(dataInput, { target: { value: '2022-05-01' } });
  
    fireEvent.click(screen.getByRole('button', { name: /adicionar livro/i }));
  
    // Espera os campos resetarem para string vazia
    expect(tituloInput.value).toBe('');
    expect(autorInput.value).toBe('');
    expect(generoInput.value).toBe('');
    expect(dataInput.value).toBe('');
});
  
  