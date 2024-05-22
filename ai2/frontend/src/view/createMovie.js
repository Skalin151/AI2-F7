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
                    <label htmlFor="inputPassword4">Título</label>
                    <input type="text" className="form-control" placeholder=""
                    value={Title} onChange={(value)=>
                        setTitle(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Insira Foto:</label>
                    <input type="text" className="form-control" placeholder=""
                    value={Photo} onChange={(value)=>
                        setPhoto(value.target.value)}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Género</label>
                    <select id="inputState"
                    className="form-control" value = {Genre}
                    onChange={(value) => setGenre(value.target.value)}>
                        <option defaultValue></option>
                        <LoadGenre/>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Descrição:</label>
                    <input type="text" className="form-control" placeholder=""
                    onChange={value =>
                        setDescription(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2" onClick={()=>SendSave()}>Adicionar</button>
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
            alert("Selecione um género!")
        }
        else if (Title === "") {
            alert("Coloque um título!")
        }
        else if (Photo === "") {
            alert("Insira o Link de uma Foto!")
        }
        else if (Genre === "") {
            alert("Insira uma descrição")
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