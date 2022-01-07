import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import './style.css';
import homeLogo from "./jarurat.png";

const Home = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("");

    function submit(){
        axios({
            method: "POST",
            url: "https://jarurat-backend.herokuapp.com/api/addItem/"+title,
        })
        window.location.reload(false);
    }

    function deleteItem(id){
        axios({ 
            method: "DELETE",
            url: "https://jarurat-backend.herokuapp.com/api/delete/"+id,
        })
        window.location.reload(false);
    }


        useEffect(() => {
            fetch("https://jarurat-backend.herokuapp.com/api/getAllItems")
                .then(res => res.json())
                .then(
                    (data) => {
                        setIsLoaded(true);
                        setUsers(data);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
          }, [])
    if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className='ip-section'>
                    <br></br>
                        <img src={homeLogo} className="img"></img>
                        <br></br>
                        <div className='title'>Add items</div>
                    <input className='like-btn' onChange={event => setTitle(event.target.value)} />
                    <br></br>
                <button className='like-btn' onClick={() => submit()}>Add Item</button>
                
                    {users.map(user => (
                        <div className='li-element'>{user.name} 
                        <br/>
                        <button className='like-btn' onClick={() => deleteItem(user.id)}>Delete</button>
                        </div>
                                    
                    ))}
                
                
                </div>
            );
        }
    }

export default Home;
