import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Form({updateData, editItemDetails, handleClose}) {
  const [inputs, setInputs] = useState({
    title: editItemDetails.title,
    body: editItemDetails.body
  });
  const [titleError, SettitleError] = useState(false);
  const [bodyError, SetbodyError] = useState(false);

  const { title, body} = inputs;

  function handleFormData(e) {
    let { name, value } = e.target;
      switch (name) {
        case 'title':
            setInputs((inputs) => ({ ...inputs, [name]: value }));
            if(value.length > 0 ){
                SettitleError(false)
            }else{
                SettitleError(true)
            }
            break;
        case 'body':
            setInputs((inputs) => ({ ...inputs, [name]: value }));
            if(value.length > 0 ){
                SetbodyError(false)
            }else{
                SetbodyError(true)
            }
            break;
         default:
            setInputs((inputs) => ({ ...inputs, [name]: value }));
      }
  }

  function HandleOnSubmit(){
    if(inputs.title ===''){
        SettitleError(true)
        return;
    }
    if(inputs.body === ''){
        SetbodyError(true)
        return;
    }
    const parsedDetails = JSON.stringify(inputs);
    alert(parsedDetails);
    setInputs({
        title: '',
        body: '',
    });
    updateData(inputs, )
  }
  
  return (
    <Modal
    className="modal-background"
    show={true}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    onHide={handleClose}
    >
        <Modal.Header>
            <Modal.Title className="modal-title">Edit Details</Modal.Title>
            <Button onClick={handleClose}>Close</Button>        
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="form-group col-lg-12">
                    <span className="text-danger">* </span><label htmlFor="title">Title:</label>
                    {titleError && <div className="pb-1 text-danger">Title required</div>}
                    <input type="text" className="form-control" id="title" placeholder="Enter title" name="title" value={title} onChange={handleFormData} required/>
                </div>
                <div className="form-group col-lg-12">
                    <span className="text-danger">* </span><label htmlFor="body">Last Name:</label>
                    {bodyError && <div className="pb-1 text-danger">Last name required</div>}
                    <input type="text" className="form-control" id="body" placeholder="Enter body" name="body" value={body} onChange={handleFormData} required/>
                </div>
            </form>
            <button className="btn btn-primary" onClick={HandleOnSubmit}>Submit</button>
        </Modal.Body>
    </Modal>
   );
}

export default Form;

