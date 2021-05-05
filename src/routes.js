import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Home from "./pages/home/Home";
import BookForm from "./pages/books/form/BookForm";
import Details from "./pages/books/details/Details";

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
        <Route path="/addBook">
          <BookForm />
        </Route>
        <Route path="/profile">
          <Home />
        </Route>
        {/* </div> */}
      </Switch>
      <Nav />
    </Router>
  );
}
