import React, { Component, useState } from 'react';
export const SetCohort = (props) => {
  const [cohortValue, changeCohort] = useState('FTRI');
  const [numberValue, changeNumber] = useState(1);
  const [orgValue, changeOrg] = useState();
  const [industryValue, changeIndustry] = useState();
  const [linkedinUrl, changeUrl] = useState();
  const cohortNums = [];

  const getCookie = (cookie) => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(cookie + '='))
      ?.split('=')[1];
  };


  //Set Cohort and make a PATCH/PUT request to change user's cohort
  function cohortSet() {
    //FETCH REQUEST BELOW
    fetch('http://localhost:8080/residents/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: getCookie('userId'), cohort: `${cohortValue} ${numberValue}`, organization: orgValue, industry: industryValue, linkedin: linkedinUrl }),
    })
      .then(data => data.json())
      .then(result => {
        console.log(result);
        props.setCohort(true);
      }, []);
    //Change cohortIsSet to true if successful
  }

  for (let i = 1; i <= 40; i++) {
    cohortNums.push(<option value={i}>{i}</option>);
  }

  // note: '&nbsp;' adds one space after text in HTML
  return (
    <div className="SetCohort">
      <img id='codesmithImg' src="https://miro.medium.com/max/1200/1*aqCqaO8ALzYczUHe_3g3Gw.jpeg" alt="Codesmith Logo"></img>
      <div className="SetCohortText"><span className='bigger'>Welcome!</span> <br /> <hr />It seems you're new here. <br /> Please let us know just a little bit more info about you.</div>
      <div className="SetCohortInput">
        {/* <input type="text" value={inputValue} onChange={(e) => changeInput(e.target.value)}></input> */}

        <div className='lineTitle'> Cohort:&nbsp;
          <select name="cohortSelect" id="cohortSelect" value={cohortValue} onChange={(e) => changeCohort(e.target.value)}>
            <option value="FTRI">FTRI</option>
            <option value="PTRI">PTRI</option>
            <option value="LA">LA</option>
            <option value="NY">NY</option>
          </select>
          <select name="cohortNumberSelect" id="cohortNumberSelect" value={numberValue} onChange={(e) => changeNumber(e.target.value)}>
            {cohortNums}
          </select>
          <div className='lineTitle'> Organization:&nbsp;
            <p id="emptyOrg">Leave empty if you are currently unemployed</p>
            <input id="orgSelect" placeholder='Insert organization name...' value={orgValue} onChange={(e) => changeOrg(e.target.value)}></input>
            <div></div>
          </div>
          <div className='lineTitle'> Industry:&nbsp;
            <select name="industrySelect" id="industrySelect" value={industryValue} onChange={(e) => changeIndustry(e.target.value)}>
              <option>Select an industry if applicable</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Hardware Engineer">Hardware Engineer</option>
              <option value="Data Science">Data Science</option>
              <option value="Product Management">Product Management</option>
              <option value="Finance/Fintech">Finance/Fintech</option>
              <option value="Research">Research</option>
              <option value="Non-tech">Non-tech</option>
            </select>
          </div>
          <div className='lineTitle'> LinkedIn Profile URL:&nbsp;
            <input id="linkedSelect" placeholder='Insert LinkedIn URL...' value={linkedinUrl} onChange={(e) => changeUrl(e.target.value)}></input>
            <div></div>
          </div>
        </div>


        <button className="SetCohortButton" onClick={cohortSet}>Complete Registration</button>
      </div>
    </div>
  );
};