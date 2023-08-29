import '../Results/result.scss'
// import ReactJson from 'react-json-view';
import JSONPretty from "react-json-prettify";


function Results({ data, loading }) {
  // console.log(loading);


  return (
    <div className="contaner-result">  
      {
        !loading ? 
      
      <section className='section-result' data-testid = 'response'>
            <JSONPretty className='pre' json={data} />

      </section>
          : <div className='loading'>Loading ...</div>
      }
    </div>
    );
  
}

export default Results;
