import logo from './logo.svg';
import './App.scss';
import CatApiService from './app/services/CatApiService';
import { useState, useEffect } from 'react';


function App() {
  const [theCat, setTheCat] = useState({ url: '' });
  const [isLoading, setIsLoading] = useState(false);

  function loadKitty() {
    CatApiService.getSingleCat().then((result) => {
      setIsLoading(true);
      setTheCat(result.data[0]);
    })
  }

  useEffect(() => {
    loadKitty();
  }, []);

  function nextKitty() {
    loadKitty();
  }

  return (
    <div className="App">
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <div onClick={nextKitty} style={{ height: "500px", width: "500px", marginLeft: "auto", marginRight: "auto" }}>
          <img src='/spinner.gif' style={{ display: !isLoading ? "none" : "block", margin: "auto" }} />
          <img src={theCat.url} style={{
            display: isLoading ? "none" : "block",
            maxHeight: "500px", maxWidth: "500px", cursor: "pointer", border: "solid 1px #CDCDCD",
            boxShadow: "5px 5px 5px #1a1a1a",
            marginLeft: "auto", marginRight: "auto"
          }} onLoad={() => { setIsLoading(false) }} />
        </div>
        <div>
          <h2>Click on the image to select a random next image</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
