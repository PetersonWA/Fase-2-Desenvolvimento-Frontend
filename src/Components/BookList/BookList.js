

// O código abaixo é equivalente ao código comentado, este está implementado botão de exclusão e edição:
import React from 'react';
import Book from './Book';
import { Box } from '@mui/material';

const BookList = ({ books, onDeleteBook, onEditBook }) => {
    return (
        <div className="book-list" style={{ textAlign: "center" }}>
            

            {books.length === 0 ? (
                <div    className='book-list-card'>
                    <h1>Livros cadastrados</h1>
                    <p><i>Não há livros cadastrados !!</i></p>
                </div>
            ) : (
            <Box className="book-list-card">
                <h1>Livros cadastrados</h1>
                <ul>
                {books.map((book, index) => (
                    <Book 
                    key={book.id} 
                    book={book} 
                    onDelete={() => onDeleteBook(book.id)} 
                    onEdit={onEditBook}
                    />
                ))}
                </ul>
            </Box>
            )}
        </div>
        );
};

export default BookList;


/*

// O código acima é equivalente ao seguinte código:
import React, { useState } from 'react';
import Book from './Book';

const BookList = ({ books }) => {
    return (
        <div className="book-list" style={{textAlign: "center"}}>
            <h1>Livros cadastrados</h1>
            
            {books.length === 0 ? (
                <p>Não há livros cadastrados</p>
            ) : (
                <ul>
                    {books.map((book, index) => (
                        <Book key={index} book={book} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookList;*/