import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Form.scss';


function Form({ handleApiCall , setLoading }) {
  const [inputValue, setInputValue] = useState('')
  const [method, setMethod] = useState('')
  const [textArea, setTextArea] = useState(null)

  

 const handleSubmit = e => {
   e.preventDefault();

   setLoading(true)
   axios.get(inputValue || 'https://pokeapi.co/api/v2/pokemon').then((res) => {

    const formData = {
      method:method || 'GET',
      url: inputValue || 'https://pokeapi.co/api/v2/pokemon',
      response : res
    }
     handleApiCall(formData);    

     setLoading(false)
   })
     .catch((err) => {
     console.log(err);
   })

 }

  
  const inputData = (e) => {
    setInputValue(e.target.value)
  }

  const getMethod = (e) => {
    const methods = document.querySelectorAll('.methods span')
    methods.forEach(ele => ele.classList.remove('active'))
    e.target.classList.add('active')

    setMethod(e.target.innerText )
    e.target.innerText === 'POST' || e.target.innerText === 'PUT' ? setTextArea(true) : setTextArea(false)
    console.log(method);
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
            <span onClick={getMethod} id="get" data-testid= 'get'>GET</span>
            <span onClick={getMethod} id="post">POST</span>
            <span onClick={getMethod} id="put">PUT</span>
            <span onClick={getMethod} id="delete">DELETE</span>
          </label>
          {
            textArea === true ? <label>
          <textarea name="" id="" className='textArea' cols="35" rows="10" placeholder='JSON Data'></textarea>
          </label> : null
          }
        </form>
      </>
    );
  
}

export default Form;
