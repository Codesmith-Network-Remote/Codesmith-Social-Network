import React, { Component } from 'react';

export const ResidentBox = (props) => {
//<a href>

  return(
    <button className="ResidentBox" id={props.id}>
      { !props.photo
        ? <div className="EmptyPhoto">404<br/>Not Found</div>
        : <img className="ProfilePicture"src={props.photo} />
      }
      <div className='cardInfo'>{props.name}</div>
      <div className='userInfo'>{props.organization}</div>
      <div className='userInfo'>{props.industry}</div>
      <div className='userInfo'>{props.cohort}</div>
      <div className='message'>{props.message}</div>
    </button>
  );
};


