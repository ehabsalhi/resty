import React, { useState } from 'react';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form/index.jsx';
import Results from './Components/Results';
import axios from 'axios';



function App ()  {

  const [data , setData] = useState(null)
  const [requestParams, setRequestParams] = useState({})
  const [loading, setLoading] = useState(true)
  const [getInputValue, setGetInputValue] = useState(true)




 const callApi = (requestParams) => {
    setRequestParams(requestParams)
    setData(requestParams)
   
 }
  
  function nextBtn(e) {
    let next = data.response.data.next
    let previous = data.response.data.previous
    let value = null

    if (e.target.id === 'next' &&  next !== null) {
      value = next
      setLoading(true)
    }
    else if (e.target.id === 'Previous' && previous !== null) {
      value = previous
      setLoading(true)
    }

    axios.get(value).then((res) => {

      const formData = {
        method: 'GET',
        url: value ,
        response : res
      }
      callApi(formData);    
       setLoading(false)
     })
       .catch((err) => {
       console.log(err);
       })

  }

    return (
      <React.Fragment>
        <Header />
        <div data-testid = 'Request_Method'>Request Method: {requestParams.method}</div>
        <div  data-testid  = 'url'>URL: {requestParams.url}</div>
        <Form handleApiCall={callApi} setLoading={setLoading} setGetInputValue={setGetInputValue} />

        <div className='nextPrev'>
        <button id='Previous' onClick={nextBtn}>Previous</button>
        <button id='next' onClick={nextBtn}>Next</button>
        </div>

        <Results data={data} loading={loading} />
   
        <Footer />
      </React.Fragment>
    );
  
}

export default App;
