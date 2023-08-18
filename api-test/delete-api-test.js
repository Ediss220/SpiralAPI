const axios = require("axios")
const {expect} = require("chai")

const BaseURL = "https://jsonplaceholder.typicode.com/posts";

describe("Spiral API Test", () => {

it("delete user", async () => {
    
    const deletepostId = 4;
        return axios.delete(`${BaseURL}/${deletepostId}`)
  
    .then(res => {
      expect(res.status).to.equal(200)
         
      });
   });
   
});