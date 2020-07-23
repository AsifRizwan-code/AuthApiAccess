const axios = require('axios');

const AuthAccess= {"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzaWYiLCJlbWFpbGlkIjoiYXNpZkBnbWFpbC5jb20iLCJpYXQiOjE1OTU0MTIwNjZ9.Hl0vj5xW6ORurulMQhZs6WhbC6fcOJS224VxnxptDV8",
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzaWYiLCJlbWFpbGlkIjoiYXNpZkBnbWFpbC5jb20iLCJpYXQiOjE1OTU0MTIwNjZ9.QJxkSpNYEGOZDrZfJNLdHOuVqps8AQbQkdP1pzsxQGU"};
const saveddata=[];
let i=0;
let saveflag = false;
let getproduct=()=>{
    axios.get('http://localhost:9090/product/get/',{
        headers: {
            Authorization:`Bearer ${AuthAccess.accessToken}`
        }}).then((data)=>{
            if(data.data.length > i){
                console.log("Value added",data.data);
                saveddata.push(data.data[data.data.length-1]);
                saveflag = true;
                i = data.data.length;
            }else{
                console.log("No data changed in upStream");
            }
    
            return data.data
        }).catch((err)=>console.log(err));
        if(saveflag){
            
            let newdata={};
            newdata.productName=saveddata[0].productName;
            newdata.Desc=saveddata[0].Desc;
            newdata.productid=saveddata[0].productid;
            saveddata.length = 0
            saveflag=false;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthAccess.accessToken}`
              };
            axios.post('http://localhost:9091/product/post/add',newdata,{headers:headers})
            .then((response)=>{
                    saveddata.length = 0
                    console.log("Inside promise"+response)  
            }).catch((err)=>{console.log(err)});








        }
        
    }
  
console.log("Line 19"+saveddata);
setInterval(getproduct, 3000);
