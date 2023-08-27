import '../Results/result.scss'
// import ReactJson from 'react-json-view';
import JSONPretty from "react-json-prettify";


function Results({ data, loading }) {

  return (
    <div className="contaner-result">  
      {
        !loading ? 
      
      <section className='section-result' data-testid = 'response'>
            {/* <ReactJson className='pre' src={data} displayDataTypes={false} indentWidth={2} /> */}
            <JSONPretty className='pre' json={data} />

      </section>
          : <div className='loading'>Loading ...</div>
      }
    </div>
    );
  
}

export default Results;
