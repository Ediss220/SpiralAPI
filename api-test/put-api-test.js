const axios = require("axios")
const {expect} = require("chai")

const BaseURL = "https://jsonplaceholder.typicode.com/posts";

describe("Spiral API Test", () => {

it("edit user", async () => {
    
    const postId = 4;
    const editUser = {
      userId: 5,
      id: postId,
      title: 'Edit Test Title',
      body: 'Edit Test body'
    };
     return axios.put(BaseURL,editUser)
  
    .then(res => {
      expect(res.status).to.equal(200)
      expect(res.data).to.deep.include(editUser);
      
     })
      .catch(error => {
        expect(error.response.status).to.equal(404);
      });
   });
   
});
  
  
  