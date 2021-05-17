// import React, { useState } from "react";
 import { useState } from 'react';



// const useForm = (submit) => { 
//   const [values, setValues] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (event) => {
//     const auxValues = { ...values };
//     auxValues[event.target.name] = event.target.value;
//     setValues(auxValues);
//   };

//   const handleSubmit = (callback) => (event) => {
//     event.preventDefault();
//     setLoading(true);
//     callback();
//     setLoading(false);
//   };
//   return [{ values, loading }, handleChange, handleSubmit];
// };

// export default useForm;

 const useForm = (options) => {
  const [data, setData] = useState((options?.initialValues || {}));
  
  const [errors, setErrors] = useState({});

  const handleChange = (key, sanitizeFn) => (e) => {
     
     const valueDefault = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value; 

    setData({
      ...data,
      [key]: valueDefault,
    });
  };

  
   const handleSubmit = async (e) => {
     e.preventDefault();
     const validations = options?.validations;
     if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        console.log(newErrors)
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit(); 

    }
  };

  return {
    data,
    handleChange,
    handleSubmit, 
    errors,
  };
};

export default useForm;