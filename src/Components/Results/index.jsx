import '../Results/result.scss'
function Results ({data , loading}){
  return (
    <div className="contaner-result">  
      {
        !loading ? 
      
      <section className='section-result'>
        <pre className='pre'>{data ? JSON.stringify(data, undefined, 2) : null}</pre>
      </section>
          : <div className='loading'>Loading ...</div>
      }
    </div>
    );
  
}

export default Results;
