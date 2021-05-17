import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Home from "./pages/home/Home";
import BookForm from "./pages/books/form/BookForm";
import Details from "./pages/books/details/Details"; 
import Search from './pages/books/search/search';
import Profile from './pages/books/profile/profile';

export default function Routes() {
  return (
    <Router>
      <Switch>
        {/* <div style={{ height: "100%" }}> */}
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/details/:id">
          <Details />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/addBook">
          <BookForm />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        {/* </div> */}
      </Switch>
      <Nav />
    </Router>
  );
}
