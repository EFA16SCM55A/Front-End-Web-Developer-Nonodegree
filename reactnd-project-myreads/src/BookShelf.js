import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {
  
/*map book to its name, id, shelf*/
  render() {

    return (
      <ol className="books-grid">
        {this.props.books.map(book => (
          <Book
            book={book}
            key={book.id}
            changeShelf={this.props.changeShelf}
          />
        ))}
      </ol>
    );
  }
}

export default BookShelf;
