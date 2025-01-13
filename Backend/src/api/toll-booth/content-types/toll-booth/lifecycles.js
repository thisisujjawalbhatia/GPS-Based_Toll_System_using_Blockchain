const axios = require("axios");


module.exports = {
    
    afterCreate(event) {
        const { result, params } = event;
        let id = result.id;
        let amount = result.rate;
        console.log(id,amount)
        axios.post("http://localhost:3000/assignTollAccount",{tollId:id?.toString(), amount:amount},{headers:{"Access-Control-Allow-Origin": "*"}})
      .then(res =>{
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
  }