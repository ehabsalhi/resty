import React, {  useState } from 'react';
import axios from 'axios';
import './Form.scss';


function Form({ handleApiCall , setLoading , setGetInputValue}) {
  const [inputValue, setInputValue] = useState('')
  const [method, setMethod] = useState('')
  const [textArea, setTextArea] = useState(null)
  const [textAreaValue, setTextAreaValue] = useState(null)



 const handleSubmit = e => {
   e.preventDefault();

   setLoading(true)

   if (!inputValue) {
     handleApiCall({response : 'please enter url'});
     setLoading(false)
     return
   }
   if (!method) {
     handleApiCall({response : 'please enter method'});
     setLoading(false)
     return
   }
   // for testing method you can go to this site and take the req from it : https://api.restful-api.dev/objects
 
   axios[method](inputValue, JSON.parse(textAreaValue)).then((res) => {

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
  const textAreaData = (e) => {
    setTextAreaValue(e.target.value)
  }

  const getMethod = (e) => {
    const methods = document.querySelectorAll('.methods span')
    methods.forEach(ele => ele.classList.remove('active'))
    e.target.classList.add('active')

    setMethod(e.target.id)
    e.target.innerText === 'post' || e.target.innerText === 'put' ? setTextArea(true) : setTextArea(false)
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
            textArea === true ? <label>
          <textarea  className='textArea' cols="35" rows="10" placeholder='JSON Data' onChange={textAreaData}></textarea>
          </label> : null
          }
        </form>
      </>
    );
  
}

export default Form;
