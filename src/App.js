import React, { useState, useEffect } from 'react';
// import './components/Book'
import Book from './components/Book';
import Movie from './components/Movie';
import BookList from './components/BookList';

// import data from '../public/data.json'
// npm i bootstrap
// Todo:
// initialize state
// fetch data with async/await
// Log response from data and determine structure of the data
// Convert Web Component into a React Component

// Add react-router-dom
//npm i react-router-dom
// still be able to use this app.import React from "react";
// react router v6 changed Switch --> Routes
// https://reactrouter.com/en/v6.3.0/getting-started/overview
// Warning: Depending on the version of React Router you are using, the syntax will change
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SingleView from './components/SingleView';

function App() {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await fetch('data.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await response.json();
      setData(json);
      setLoaded(true);
      console.warn('loaded...');
    }
    getData();
  }, []);
  // console.log('loaded:', loaded, 'data:', data);

  // Todo: Convert Web Component into a React Functional Component
  // <mit-book
  //         title={book.title}
  //         subtitle={book.subtitle}
  //         author={book.author}
  //         publisher={book.publisher}
  //         description={book.description}
  //         key={book.isbn} />
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          {loaded && (
            <>
              <Route
                path="/"
                element={<BookList data={data} loaded={loaded} />}
              />
              <Route
                path="/:bookId"
                element={<SingleView data={data} loaded={loaded} />}
              />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
