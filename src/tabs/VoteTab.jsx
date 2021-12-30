import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import CatApiService from '../app/services/CatApiService';
import CatImage from '../components/CatImage';
import VoteButtons from '../components/VoteButtons';

const VoteTab = () => {
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
        <>
            <Row>
                <Col className="align-self-center mt-2">
                    <CatImage id={theCat.id} url={theCat.url} onClick={nextKitty} dimensions={{ cx: "500px", cy: "500px" }} />
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
        </>
    );
}

export default VoteTab;