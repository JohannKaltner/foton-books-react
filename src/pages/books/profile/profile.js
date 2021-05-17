import React from "react";
import { useHistory } from "react-router"; 
import "./index.css"; 

function Profile() { 

  let history = useHistory(); 
  return (
    <div className="container-detail">
      <div className="detail-header">
        <div className="icon-container" onClick={() => history.goBack()}>
          <img className="icon" src="/back.svg" />
        </div>
        <div className="circle" />
        <div className="circle-zebra" />
        <div className="circle-zebra-2" />
        <div className="circle-ruby" />
        <div className="image-container">
          <img src='/profile.png' />
        </div>
        {/* <Waves /> */}
        <div className="title-container">
          <span className="title"> Johann Kaltner</span>
        </div>
        {/* <div className=""> */}
        <span className="book-author"> Desenvolvedor Fullstack</span>
        <div className="description-container">
          <span className=""> 20 anos, Rio de Janeiro, Lolzeiro e Metaleiro raiz.</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
