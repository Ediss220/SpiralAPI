const axios = require("axios")
const {expect} = require("chai")

const BaseURL = "https://jsonplaceholder.typicode.com/posts";

describe("Spiral API Test", () => {
   
  it("api-test", () => {
     return axios.get(BaseURL)
      .then(res => {
         expect(res.status).equals(200);
         expect(res.data).to.be.an('array').that.is.not.empty
         //console.log(res.data);
        })
       .catch(error => {
         console.error(error);
       });
   });



   it("return a specific post by id", async () => {
    const postId = 11;
    return axios.get(`${BaseURL}/${postId}`)

    .then(res => {
      expect(res.status).to.equal(200)
      expect(res.data.id).to.equal(postId);
      
     })
      .catch(error => {
        console.error(error);
      });
   });



   it("return a specific user by title", async () => {
    const title = 'enim unde ratione doloribus quas enim ut sit sapiente';
    return axios.get(BaseURL)

    .then(res => {
      expect(res.status).to.equal(200)
      const user = res.data[73];
      expect(user.title).to.equal(title);
      //console.log(res.data[73]);
     })
      .catch(error => {
        console.error(error);
      });
   });



   it("return comments for a specific post", async () => {
    const postId = 11;
    return axios.get(`${BaseURL}/${postId}/comments`)

    .then(res => {
      expect(res.status).to.equal(200)
      for (const comment of res.data) {
        expect(comment.postId).to.equal(postId);
      }
      //console.log(res.data);
     })
      .catch(error => {
        console.error(error);
      });
   });



   it('return a 404 response for an invalid post id', async function() {
    const invalidPostId = 211;
    try {
      await axios.get(`${BaseURL}/${invalidPostId}`);
    } catch (error) {
      expect(error.response.status).to.equal(404);
    }
  });

   
   it("leght-test", () => {
    return axios.get(BaseURL)
    .then(res => {
        expect(res.status).equals(200);
        expect(res.data).to.be.an('array').that.is.not.empty
        expect(res.data.length).greaterThan(0)
      })
      .catch(error => {
        console.error(error);
      });
   });


   it("invalid endpoint", async () => {
    try{
    await axios.get("https://jsonplaceholder.typicode.com/postsed");
  } catch (error) {
    expect(error.response.status).to.equal(404);
  }
});


it('response time test', async function() {
  this.timeout(5000);
  const startTimestamp = new Date().getTime();
  const res = await axios.get(BaseURL);
  const endTimestamp = new Date().getTime();

  const resTime = endTimestamp - startTimestamp;
  const acceptableMaxResponseTime = 100;

  expect(resTime).to.be.at.most(acceptableMaxResponseTime);
});


it('should handle rate limiting', async function() {
  this.timeout(5000);
  try {
    // Send a burst of requests in a loop to trigger rate limiting
    for (let i = 0; i < 120; i++) {
      await axios.get(BaseURL);
    }
  } catch (error) {
    expect(error.response.status).to.equal(429);
    expect(error.response.data.message).to.include('Rate limit exceeded');
  }
});

 });