import React, { Component, useEffect, useState } from 'react';
import { ResidentsListContainer } from './ResidentsListContainer';

export const IndustryContainer = (props) => {
  const [industryList, setIndustryList] = useState([]);
  const [residents, setResList] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/industries')
      .then(res => res.json())
      .then(res => setIndustryList(res));
  }, []);

  function findResidents(industry) {
    console.log(industry);
    fetch('http://localhost:8080/industries/residents', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ industry: industry})
    })
      .then(res => res.json())
      .then(res => setResList(res))
      .then(setActive(true));
  }

  const industries = [];
  for (let i = 0; i < industryList.length; i++) {
    if (industryList[i].industry !== '') {
      industries.push(<button className='cohortButton' onClick={() => findResidents(industryList[i].industry)} >{industryList[i].industry}</button>);
    }
  }

  console.log(residents);
  return (
    <div className="CohortPage">
      <div className='cohortTitle'>Search by Industry</div> 
      {
        !active
          ? 
          <div className="Cohortbox">

            {industries} 
          </div>
          : 
          <div>
            <button className="BackButton" onClick={() => setActive(false)}>Back</button>
            <div className="Cohortbox">
              <ResidentsListContainer residentList={residents} />
            </div>
          </div>
      }
    </div>
  );
};