import {gql} from 'apollo-boost';

const getBooksQuery=gql`
{
    books{
        name
        author{
            name
        }    
    }

}
`
const getAuthorsQuery=gql`
{
    authors{
        name
        age
        authorId
    }
}
`
const addBookMutation=gql`
mutation($name:String!,$genre:String!,$authorId:Int!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
        name
    }
}
`
const deleteBookMutation=gql`
mutation($name:String!){
    deleteBook(name:$name){
        name
    }

}
`

export {getAuthorsQuery,getBooksQuery,addBookMutation,deleteBookMutation};