import React, { Component, useState } from 'react';

export const ResidentDetails = (props) => {
  
  const elems = [];
  console.log(props.user);
  for (const key in props.user) {
    if (key !== 'id') {
      if (key === 'hiringroles') {
        continue;
      } else if (props.user[key] === '') {
        if (key === 'name') {
          elems.push(<input placeholder="Set Name Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'email') {
          elems.push(<input placeholder="Set Email Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'linkedin') {
          elems.push(<input placeholder="Set LinkedIn Profile Link Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'photo') {
          elems.push(<input type="file" accept="image/*" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'organization') {
          elems.push(<input placeholder="Set Organization Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)} />);
        } else if (key === 'industry' && props.user['organization'] !== '') {
          elems.push(
            <form id="industryMenu">
              <select name='industry-type' id='industry-type' value={props.user[key]} onChange={(e) => props.changeInput(e, key)}>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Hardware Engineer">Hardware Engineer</option>
                <option value="Data Science">Data Science</option>
                <option value="Product Management">Product Management</option>
                <option value="Finance/Fintech">Finance/Fintech</option>
                <option value="Research">Research</option>
                <option value="Non-tech">Non-tech</option>
              </select>
            </form>
          );
        } else if (key === 'message') {
          elems.push(<input placeholder="Set Message Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } 
      } else {
        elems.push(<input value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
      }
    }
  }

  return (
    <div className="ResidentDetails">
      {elems}
      <button className="SaveButton" onClick={props.saveFunction}>Save</button>
      <button className="LogOutButton" onClick={() => {
        document.cookie = 'userId=0; path=/; max-age=0;';
        document.cookie = 'linkedInAuthCode=0; path=/; max-age=0;';
        props.changeAuthenticated(false);
      }
      }>Log out</button>
    </div>
  );
};