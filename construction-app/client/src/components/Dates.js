import React from 'react';

export default function Dates(props) {
    const date = new Date(props.month);
    const month = date.toLocaleString('default', { month: 'long' });


  return (
    <div>{month}</div>
  )
}
