import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React ,{useEffect, useState} from "react";
import axios from 'axios';

const baseUrl = "http://localhost:3000";

export default function CreateMovie(){
    
    const [Title, setTitle] = useState("");
    const [Photo, setPhoto] = useState("");
    const [Genre, setGenre] = useState("");
    const [Description, setDescription] = useState("");
    const [dataGenre, setdataGenre] = useState([]);

    useEffect(() => {
        const url = baseUrl + "/genre/list";
        axios.get(url)
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setdataGenre(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert(error)
        })
    }, []);
    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Title</label>
                    <input type="text" className="form-control" placeholder="Titulo"
                    value={Title} onChange={(value)=>
                        setTitle(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Insert a Photo:</label>
                    <input type="text" className="form-control" placeholder="Path foto"
                    value={Photo} onChange={(value)=>
                        setPhoto(value.target.value)}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Genre</label>
                    <select id="inputState"
                    className="form-control" value = {Genre}
                    onChange={(value) => setGenre(value.target.value)}>
                        <option defaultValue>Select..</option>
                        <LoadGenre/>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Description:</label>
                    <input type="text" className="form-control" placeholder="Description"
                    onChange={value =>
                        setDescription(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2" onClick={()=>SendSave()}>Add Movie</button>
        </div>
    )

    function LoadGenre(){
        return dataGenre.map((data, index) => {
            return(
                <option key={index} value ={data.id}>{data.description}</option>
        )
        })
    }

    function SendSave(){ 
        if (Genre === "") {
            alert("Select Genre!")
        }
        else if (Title === "") {
            alert("Choose a title!")
        }
        else if (Photo === "") {
            alert("Insert a Photo!")
        }
        else if (Genre === "") {
            alert("Write a description")
        }
        else {
            const url = baseUrl + "/movie/create"
            const datapost = {
                
                title: Title,
                photo: Photo,
                genre: Genre,
                description: Description
            }
            axios.post(url, datapost)
            .then(response => {
                if (response.data.success===true) {
                        alert(response.data.message)
                }
                else {
                        alert(response.data.message)
                }
            })
            .catch(error=>{
                alert("Error 34 " + error)
            });
        }
    }
}