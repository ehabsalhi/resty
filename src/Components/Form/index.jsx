import React, {  useReducer, useState } from 'react';
import axios from 'axios';
import './Form.scss';
import {actionTypes , reducer , initialValue} from '../reducer/reducer'



function Form({ handleApiCall  ,  setLoading}) {

  const [state, dispatch] = useReducer(reducer, initialValue)
  


 const handleSubmit = e => {
   e.preventDefault();

   setLoading(true)
  //  dispatch({type : actionTypes.loading , payload : true})

   

   if (!state.inputValue) {
     handleApiCall({response : 'please enter url'});
     setLoading(false)
    //  dispatch({ type: actionTypes.loading, payload: {value :false} })
     return
   }
   
   if (!state.method) {
     handleApiCall({response : 'please enter method'});
     setLoading(false)
    //  dispatch({ type: actionTypes.loading, payload: { value: false } })

     
     return
   }
   // for testing method you can go to this site and take the req from it : https://api.restful-api.dev/objects

   axios[state.method](state.inputValue, state.textAreaValue ? JSON.parse(state.textAreaValue) : null)
     .then((res) => {

    const formData = {
      method:state.method || 'GET',
      url: state.inputValue ,
      response : res
    }

       
       let parsData = []
       if (localStorage.getItem("data")) {
        parsData = JSON.parse(localStorage.getItem("data"))
        }
      parsData.push(formData)
      localStorage.setItem("data", JSON.stringify(parsData))


      handleApiCall(formData);    
       setLoading(false)
      // dispatch({ type: actionTypes.loading , payload: {value :false} })


   })
     .catch((err) => {
     console.log(err);
     })
 }

  
  const inputData = (e) => {
    dispatch({ type: actionTypes.inputValue, payload: { value: e.target.value } })
  }
  const textAreaData = (e) => {
    dispatch({type : actionTypes.textAreaValue , payload : {value : e.target.value}})
  }

  const getMethod = (e) => {
    const methods = document.querySelectorAll('.methods span')
    methods.forEach(ele => ele.classList.remove('active'))
    e.target.classList.add('active')

    dispatch({type : actionTypes.method , payload : {value :e.target.id }})

    e.target.innerText === 'post' || e.target.innerText === 'put' ?
      dispatch({ type: actionTypes.textArea, payload: true })
      : dispatch({ type: actionTypes.textArea, payload: false })
  }




    return (
      <>
        <form onSubmit={handleSubmit} data-testid = 'form'>
          <label >
            <span>URL: </span>
            <input name='url' type='text' onChange={inputData} />
            <button type="submit"  data-testid= 'submitBtn'>GO!</button>
          </label>
          <label className="methods">
            <span onClick={getMethod} id="get" data-testid= 'get'>get</span>
            <span onClick={getMethod} id="post" data-testid= 'post'>post</span>
            <span onClick={getMethod} id="put" data-testid= 'put'>put</span>
            <span onClick={getMethod} id="delete" data-testid= 'delete'>delete</span>
          </label>
          {
            state.textArea === true ? <label>
          <textarea  className='textArea' cols="35" rows="10" placeholder='JSON Data' onChange={textAreaData}></textarea>
          </label> : null
          }
        </form>
      </>
    );
  
}

export default Form;
