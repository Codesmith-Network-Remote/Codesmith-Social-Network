import React, { Component, useEffect, useState } from 'react';
import { OutcomeVis } from '../components/OutcomeVis.jsx';

export const OutcomeContainer = (props) => {
  // const { orgList, industryList } = props;
  const [orgList, setOrgList] = useState();
  const [indList, setIndList] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/outcomes')
      .then(res => res.json())
      .then(res => { 
        setOrgList(res.orgs); 
        setIndList(res.industries); });
  }, []);

  // const orgs = {};
  // const inds = {};
  // for (let i = 0; i < orgList.length; i++) {
  //   orgs[orgList[i].organization] = orgList[i].count;
  // }
  // for (let i = 0; i < orgList.length; i++) {
  //   inds[indList[i].industry] = indList[i].count;
  // }
  // console.log('orgList for OutcomeContainer', orgs);

  return (
    <div className="CohortPage">
      <div className='cohortTitle'>Codesmith Alumni Outcomes</div>
      <OutcomeVis outcomeOrgs={orgList} outcomeInds={indList} />
    </div>
  );

};