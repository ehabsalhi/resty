import '../Header/header.scss'

function Header({ setPage }) {
    return (
      <header>
        <h1>RESTy</h1>
        <div className="click-page">
          <h2 data-testid = 'homePage' onClick={()=>setPage('home') }>Home</h2>
          <h2 data-testid = 'historyPage' onClick={()=>setPage('history') }>Hisotry</h2>
        </div>
      </header>
    );
  
}

export default Header;
