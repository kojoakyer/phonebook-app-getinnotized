import React, { useState } from 'react'
import './NewContact.css'
import axios from 'axios'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


function NewContact() {
    const [firstname,setFirstName]= useState('')
    const [lastname,setLastName]= useState('')
    const [phonenumber,setPhoneNumber]= useState(0)
    const [error,setError]=useState(false)
    const [laoding, setLoading] = useState(false)

   async function handleSubmit(e){
        e.preventDefault()

      

        if(firstname.length == 0 || lastname.length == 0 || phonenumber.length == 0){
            setError(true)
            return;
           
        }

        setLoading(true)
        const newContact= {
            firstname,lastname,phonenumber
        }

        try {
        
          const response =   await axios.post("http://localhost:5000/contact", newContact)

          console.log(response?.data)
          
           }catch(err){
               console.log(err)
           }
        
        
        setLoading(false)

    }

    if(laoding){
        return(
            <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )
    }
  return (
    <div className='contact'>
        <div className="contact-wrapper">
            <div className="contact-info">
                <h3>Please add a contact</h3>
                <img src="https://preview.colorlib.com/theme/bootstrap/contact-form-16/images/undraw-contact.svg" alt="" />
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-container" >
                    {error && firstname.length<=0 ? <label>firstname is required</label>:''}
                    <input onChange={e=>setFirstName(e.target.value)} placeholder='firstname' type="text" />
                    {error && lastname.length<=0 ? <label>lastname is required</label>:''}
                    <input onChange={e=>setLastName(e.target.value)} placeholder='lastname' type="text" />
                    {error && phonenumber.length<=0 ? <label>phonenumber is required</label>:''}
                    <input onChange={e=>setPhoneNumber(e.target.value)} placeholder='phone number' type="text" />
                </div>
                
                <button disabled={laoding} type='submit' >Add Contact</button>
            </form>
        </div>
    </div>
  )
}

export default NewContact