import React, { Component } from 'react';
import BookShelf from './BookShelf';

class BookCase extends Component {
  
  state = { shelfChange: false };
  /*make array for different types of shelves*/
  shelfInfo=()=>{
    const shelves = [
      {title: 'Currently Reading',
       type: 'currentlyReading'
      },
      {title: 'Want to Read',
       type: 'wantToRead'
      },
      { title: 'Read',
       type: 'read'
      }
    ];
    return shelves;
  }
/*
map books to three different types of shelves and none (out for books not belong to 3types)
filter out book not belong for each type */
  render() {
        return (
      <div className="list-books">
       <div className="list-books-title">
       <h1>MyReads</h1>
       </div>
      <div className="list-books-content">
        {this.shelfInfo().map((shelf, index) => {
          const shelfType = this.props.books.filter(book => book.shelf === shelf.type);
          return (
            <div className="bookshelf" key={index}>
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf-books">
                <BookShelf 
                books={shelfType} 
                changeShelf={this.props.changeShelf} />
              </div>
            </div>);
        })}
      </div>
      </div>
    );
  }
}

export default BookCase;
