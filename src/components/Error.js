import React from 'react'
import { useRouteError } from 'react-router-dom'
const Error = () => {

    const error=useRouteError();
    console.log(error);

  return (
    <>
    <h1>OOPS !</h1>
    <h1>Something went wrong...</h1>
    <h2>{error.status+" "+error.statusText}</h2>
    <h2>{error.data}</h2>
    </>
  )
}

export default Error