import React from 'react'
import './Home.css'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import axios from 'axios'


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';



function Home() { const [open, setOpen] = React.useState(false);

  const [firstname,setFirstName]= React.useState('')
  const [lastname,setLastName]= React.useState('')
  const [phonenumber,setPhoneNumber]= React.useState(0)
  const [laoding, setLoading] = React.useState(false)

  const [allData,setAllData] = React.useState([]);
const [filteredData,setFilteredData] = React.useState(allData);





  // Get contact data

    React.useEffect(()=>{

            const getContact=  async ()=>{
              try{
                  
                  const res = await axios.get(`http://localhost:5000/contact`)
      
                  console.log(res.data,'-contact data-');
                  
                  setAllData(res.data);
                  setFilteredData(res.data);
      
              }catch(err){
                  console.log(err);
                  
              }
                  
              }
              getContact()
          
          },[])


          const handleSearch = (event) => {
            let value = event.target.value.toLowerCase();
            let result = [];
            console.log(value);
            result = allData.filter((data) => {
            return data.lastname.search(value) != -1;
            });
            setFilteredData(result);
            }

  // Delete contact

  async function handleDelete(_id){
    console.log(_id,'--id delete-- ')
    setLoading(true)
    try {
        
    const res =  await axios.delete(`http://localhost:5000/contact/${_id}`)
    
    console.log(res?.data);

    
      window.location.reload(true) 
  
    
    
     }catch(err){
         console.log(err)
     }
     setLoading(false)
  }

  //Edit contact

  async function handleEdit(_id){
    console.log(_id,'--id edit--')
    setLoading(true)
    const editContact= {
      firstname,lastname,phonenumber
  }
    try {
        
    const responseEdit =  await axios.patch(`http://localhost:5000/contact/${_id}`, editContact)
    console.log(responseEdit?.data);

    window.location.reload(true) 
    
     }catch(err){
         console.log(err)
     }

     setLoading(false)
  }



  //Opening of dialog

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if(laoding){
    return(
        <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )
}
  return (
    <>
    <div className='home'>
      <div className="home-title">
        <ContactPhoneIcon/>
        <h2>Phone Book App</h2>
      </div>
      <div className="home-wrapper">
        <div className="home-top">
          <h2>Contacts</h2>
          <Link to='/add-contact'>
            <Button variant="contained" startIcon={<AddIcon />}>
               Add Contact
            </Button>
          </Link>
        </div>
        <div className="home-search">
          <SearchIcon sx={{}}/>
          <input onChange={(event) =>handleSearch(event)}   className='home-search-input' type="text" placeholder='Search for contact by last name...'/>
        </div>

        {filteredData?.map((item,index)=>{
          const {_id,firstname,lastname,phonenumber} = item
          return(
            <>
            <div className="home-contact-detail">
               <div className="details-left">
                <h3>{firstname} {lastname}</h3>
                <div className="details-left-down">
                   <CallIcon/>
                   <h5>{phonenumber}</h5>
                </div>
              </div>
              <div className="">
               <EditIcon sx={{cursor:'pointer'}} onClick={handleClickOpen}/>
              <DeleteIcon sx={{cursor:'pointer'}} onClick={()=>handleDelete(_id)}/>
              </div>
           </div>
           <div>
    
             <Dialog open={open} onClose={handleClose}>
               <DialogTitle>Edit contact</DialogTitle>
               <DialogContent>
                 <TextField
                   autoFocus
                   margin="dense"
                   id="name"
                   onChange={e=>setFirstName(e.target.value)}
                   label="firstname"
                   type="email"
                   fullWidth
                   variant="outlined"
                 />

                 <TextField
                   autoFocus
                   margin="dense"
                   id="name"
                   onChange={e=>setLastName(e.target.value)}
                   label="lastname"
                   type="email"
                   fullWidth
                   variant="outlined"
                 />

                 <TextField
                   autoFocus
                   margin="dense"
                   id="name"
                   onChange={e=>setPhoneNumber(e.target.value)}
                   label="phonenumber"
                   type="email"
                   fullWidth
                   variant="outlined"
                 />
               </DialogContent>
               <DialogActions>
                 <Button onClick={handleClose}>Cancel</Button>
                 <Button onClick={()=>handleEdit(_id)} sx={{cursor:'pointer'}} variant='contained'>Edit</Button>
               </DialogActions>
             </Dialog>
         </div>
           </>
          )
        })}
       
      </div>

    
    </div>
    </>
  )
}

export default Home