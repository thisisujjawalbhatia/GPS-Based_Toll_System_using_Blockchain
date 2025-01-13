const axios = require("axios");

module.exports = {
    
    afterCreate(event) {
        const { result, params } = event;

        let user = params.data.user.connect[0].id;
        let toll = params.data.toll_booth.connect[0].id;
        // console.log("RELATIOINS", params.data.user.connect, params.data.toll_booth.connect)
        // console.log(id,amount)
        console.log(user,toll)
        axios.post("http://localhost:3000/payToll",{userId:user?.toString(),tollId:toll?.toString()},{headers:{"Access-Control-Allow-Origin": "*"}})
      .then(res =>{
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
  }