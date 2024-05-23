import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from "axios";
import React ,{useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const baseUrl = "http://localhost:3000";

export default function UpdateGenre() {
  const [Genre, setGenre] = useState("");
  const [Description, setDescription] = useState("");

  const { genreId } = useParams();

  useEffect(() => {
    const url = baseUrl + "/genre/get/" + genreId;
    axios.get(url)
  .then(res => {
        if (res.data.success) {
          const data = res.data.data[0];
          setGenre(data);
          setDescription(data.description || "");
        }
        else {
            alert("Error web service")
        }
    })
    .catch(error => {
        alert("Error server: " + error)
    })
}, [genreId]);

function SendUpdate(){
  const url = baseUrl + "/genre/update/" + genreId
  console.log(Description)
  const datapost = {
      description : Description
  }
  axios.put(url, datapost)
  .then(response => {
      if (response.data.success === true) {
          alert(response.data.message)
      }
      else {
          alert("Error updating")
      }
  }).catch(error=>{
      alert("Error 34: " + error)
  })
}

return (
  <div>
      <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Descrição:</label>
              <input type="text" className="form-control" placeholder=""
              value={Description} onChange={(value)=>
              setDescription(value.target.value)}/>
          </div>
      </div>
      <button type="submit" className="btn btn-primary mt-2" onClick={()=>SendUpdate()}>Atualizar</button>
  </div>
);
}