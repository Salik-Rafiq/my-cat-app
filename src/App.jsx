import logo from './logo.svg';
import './App.scss';
import CatApiService from './app/services/CatApiService';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CatImage from './components/CatImage';
import { HandThumbsUpFill } from 'react-bootstrap-icons';
import VoteButtons from './components/VoteButtons';

function App() {
  const [theCat, setTheCat] = useState({ url: '' });

  function loadKitty() {
    CatApiService.getSingleCat().then((result) => {
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
    <Container className="App" className="text-center">
      <Row >
        <Col className="align-self-center"><h2>I made this myself</h2></Col>
      </Row>
      <Row>
        <Col className="align-self-center ">
          <CatImage id={theCat.id} url={theCat.url} onClick={nextKitty} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <VoteButtons id={theCat.id} onSuccess={nextKitty} />
        </Col>
      </Row>
      <Row >
        <h2>Click on the image to select a random next image</h2>
      </Row>
    </Container>
  );
}

export default App;

/*
<div onClick={nextKitty} style={{ height: "500px", width: "500px", marginLeft: "auto", marginRight: "auto" }}>
<img src='/spinner.gif' style={{ display: !isLoading ? "none" : "block", margin: "auto" }} />
<img src={theCat.url} style={{
  display: isLoading ? "none" : "block",
  maxHeight: "500px", maxWidth: "500px", cursor: "pointer", border: "solid 1px #CDCDCD",
  boxShadow: "5px 5px 5px #1a1a1a",
  marginLeft: "auto", marginRight: "auto"
}} onLoad={() => { setIsLoading(false) }} />
</div>
*/