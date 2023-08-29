import React, { useState } from 'react'
import '../History/history.scss'
import Results from '../Results'

export default function History() {
     const [getResult, setGetResult] = useState('')
     
     if (!localStorage.getItem('data')) {
          return (
               <div className='history'>
                    <h1>No History</h1>
               </div>
          )
     }

     let data = JSON.parse(localStorage.getItem('data'))
     const handelResult = (e) => {

          let url1 = e.target.innerText
          let res = data.filter((ele) => {
            return   ele.url === url1
          })
          setGetResult(res)
     }


return (
       <>
     <div className='history'>
               <div className='links'>

               { data.map((ele, i) => 
                    <p data-testid = {`link ${i}`} onClick={handelResult} key={i}>{ele.url}</p>
               )}
               </div>
               
               <Results data={getResult} loading={false} />
     </div>
     </>
)
}
