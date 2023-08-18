const axios = require("axios")
const {expect} = require("chai")

const BaseURL = "https://jsonplaceholder.typicode.com/posts";

describe("Spiral API Test", () => {

it("create a new user", async () => {
    const newUser = {
      userId: 101,
      title: 'Add Test Title',
      body: 'Test body'
    };
     return axios.post(BaseURL,newUser)
  
    .then(res => {
      expect(res.status).to.equal(201)
      expect(res.data).to.deep.include(newUser);
      
     })
      .catch(error => {
        console.error(error);
      });
   });
   
});
  
  
  