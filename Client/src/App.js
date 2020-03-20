import React from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook'
import ApolloClient from 'apollo-boost';         // To bind react with Apollo
import { ApolloProvider } from 'react-apollo'    // To Wrap our Application and inject data received from server


//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <div className="background">
          <div className="margin">
             
          {/* <h1 className="color">GraphQL</h1> */}
          
          <img className="image" src={require('../src/graphql.png')} alt="user icon"/>
          <h5 className="color"> Query Language</h5>
          </div>
          </div>
        <div className="container-fluid top">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
        <div className="col-md-5 reading">
  
        <BookList/>
        </div>
        <div  className="col-md-2">
          <div className="v1"></div>
        </div>
        <div className="col-md-5">
          <div className="left">
        <AddBook/>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
