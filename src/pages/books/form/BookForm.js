import { React, useState } from "react";
import "./index.css";
import useForm from "./../../../services/utils/form";
import defaultUrl from "./../../../services/api/api";

function BookForm() {
  const [{ values, loading }, handleChange, handleSubmit] = useForm();

  const handleBookForm = () => {
    fetch(defaultUrl + "books", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <div className="container-form">
      <div className="form-wrapper">
        <p className="page-title">Add a new book</p>
        <form onSubmit={handleSubmit(handleBookForm)}>
          <div className="field">
            <label>Name</label>
            <input name="name" onChange={handleChange} />
          </div>
          <div className="field">
            <label>Author</label>
            <input name="author" onChange={handleChange} />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea name="description" onChange={handleChange}></textarea>
          </div>
          <button className="submitButton" type="submit">
            <span className="btn-submit-title">
              {loading ? "Enviando..." : "Add new book"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookForm;
