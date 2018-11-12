import React from 'react';
import {BrowserRouter, Route, Switch,Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookCase from './BookCase';
import Search from './Search';

class BooksApp extends React.Component {
  /*To initialize state and bind methods, constructor for your React component is needed.*/
  constructor(props) {
  super()
   this.state = {
   books: [] };}
  /*https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d*/
  componentDidMount() {
    this.SetBook();
  }
  /*To fix the first beg, I need to filter the array before adding it to shelf*/
 /*it will help to move book among shelves*/
  changeShelf = (bookModified, moveTo) => {
    BooksAPI.update(bookModified, moveTo).then(response => {
      bookModified.shelf = moveTo;
      this.setState(updatedBook => 
        (
          {books: updatedBook.books.filter(updatedBookId => updatedBookId.id !== bookModified.id).concat(bookModified)}
        )
        );
    });
  };
 /*it will help us to set the state of book*/
  SetBook=() => {
  BooksAPI.getAll().then(books => this.setState({ books }));}

 /*it  is to use the router and to connect the app with book list and search*/
  render() {
    return (
      <div className="app">
      <BrowserRouter>
        <Switch>
        <Route exact path="/" render={({history}) => (
              <div className="list-books">
                <BookCase 
                books={this.state.books} 
                changeShelf={this.changeShelf} />
                <div className="open-search">
                  <Link to="/search">Search</Link>
                </div>
              </div>
            )}
          />

          <Route path="/search" render={() => (
              <Search 
              books={this.state.books} 
              changeShelf={this.changeShelf} />
            )}
          />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
