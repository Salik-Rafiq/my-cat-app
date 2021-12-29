import './App.scss';
import { Container, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import useToggle from './utilities/useToggle';

import UploadModal from './components/UploadModal';
import VoteTab from './tabs/VoteTab';
import SearchTab from './tabs/SearchTab';

function App() {
  const [isOpen, open, close] = useToggle(false);


  return (
    <Container className="App text-center">
      <Row >
        <Col className="align-self-center"><h2>I made this myself</h2></Col>
      </Row>
      <Row>
        <Tabs mountOnEnter={true}>
          <Tab eventKey="vote" title="Vote">
            <VoteTab />
          </Tab>
          <Tab eventKey="search" title="Search">
            <SearchTab />
          </Tab>
        </Tabs>
      </Row>
      <Row>
        <Button onClick={open}>Upload a Image</Button>
        <UploadModal isOpen={isOpen} onClose={close} />
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