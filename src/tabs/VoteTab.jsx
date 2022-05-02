import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import CatApiService from '../app/services/CatApiService';
import CatImage from '../components/CatImage';
import VoteButtons from '../components/VoteButtons';
import { useDispatch } from 'react-redux';
import { loadVotes } from '../features/votecount/VoteCountSlice';
import VoteCount from '../features/votecount/VoteCount';

const VoteTab = () => {
    const [theCat, setTheCat] = useState({ url: '' });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadVotes());
    }, [dispatch]);

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
            <Row>
                <Col>
                    <VoteCount catId={theCat.id} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <VoteButtons id={theCat.id} onClicked={nextKitty} />
                </Col>
            </Row>
            <Row >
                <h2>Click on the image to select a random next image</h2>
            </Row>
        </>
    );
}

export default VoteTab;