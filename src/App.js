// Site referenced
//MDN, Javascripttutorial.net, Udacity tutors...

import React from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {

  state = {
    myBooks: [],
    query: "",
    booksReturned: [],
    myBookShelves: [
      {
        bookTitle: "Currently Reading",
        id: "currentlyReading"
      },
      {
        bookTitle: "Want to Read",
        id: "wantToRead"
      },
      {
        bookTitle: "Read",
        id: "read"
      }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ myBooks:books })
    })
  }

  changeBookState = (event, book) => {
    BooksAPI.update(book, event.target.value)
    .then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState((state) => ({
      myBooks:state.myBooks !== null ? books.map((gotBooks) => state.myBooks = gotBooks) : alert("No books found")  
        }))
      })
    })
    
  }

  queryBooks(query) {
	// let queryResults = [];
    BooksAPI.search(query, 30).then((booksReturned) => {
      booksReturned.map(gotBook =>
		this.state.myBooks.filter(book => book.id === gotBook.id) && (
			booksReturned.shelf = this.state.myBooks.filter(book => book.id === gotBook.id[0].shelf)
		)

      )
      this.setState({booksReturned})
    })
  }


  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.queryBooks(this.state.query)
  }

  render() {
    const { booksReturned, myBooks, myBookShelves, query } = this.state
    return (
      <div className="app">

      <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>My Reads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {myBookShelves.map(bookShelf => (
                <div className="bookshelf" key={bookShelf.id}>
                  <h2 className="bookshelf-title">{bookShelf.bookTitle}</h2>

                  <div className="bookshelf-books">
                    <Books myBooks={myBooks.filter(book => book.shelf === bookShelf.id)} onChangeBookState={this.changeBookState} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">New book</Link>
          </div>
        </div>
      )}/>



        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"  onClick={(event) => this.updateQuery("")}>Close</Link>
              <div>
                <form>
                  <input type="text" placeholder="Search books" 
                  value={query} onChange={(event) => this.updateQuery(event.target.value)} />
                </form>
              </div>
            </div>
            <div className="search-books-results">
              {query !== "" && (
                <div className="bookshelf">
                  <div className="bookshelf-books">
                    {booksReturned.length ? (<Books myBooks={booksReturned} onChangeBookState={this.changeBookState} />) :
                     ( <div>No results.</div>
                    )}
				  </div>
                </div>
              )}
            </div>          
            </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp

