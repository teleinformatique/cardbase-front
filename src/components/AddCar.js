import  React, {useState}  from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button,TextField } from "@material-ui/core";

const AddCar = (props) =>{
    const [open, setOpen] = useState(false)
    const [car, setCar] = useState({brand: '', model:'', colo:'', price:'', year:''})

    const toggleModal = () =>{
        setOpen(!open)
    }

    const handleChange = (eve) => {
        setCar({...car, [eve.target.name]: eve.target.value})
    }

    const handleSave = () => {
        props.addCar(car)
        toggleModal()
    }

    return(
        <div className='test'>
            <Button variant="outlined" color="primary" onClick={toggleModal} style={{margin:10}}>Add Car</Button>
            <Dialog open={open}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField  label="Brand" name="brand" onChange={handleChange}/> <br/>
                    <TextField  label="Model" name="model" onChange={handleChange}/><br/>
                    <TextField  label="Color" name="color" onChange={handleChange}/><br/>
                    <TextField  label="Year" name="year" onChange={handleChange}/><br/>
                    <TextField label="Price" name="price" onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddCar