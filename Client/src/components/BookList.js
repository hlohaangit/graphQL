import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBooksQuery, deleteBookMutation } from '../queries/queries'
import * as compose from 'lodash.flowright';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash } from '@fortawesome/free-solid-svg-icons'



class BookList extends Component {
    // toggle = () => setTooltipOpen(!tooltipOpen);
    displayBooks() {
        var data = this.props.getBooksQuery;
        if (data.loading) {
            return (<div>Loading books.......</div>)
        } else {
            return data.books.map(book => {
                return (
                    <div className="mleft">
                        <li key={book.authorId}>
                            <p><h5>{book.name}</h5>{book.author.name}<FontAwesomeIcon  className="icon" onClick={(e) => this.deleteBook(book.name)}  icon={faTrash}/></p>

                      </li>                     
                    </div>
                )
            })
        }
    }
    deleteBook(value) {
        //console.log(value)
        this.props.deleteBookMutation({
            variables: {
                name: value
            },
            refetchQueries: [{ query: getBooksQuery }]

        });
    }
    render() {
        console.log(this.props)
        return (

            <div className="list">
                <h1>Reading List</h1>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
            </div>
        )
    }
}
export default compose(
    graphql(getBooksQuery, { name: "getBooksQuery" }),
    graphql(deleteBookMutation, { name: "deleteBookMutation" })
)(BookList);