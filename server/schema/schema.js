const graphql = require('graphql')
const _ = require('lodash');
const Book=require('../models/book');
const Author=require('../models/aurthor');

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql;
    

//below is the dummy data
// var books = [
//     { name: "name of the wind", genre: "fantasy", id: "1", authorid: '2' },
//     { name: "the final empire", genre: "fantasy", id: "2", authorid: '1' },
//     { name: "hero of ages", genre: "fantasy", id: "4", authorid: '2' },
//     { name: "the final empire", genre: "fantasy", id: "5", authorid: '1' },
//     { name: "the final empire", genre: "fantasy", id: "6", authorid: '3' },
//     { name: "the long earth", genre: "sci-fi", id: "3", authorid: '3' }
// ];

// var authors = [
//     { name: "patrick rothusfuss", age: 33, id: "1" },
//     { name: "brandon sanderson", age: 45, id: "2" },
//     { name: "terry pratcheyy", age: 54, id: "3" },
// ]


//below is the definition of object type- the fields are wrapped inside a function ? 
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //return _.find(authors, { id: parent.authorid })
                return Author.findById(parent.authorid)
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return _.filter(books, { authorid: parent.id })
                return Book.find(authorid: parent.id);
            }
        }
    })
});

//below will be root queries that how a user jumps into the graph and grabs data.

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //here we write the code to get the data we need from the database
                //return _.find(books, { id: args.id });
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find(authors, { id: args.id });
                return Author.findById(args.id)
            }
        }
    }
})

//setting up mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type:GraphQLString},
                age: {type:GraphQLInt}
            },
            resolve(parent,args){
                let author= new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            
            }
        },
        addBook:{
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorid: {type: GraphQLID}
            },
            resolve(parent, args){
               let book= new Book({
                   name: args.name,
                   genre: args.genre,
                   authorid: args.authorid
               });
               return book.save(); 
            }

        }
    }
})


module.exports = new GraphQLSchema({
    //pass the initial root query of the schema
    query: RootQuery,
    mutation: Mutation
})