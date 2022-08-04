// import React, { Component, useEffect } from 'react';
// // import chart from 'chart';

// export const OutcomeVis = (props) => {

//   const labels = [...props.O];

//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Alumni Outcomes By Organization',
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         data: [0, 10, 5, 2, 20, 30, 45],
//       },
//       {
//         label: 'Alumni Outcomes By Industry',

//       },

//     ]
//   };

//   const config = {
//     type: 'line',
//     data: data,
//     options: {}
//   };

//   useEffect(() => {
    
//     const script = document.querySelector('script');
//     script.type = 'text/javascript';

//   });

//   return (
//     <div>
//       <canvas id="datavis"></canvas>
//       <script></script>
//     </div>
//   )
// }