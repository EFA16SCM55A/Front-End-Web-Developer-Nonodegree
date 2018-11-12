import React,{Component} from 'react'
import BookHasNoPicture from './Book-Has-No-Picture.png';

class Book extends Component {
  /*To initialize state for Shelf and check if there is shelf assigned or make it none*/
  constructor(props) {
    super()
    this.state = {
      shelf: ''}}

  componentDidMount = () => {
    this.setState(
      {shelf: this.props.book.shelf}
      )
  }
  checkShelf=(shelf)=>{
    if(shelf){
      shelf=shelf
    }
    else{
      shelf = 'none'
    }
    return shelf
  }
/*check if there is image, title, author for the book if not assigned,
 add indicator to the missing info. 
Add book info and cover 
book options changer to move book to the selected shelf or none. */  
render() {
    if (!this.props.book.imageLinks) {
      this.props.book.imageLinks = []
      this.props.book.imageLinks.thumbnail = BookHasNoPicture
    }
    if(!this.props.book.title){
      this.props.book.title='Sorry...Not available'
    }
    if(!this.props.book.authors){
      this.props.book.authors='Sorry...unknowing'
    }
  const image=this.props.book.imageLinks.thumbnail
  const title=this.props.book.title
  const author=this.props.book.authors
  const { book } = this.props;
  const { shelf } = this.state;
  const{changeShelf}=this.props;

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={ 
                { width: 128,
                 height: 188, 
                 backgroundImage:`url("${image}")` } }>
            </div>
             <div className="book-shelf-changer">
               <select onChange={(e)=>changeShelf(book, e.target.value)}
               value={this.checkShelf(shelf)}>
               <option value="move" disabled>Move to...</option>
               <option value="currentlyReading">Currently Reading</option>
               <option value="wantToRead">Want to Read</option>
               <option value="read">Read</option>
               <option value="none">None</option>
               </select>
             </div>

        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>       
        </div>
      </li>
    )
  }
}


export default Book;
