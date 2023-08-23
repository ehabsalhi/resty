import React, { useState } from 'react';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form/index.jsx';
import Results from './Components/Results';



function App ()  {

  const [data , setData] = useState(null)
  const [requestParams, setRequestParams] = useState({})
  const [loading, setLoading] = useState(true)

  


 const callApi = (requestParams) => {
    // mock output
    const dataObj = {
      count: 2,
      results: [
        {name: 'fake thing 1', url: 'http://fakethings.com/1'},
        {name: 'fake thing 2', url: 'http://fakethings.com/2'},
      ],
    };
    setRequestParams(requestParams)
    setData(requestParams)
   
  }

    return (
      <React.Fragment>
        <Header />
        <div data-testid = 'Request_Method'>Request Method: {requestParams.method}</div>
        <div  data-testid  = 'url'>URL: {requestParams.url}</div>
        <Form handleApiCall={callApi} setLoading = {setLoading}  />
        <Results data={data} loading ={loading} />
        <Footer />
      </React.Fragment>
    );
  
}

export default App;
