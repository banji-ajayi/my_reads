import React from 'react'
import PropTypes from 'prop-types'


Books.propTypes = {
  myBooks: PropTypes.array.isRequired,
  onChangeBookState: PropTypes.func.isRequired
}

function Books (props) {
  return (
    <ol className="books-grid">
      {props.myBooks.map((book) => (
        <li key={book.id} className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 126, height: 193, 
                backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select   onChange={(event) => props.onChangeBookState(event, book)} value={book.shelf ? book.shelf : null}>
               
                <option value="">Select Book State</option>                
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
			<div className="book-authors">{book.authors ? book.authors.join(',') : ''}</div>
        </li>
      ))}
    </ol>
  )
}

export default Books