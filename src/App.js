import React, {useState} from 'react'
import './App.css';

function App() {
  const [costumorData, setCostumorData] = useState([])

  const [formData, setFormData] = useState({
    email: "webb19@willandskill.se", 
    password: "javascriptoramverk"
  })

  function handleOnChange(e){
    setFormData({...formData, [e.target.name]: e.target.value} )
    console.log(formData)
  }

  function handleOnSubmit(e){
    e.preventDefault()
    const url = "https://frebi.willandskill.eu/api-token-auth/"
    const payload = {
      email: formData.email, 
      password: formData.password
    }

    fetch(url,{
      method: "POST", 
      body:  JSON.stringify(payload),
      headers: {
        "Content-type": "application/json"
      }

    })
    .then(res => res.json())
    .then(data =>{
      localStorage.setItem("WEBB20", data.token)
    })
    console.log(formData)
  }

  function getMe(){
    const url = "https://frebi.willandskill.eu/api/v1/me/"
    const token = localStorage.getItem("WEBB20") 
    fetch(url,{
      headers:{
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data=>console.log(data))
  }

  function getCustomerList(){
    const url = "https://frebi.willandskill.eu/api/v1/customers/"
    const token = localStorage.getItem("WEBB20") 
    fetch(url,{
      headers:{
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data=>{
      setCostumorData(data.results)
      console.log(costumorData)
    })
  }

  return (
    <div className="App">
      <form onSubmit={handleOnSubmit}>
        <label>Email</label>
        <input name="email" onChange={handleOnChange}/>
        <label>Password</label>
        <input name="password" onChange={handleOnChange}/>
        <button type="submit">submit</button>
      </form>
        <hr/>
        <button onClick={getMe}>Get me</button>
        <hr/>
        <button onClick={getCustomerList}>Get Customer</button>
        {costumorData.map(curr =>{
          return <h1 key={curr.id}>{curr.name}</h1>
        })}
    </div>
  );
}

export default App;
