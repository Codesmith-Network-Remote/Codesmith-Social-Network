import React, { Component, useState } from 'react';

export const LookingList = (props) => {
  console.log('Props: ', props);
  const jobList = [];
  const { recruitingList } = props;

  console.log('recruitingList: ', recruitingList);

  if (recruitingList && recruitingList.length) {
    recruitingList.forEach((res, residx) => {
      res.hiringroles.forEach((role, roleidx) => {
        jobList.push(
          <>
            <tr key={`${residx}-${roleidx}`}>
              <td>{jobList.length + 1}</td>
              <td>{role}</td>
              <td>{res.organization}</td>
              <td>{res.linkedin && <a href={`${res.linkedin}`}>{res.name}</a> || res.name}</td>
            </tr>
          </>
        );
      });
    });
  }

  return (
    <div className="LookingPage">
      <div className="LookingBox">
        <h3>Looking? Here is who is hiring...</h3>

        <table className="LookingTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Role</th>
              <th>Company</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>{jobList}</tbody>
        </table>
      </div>
    </div>
  );
};
