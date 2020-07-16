import React from 'react';

export default function Error(props) {
  console.log(props.error);
  return <h1 style={ { textAlign: 'center' } }>Sorry, the service is not available now, try visiting later</h1>;
}
