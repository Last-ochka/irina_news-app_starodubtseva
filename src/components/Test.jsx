import React from "react";
import axios from "axios";
import { useState } from "react";

const Test = () => {
   const getFiles = () => {
        axios
            .get('http://localhost:3000/tasks')
            .then(function (response) {  
                   console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

return (
    <div>
<button onClick={getFiles}>Test Ruby</button>

    </div>
)

}
export default Test;