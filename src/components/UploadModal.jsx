import React, { useState } from 'react';
import { useRef } from 'react';
import { Button, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import CatApiService from '../app/services/CatApiService';

const uploadFile = async (file) => {
    return CatApiService.uploadCatImage(file);
}

const UploadModal = ({ isOpen, onClose }) => {
    const [file, setFile] = useState();
    const [statusCode, setStatusCode] = useState();
    const [statusMessage, setStatusMessage] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const fileRef = useRef();
    /*let showSpinner = false;
    useEffect(() => {
        showSpinner = isUploading;
    }, [isUploading]);
*/
    const onUploadClick = () => {
        if (!file === 0) {
            setStatusCode(1000);
            setStatusMessage("No file specified. Please select a file to upload.")
            return;
        }
        setStatusCode(null);
        setStatusMessage(null);
        setIsUploading(true);
        uploadFile(fileRef.current.files[0])
            .then(response => {
                /* Check result. If 400 than it's not a cat! put up message! */
                if (response.status === 201) {
                    setStatusMessage("Successfull upload of a cat image!")
                }
                setStatusCode(response.status);
            })
            .catch(error => {
                setStatusCode(error.response.status);
                if (error.response.status === 400) {
                    setStatusMessage("Unsuccessfull. Image is either too large or isn't a cat!");
                } else {
                    setStatusMessage(`Server Error: ${error.message}`);
                }
            })
            .finally(() => {
                setFile(null);
                fileRef.current.value = '';
                setIsUploading(false);
            });
        //onClose();
    }
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const onCloseAlert = () => {
        setStatusCode(null);
        setStatusMessage(null);
    }

    const onOpening = () => {
        fileRef.current.value = null;
        setStatusCode(null);
        setStatusMessage(null);
        setIsUploading(false);
    }

    let messageAlert = null;
    if (statusMessage && statusCode) {
        const variant = () => {
            switch (statusCode) {
                case 201: return 'success';
                case 400: return 'info';
                case 500: return 'danger';
                default: return 'dark'
            }
        }
        messageAlert = <Alert key="messageAlert" variant={variant()} dismissible onClose={onCloseAlert}>
            {statusMessage}
        </Alert>
    }

    return (
        <Modal show={isOpen} onHide={onClose} onShow={onOpening} backdrop={isUploading ? 'static' : true} >
            <Modal.Header closeButton={!isUploading}>
                <Modal.Title>Upload Cat Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {messageAlert}
                <Form>
                    <Form.Group controlId="catImageFile">
                        <Form.Label>Specific a cat image. It will be scanned and if a cat will be added.</Form.Label>
                        <Form.Control type="file" ref={fileRef} onChange={onFileChange} disabled={isUploading} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={isUploading}>Cancel</Button>
                <Button variant="primary" onClick={onUploadClick} disabled={!file}>
                    {isUploading ? (<Spinner animation="border" role="uploading" className="mr-2" size="sm" />) : null}
                    Upload</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UploadModal;