import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Book from '../../Components/BookList/Book';

describe('Componente Book', () => {
  test('permite editar o livro e chama onEdit com os novos dados', () => {
    const mockOnEdit = jest.fn();
    const book = {
      id: 1,
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasia',
      readAt: '2023-01-01'
    };

    render(<Book book={book} onEdit={mockOnEdit} onDelete={() => {}} />);

    // Clica no botão de editar (ícone)
    const editarBtns = screen.getAllByRole('button');
    fireEvent.click(editarBtns[0]); // assume que o primeiro botão é o de editar

    // Preenche os novos valores
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: 'Senhor dos Anéis' }
    });
    fireEvent.change(screen.getByLabelText(/autor/i), {
      target: { value: 'J.R.R. Tolkien' }
    });
    fireEvent.change(screen.getByLabelText(/gênero/i), {
      target: { value: 'Aventura' }
    });
    fireEvent.change(screen.getByLabelText(/data/i), {
      target: { value: '2023-12-25' }
    });

    // Clica no botão de confirmar (ícone de check)
    const confirmarBtns = screen.getAllByRole('button');
    fireEvent.click(confirmarBtns[0]); // assume que o botão de confirmar vem primeiro após edição

    // Verifica se onEdit foi chamado com os dados atualizados
    expect(mockOnEdit).toHaveBeenCalledWith(1, {
      id: 1,
      title: 'Senhor dos Anéis',
      author: 'J.R.R. Tolkien',
      genre: 'Aventura',
      readAt: '2023-12-25'
    });
  });
});

test('exclui o livro após confirmação', () => {
    // Simula que o usuário clicou em "OK" na confirmação
    window.confirm = jest.fn(() => true);
  
    const mockDelete = jest.fn();
    render(
      <Book
        book={Book}
        onDelete={mockDelete}
        onEdit={() => {}}
      />
    );
  
    const botoes = screen.getAllByRole('button');
    fireEvent.click(botoes[1]); // botão de deletar
  
    expect(window.confirm).toHaveBeenCalledWith("Tem certeza de que deseja excluir este livro?");
    expect(mockDelete).toHaveBeenCalled(); // Confirma que onDelete foi chamado
});

test('não exclui o livro se confirmação for cancelada', () => {
    // Simula que o usuário clicou em "Cancelar"
    window.confirm = jest.fn(() => false);
  
    const mockDelete = jest.fn();
    render(
      <Book
        book={Book}
        onDelete={mockDelete}
        onEdit={() => {}}
      />
    );
  
    const botoes = screen.getAllByRole('button');
    fireEvent.click(botoes[1]); // botão de deletar
  
    expect(window.confirm).toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled(); // onDelete NÃO deve ser chamado
  });
  
