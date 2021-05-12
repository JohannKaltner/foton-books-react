import { React, useState, useEffect } from "react";
import "./index.css";
import useForm from "./../../../services/utils/form";
import defaultUrl from "./../../../services/api/api";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BookForm() {
  const [{ values, loading }, handleChange, handleSubmit] = useForm();
  const [previewImage, setPreviewImage] = useState("");
  // const [errors, setErrors] = useState({ description: true, name: true });

  function encodeImageFileAsURL(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      handleChange({
        target: { name: "image", value: reader.result },
      });
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const handleBookForm = async () => {
    // hasError();
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

  const disableBtn =
    values.description === "" || values.author === "" || values.name === "";

  useEffect(() => {
    console.log(disableBtn);
  }, [values]);

  return (
    <div className="container-form">
      <div className="form-wrapper">
        <p className="page-title">Add a new book</p>
        <form onSubmit={handleSubmit(handleBookForm)}>
          <div className="field input-file-container">
            <label className=" custom-file-upload">
              <input
                value={values.file || ""}
                name="file"
                type="file"
                onChange={encodeImageFileAsURL}
              />
              Select Image
            </label>
          </div>
          <div className="preview">
            {previewImage && <img className="thumb" src={previewImage} />}
          </div>
          <div
            className={
              "field " + (values.name?.length < 1 || false ? "field-error" : "")
            }
          >
            <label>Name</label>
            <input
              error={true}
              value={values.name || ""}
              name="name"
              onChange={handleChange}
            />
            {values.name?.length < 1 && (
              <span className="errorMessage">this field cannot be empty</span>
            )}
          </div>
          <div
            className={
              "field " +
              (values.author?.length < 1 || false ? "field-error" : "")
            }
          >
            <label>Author</label>
            <input
              value={values.author || ""}
              name="author"
              onChange={handleChange}
            />
            {values.author?.length < 1 && (
              <span className="errorMessage">this field cannot be empty</span>
            )}
          </div>
          <div
            className={
              "field " +
              (values.description?.length < 1 || false ? "field-error" : "")
            }
          >
            <label>Description</label>

            <textarea
              value={values.description || ""}
              maxLength="2000"
              defaultValue=""
              name="description"
              onChange={handleChange}
            ></textarea>
            {values.description?.length < 1 && (
              <span className="errorMessage">this field cannot be empty</span>
            )}
            <span className="input-range">
              {values.description?.length || "0"} /2000
            </span>
          </div>

          {false ? (
            <div
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                marginTop: 70,
              }}
            >
              <div className="half-spinner"></div>
            </div>
          ) : (
            <button
              disabled={disableBtn}
              className="submitButton"
              type="submit"
            >
              <span className="btn-submit-title">Add new book</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default BookForm;
