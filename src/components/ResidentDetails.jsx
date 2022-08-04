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
          elems.push(<input placeholder="Set Photo Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'organization') {
          elems.push(<input placeholder="Set Organization Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)} />);
        } else if (key === 'industry' && props.user['organization'] !== '') {
          elems.push(
            <>
              <label htmlFor="industry-type">Set Industry Here</label>
              <select name='industry-type' id='industry-type' value={props.user[key]} onChange={(e) => props.changeInput(e, key)}>
                <option value="SWE">Software Engineer</option>
                <option value="HWE">Hardware Engineer</option>
                <option value="DS">Data Science</option>
                <option value="PM">Product Management</option>
                <option value="fintech">Finance/Fintech</option>
                <option value="research">Research</option>
                <option value="misc">Non-tech</option>
              </select>
            </>
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
      {/* <label htmlFor="industry-type"></label>
              <select name='industry-type' id='industry-type' value={props.user['industry']} onChange={(e) => props.changeInput(e, 'industry')}>
                <option value="SWE">Software Engineer</option>
                <option value="HWE">Hardware Engineer</option>
                <option value="DS">Data Science</option>
                <option value="PM">Product Management</option>
                <option value="fintech">Finance/Fintech</option>
                <option value="research">Research</option>
                <option value="misc">Non-tech</option>
              </select>
              <input placeholder="Set Message Here" value={props.user['message']} onChange={(e) => props.changeInput(e, 'message')}/> */}
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