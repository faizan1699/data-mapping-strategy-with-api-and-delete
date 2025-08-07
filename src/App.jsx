import { useEffect, useState } from 'react';

// import axios from "axios";


const App = () => {

  const [formData, setFormData] = useState({
    // phone: "",
    email: "",
    password: ""
  })
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")

  const [data, setData] = useState([])


  const handleChange = (e) => {
    const { name, value } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    // setFormData({
    //   ...formData,
    //   [name]: value
    // })


  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email: email, password: password }
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (response?.data.status) {
        // setEmail("")
        // setPassword("")
        alert(response?.data.message)
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }


  const cssStyle = {
    form: {
      div: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "300px"
      }
    }
  };

  const getAPiData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/")
    setData(res.data)
  }

  useEffect(() => {
    getAPiData()
  }, [])


  const deleteItem = (item, index) => {

    setData((prev) => prev.filter((_i, is) => is !== index))

  }

  return (
    <div >
      {/* <form onSubmit={onSubmit}>
        <div className="" style={cssStyle.form.div}>
          {/* <input type="text" value={formData.name} name="name" onChange={handleChange} placeholder='name' required />
          <input type="number" value={formData.phone} name="phone" onChange={handleChange} placeholder='phone' required /> */}
      {/* <input type="email" value={formData.email} name="email" onChange={handleChange} placeholder='email' required />
          <input type="password" value={formData.password} name="password" onChange={handleChange} placeholder='password' required />
          <button type='submit'>Submit</button>
        </div> */}
      {/* </form> */}

      <button onClick={getAPiData}>get APi data</button>

      <div className="" style={{ margin: "1rem" }}></div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {
          data?.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  border: "2px solid #333",
                  borderRadius: "8px",
                  padding: "10px",
                  height: "150px",
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: index % 2 === 0 ? "#f4f4f4" : "black",
                  width: "200px",
                  boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
                  color: index % 2 !== 0 ? "#f4f4f4" : "black",

                }}
              >

                <div><strong>Title:</strong> {item.title}</div>
                <div><strong>Completed:</strong> {item.completed ? "Yes" : "No"}</div>
                <div><strong>ID:</strong> {item.id}</div>

                <button onClick={() => deleteItem(item, index)}>delete item</button>
              </div>
            );
          })
        }
      </div>



    </div >
  )
}

export default App