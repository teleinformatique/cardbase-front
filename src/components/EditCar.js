import  React, {useState}  from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@material-ui/core";

const EditCar = (props) =>{
    const [open, setOpen] = useState(false)
    const [car, setCar] = useState({brand: '', model:'', colo:'', price:'', year:'', owner:''})

    const toggleModal = () =>{
        setOpen(!open)
        setCar({
            brand: props.car.original.brand, 
            model: props.car.original.model, 
            color: props.car.original.color, 
            price: props.car.original.price, 
            year: props.car.original.year, 
            //owner: props.car.original._links.owner.href
        })
    }

    const handleChange = (eve) => {
        setCar({...car, [eve.target.name]: eve.target.value})
    }

    const handleSave = () => {
        props.updateCar(car, props.link)
        toggleModal()
    }

    return(
        <div>
            <Button size="small" onClick={toggleModal} style={{margin:10}}>Edit</Button>
            <Dialog open={open}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField  autoFocus fullWidth value={car.brand} label="Brand" name="brand" onChange={handleChange}/> <br/>
                    <TextField autoFocus fullWidth value={car.model}  label="Model" name="model" onChange={handleChange}/><br/>
                    <TextField autoFocus fullWidth value={car.color} label="Color" name="color" onChange={handleChange}/><br/>
                    <TextField autoFocus fullWidth value={car.year} label="Year" name="year" onChange={handleChange}/><br/>
                    <TextField autoFocus fullWidth value={car.price} label="Price" name="price" onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCar