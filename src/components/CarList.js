import React, {Component} from 'react'
import {SERVER_URL} from '../constants'
import Table from './Table'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  AddCar from "./AddCar";
import EditCar from './EditCar';
import {Button, Grid} from '@material-ui/core';
//import 'react-table/react-table.css'
import {CSVLink} from 'react-csv';

class CarList extends Component {

    constructor(props){
        super(props)
        this.state = {cars: []}
    }

    fetchCars = () => {
        const token = sessionStorage.getItem('jwt')
        fetch(SERVER_URL + 'api/cars',{headers:{'Authorization': token}})
            .then(response => response.json())
            .then(responseData => {
                this.setState({cars: responseData._embedded.cars})
            })
            .catch(error => console.log(error))
    }

    onDelClick = (link) => {
        if (window.confirm('Are you sure to delete ?')) {
            const token = sessionStorage.getItem('jwt')
            fetch(link, {method: 'DELETE', headers: {'Authorization': token}})
            .then(res => {
                this.fetchCars()
                toast.success('Car deletes',{position: toast.POSITION.BOTTOM_LEFT})
            })
            .catch(error => {
                toast.error('Error when deleting')
                console.log(error)
            })
        }
        
    }

    addCar = (car) => {
        const token = sessionStorage.getItem('jwt')
        fetch(SERVER_URL + 'api/cars', {
            method: 'POST', 
            headers:{'Content-type':'application/json', 'Authorization': token}, 
            body:JSON.stringify(car)
        })
        .then(res => {
            this.fetchCars()
            toast.success('Car added',{position: toast.POSITION.BOTTOM_CENTER})
        })
        .catch(err =>{
            toast.error('Error on adding car')
            console.log(err)
        })
    }

    updateCar = (car, link) =>{
        const token = sessionStorage.getItem('jwt')
        fetch(link, {
            method: 'PUT', 
            headers:{'Content-type':'application/json', 'Authorization': token}, 
            body:JSON.stringify(car)
        })
        .then(res => {
            this.fetchCars()
            toast.success('Changes saved',{position: toast.POSITION.BOTTOM_CENTER})
        })
        .catch(err =>{
            toast.error('Error on saved change car')
            console.log(err)
        })
    }

    handleLogout = () => {
        this.props.logout()
    }

    componentDidMount(){
        this.fetchCars()
    }

    render(){
        const columns =[
            {Header: 'Brand', accessor: 'brand'},
            {Header: 'Model', accessor: 'model'},
            {Header: 'Color', accessor: 'color'},
            {Header: 'Year', accessor: 'year', filterable:true},
            {Header: 'Price €', accessor: 'price'},
            {id: 'delbutton',width: 100, accessor: '_links.self.href',
                Cell: ({value}) => (<Button size="small" color="secondary" onClick={() => this.onDelClick(value)}>Delete</Button>)
            },

            {id: 'editbutton',width: 100, accessor: '_links.self.href',
                Cell: ({value, row}) => (
                    <EditCar car={row} link={value} updateCar={this.updateCar}  fetchCars={this.fetchCars} />),
                
            }
        ]


        return(
            <div className='App'>
                <Grid container>
                    <Grid item>
                        <AddCar addCar={this.addCar} />
                    </Grid>
                    <Grid item style={{padding:15}}>
                        <CSVLink data={this.state.cars} separator=";" >Export CSV</CSVLink>
                    </Grid>
                    <Grid item>
                        <Button onClick={this.handleLogout}>Logout</Button>
                    </Grid>
                </Grid>
                <Table columns={columns} data={this.state.cars}/>
                <ToastContainer autoClose={2000}/>
            </div>
        )
    }
}

export default CarList