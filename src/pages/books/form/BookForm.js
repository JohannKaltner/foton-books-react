import React, { useState} from "react";
import "./index.css";
import useForm from "../../../services/utils/Form";
import defaultUrl from "../../../services/api/api"; 
import { useHistory } from "react-router-dom";

function BookForm() {
  let history = useHistory()  
  const [previewImage, setPreviewImage] = useState("");
  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
     name: { 
        required: {
        value: true,
        message: 'This field is required',
        },  
    },
    author: {
      required: {
        value: true,
        message: 'This field is required',
      },
    },
    description: {
      required: {
        value: true,
        message: 'This field is required',
      },
      custom: {
        greaterThanMax: (value) => value.length <= 2000,
        message: 'Character limit exceeded',
      },
    }, 
  },
  onSubmit: () => handleBookForm()
  });
  
  const handleFileChange = (event) => {  
    var file = event.target.files[0]; 
    var reader = new FileReader();
    reader.onloadend = function () {  
     setPreviewImage(reader.result)
      console.log(previewImage)
    };
    reader.readAsDataURL(file);
  }

  
  const handleBookForm = async () => {   
    fetch(defaultUrl + "books", {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({...data, image:previewImage}),
        })
      .then((res) => {
        res.json()
        history.push('/')
      });
   
  };
 
  return (
    <div className="container-form">
      <div className="form-wrapper">
        <p className="page-title">Add a new book</p>
        <form onSubmit={handleSubmit}>
          <div className="field input-file-container">
            <label className=" custom-file-upload">
              <input
                value={data.file}
                name="file"
                type='file'
                onChange={(e) => handleFileChange(e)}
                />
              Select Image
            </label>
          </div>
        
          <div className="preview">
            {previewImage && <img className="thumb" src={previewImage} />}
          </div>
          <div
            className={
              "field " + (errors.name && "field-error")
            }
            >
            <label>Name</label>
            <input
              type='text'
              error={true}
              value={data.name}
              name="name"
              onChange={handleChange('name')}
            />
            {errors.name  && (
              <span className="errorMessage">{errors.name}</span>
              )}
          </div>
          <div
            className={
              "field " +
              (errors.author ? "field-error" : "")
            }
            >
            <label>Author</label>
            <input
              type='text'
              value={data.author}
              name="author"
              onChange={handleChange('author')}
            />
            {errors.author  && (
              <span className="errorMessage">{errors.author}</span>
            )}
          </div>
          <div
            className={
              "field " +
              (errors.description ? "field-error" : "")
            }
          >
            <label>Description</label>

            <textarea
              value={data.description}
              maxLength="2000"
              defaultValue=""
              type="text"
              name="description"
              onChange={handleChange('description')}
            ></textarea>
           {errors.description && (
              <span className="errorMessage">{errors.description}</span>
            )}
            <span className="input-range">
              {data.description?.length || "0"} /2000
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
