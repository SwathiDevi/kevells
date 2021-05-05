import { Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Form from './Form'

function App() {
  const [userList, setUserList] = useState([]);
  const [isEditShowPopup, setIsEditShowPopup] = useState(false);
  const [editItemDetails, setEditItemDetails] = useState()

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data =>
        setUserList(data.filter((item) => {
          return item && item.userId && item.userId === 1
        }))
      )
      .catch(error => setUserList(error));
  },[])


  function removeItem(id){
    let filterItem = userList.filter(f => f.id !== id)
    setUserList(filterItem);
  }

  function editItem(itemDetails){
    setIsEditShowPopup(!isEditShowPopup)
    setEditItemDetails(itemDetails)
  }

  function updateData(inputs){
    const {title, body} = inputs
    let updateItem = userList.map((item) => {
      if(item.id === editItemDetails.id){
        item.title = title
        item.body = body
      }
      return item
    })
    setUserList(updateItem);
    setIsEditShowPopup(false)
  }

  function handleClose(){
    setIsEditShowPopup(false)
  }

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.map((item, index) =>
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td className="w-50">{item.title}</td>
              <td className="w-75">{item.body}</td>
              <td><Button onClick={()=>editItem(item)}>Edit</Button></td>
              <td><Button onClick={()=>removeItem(item.id)}>Delete</Button></td>
            </tr>
          )
          }
        </tbody>
      </table>
      {
        isEditShowPopup && <Form updateData={updateData} 
        editItemDetails={editItemDetails} editItem={editItem} handleClose={handleClose}/>
      }
    </div>
  );
}

export default App;