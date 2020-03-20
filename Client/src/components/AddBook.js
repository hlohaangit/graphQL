import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'
import * as compose from 'lodash.flowright';



class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: 0

        }


    }
    displayAuthors() {
        var data = this.props.getAuthorsQuery;
        if (data.loading) {
            return (<option disabled>LoadingAuthors</option>)
        }
        else {
            return data.authors.map(author => {
                return (<option key={author.authorId} value={author.authorId}>{author.name}</option>)
            })
        }
    }
    submitForm(e) {
        e.target.reset();
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });



    }

    render() {
        return (
            <div>
                <h1>Add a Book</h1>
                <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                    <div className="field">
                        <label>Book Name</label>
                        <br />
                        <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Genre</label>
                        <br />
                        <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Author</label>
                        <br />
                        <select className="pad"  onChange={(e) => this.setState({ authorId: parseInt(e.target.value) })}>
                            <option>Select Author</option>
                            {this.displayAuthors()}
                        </select>
                    </div>
                    <br />
                    <button className="button">Add Book</button>
                </form>
            </div>
        )
    }
}
export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
