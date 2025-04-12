import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BookList from '../../Components/BookList/BookList';

// Mock do componente Book (evita interferência nos testes da lista em si)
jest.mock('./Book', () => ({ book }) => <li data-testid="mock-book">{book.title}</li>);

describe('Componente BookList', () => {

  test('renderiza mensagem de aviso quando não há livros cadastrados', () => {
    render(<BookList books={[]} onDeleteBook={jest.fn()} onEditBook={jest.fn()} />);
    
    expect(screen.getByText(/livros cadastrados/i)).toBeInTheDocument();
    expect(screen.getByText(/Adicione um livro para começar !!/i)).toBeInTheDocument();
  });

  test('renderiza lista de livros quando houver livros cadastrados', () => {
    const livros = [
      { id: 1, title: '1984', author: 'George Orwell', genre: 'Ficção', readAt: '2024-01-01' },
      { id: 2, title: 'Dom Casmurro', author: 'Machado de Assis', genre: 'Romance', readAt: '2024-02-01' },
    ];

    render(<BookList books={livros} onDeleteBook={jest.fn()} onEditBook={jest.fn()} />);

    expect(screen.getByText(/livros cadastrados/i)).toBeInTheDocument();
    const renderedBooks = screen.getAllByTestId('mock-book');
    expect(renderedBooks).toHaveLength(2);
    expect(screen.getByText('1984')).toBeInTheDocument();
    expect(screen.getByText('Dom Casmurro')).toBeInTheDocument();
  });

});
