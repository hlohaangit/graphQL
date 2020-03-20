
const graphql = require('graphql')
const {GraphQLObjectType, GraphQLString, GraphQLSchema,GraphQLInt,GraphQLList,GraphQLNonNull} = graphql;
const Book = require('../models/book');
const Author= require('../models/author')


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        authorId: { type: GraphQLInt },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {                  
                return Author.findOne({authorId:parent.authorId})
            }
        }
    })
    
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        authorId: { type: GraphQLInt },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books:{                                                 //Nesting queries
            type:GraphQLList(BookType),
            resolve(parent,args){
               return Book.find({authorId:parent.authorId})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({                      //this is how we intially jump into graph
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {                    // args contain id field
               return Book.findOne({name:args.name})
            }
        },
        author: {
            type: AuthorType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {                    // args contain id field
                return Author.findOne({name:args.name})        
            }
        },
        books:{
            type:GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({})               
            }
        },
            authors:{
                type:GraphQLList(AuthorType),
                resolve(parent,args){ 
                    return Author.find({})                  
                }
            }       
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
                authorId:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
            let author = new Author({
                name:args.name,
                age:args.age,
                authorId:args.authorId
            })
            return(author.save())
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })
                return(book.save())
        

            }
        },
        deleteBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
            return(Book.findOneAndDelete(args.name))
            }
        },
        updateBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                newName:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
            return(Book.findOneAndUpdate({name:args.name},
                {$set:{name:args.newName}}
                ))
            }
        },
        deleteAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
            return(Author.findOneAndRemove(args.name))
            }
        },
        deleteBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
            return(Book.findOneAndRemove(args.name))
            }
        }
        
    }

})


module.exports = new GraphQLSchema({                //defineing  which query we are allowing user to use when making queris from front end

    query: RootQuery,
    mutation:Mutation

});

