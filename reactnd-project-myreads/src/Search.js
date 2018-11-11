import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
  /*To initialize state and bind methods, constructor for your React component is needed.*/
  constructor(props) {
    super()
    this.state = {
      query: '',
      books: []}}
  /*the following function will do the job to find the book and we need to keep checking to avoid null issues.*/
  FindTheBook = (event) => {
    const query = event.target.value;
    this.setState({ query });
    BooksAPI.search(query).then(resultSearch => {
      if(resultSearch instanceof Array)
        {this.setState({ books:
        resultSearch.map(bookFound => {
        const bookMatched = this.props.books.find(bookId => bookId.id === bookFound.id);
        if (bookMatched) {
           bookFound.shelf = bookMatched.shelf;}
        return bookFound;
      })})}
      else{ this.setState({books:[]})}
    });}
  /*In render we need link to make us come back to the home page
  https://medium.freecodecamp.org/beginners-guide-to-react-router-4-8959ceb3ad58
  we make with book changeShelf to move the selected book to the home page */

  render() {
    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/' >Close</Link>
        <div className="search-books-input-wrapper">
            <input
              value={this.state.query}
              type="text"
              placeholder="Search by title or author"
              onChange={this.FindTheBook}/>
        </div>
      </div>
      <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => 
              <Book 
              book={book}
              key={book.id}  
              changeShelf={this.props.changeShelf}
               />)}
          </ol>
      </div>
    </div>)
  }
}
export default Search;
