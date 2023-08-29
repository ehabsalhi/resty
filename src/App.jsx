import React, { useState, useReducer } from 'react';
import {actionTypes , reducer , initialValue} from './Components/reducer/reducer'

import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form/index.jsx';
import Results from './Components/Results';
import axios from 'axios';
import History from './Components/History/History';



function App ()  {

  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('')
  const [state, dispatch] = useReducer(reducer, initialValue)





 const callApi = (requestParams) => {
   dispatch({type : actionTypes.data , payload :{value : requestParams}})
   
 }
  
  function nextBtn(e) {
    let next = state.data.response.data.next
    let previous = state.data.response.data.previous
    let value = null

    if (e.target.id === 'next' &&  next !== null) {
      value = next
      setLoading(true)
      // dispatch({type : actionTypes.loading , payload :  {value :true}})
    }
    else if (e.target.id === 'Previous' && previous !== null) {
      value = previous
      setLoading(true)
      // dispatch({type : actionTypes.loading , payload :  {value :true}})

    }

    axios.get(value).then((res) => {

      const formData = {
        method: 'GET',
        url: value ,
        response : res
      }
      callApi(formData);    
      setLoading(false)
      // dispatch({type : actionTypes.loading , payload :  {value :false}})

     })
       .catch((err) => {
       console.log(err);
       })

  }

    return (
      <React.Fragment>
        <Header setPage={setPage} />
        {
          page === 'history' ? <History /> :
            <>
              <div data-testid = 'Request_Method'>Request Method: {state.data.method}</div>
              <div data-testid='url'>URL: {state.data.url}</div>
              
              <Form handleApiCall={callApi} setLoading = {setLoading}  />
      
              <div className='nextPrev'>
              <button id='Previous' onClick={nextBtn}>Previous</button>
              <button id='next' onClick={nextBtn}>Next</button>
              </div>
      
              <Results data={state.data} loading={loading} />
          </>
        }
        
        <Footer />
      </React.Fragment>
    );
  
}

export default App;
