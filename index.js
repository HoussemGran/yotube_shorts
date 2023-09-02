
const { log } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

class ShortsFile{
    
    url;
    title;

    ShortsFile(url , title){
        this.url = url;
        this.title = title;
    }

    ShortsFile(){

    }

}


app.get("/shorts",(req,res)=>{

    let limit = 5;
    let filter = "";
    
    if(req.query.limit != null){
        limit = req.query.limit;
    }

    if(req.query.filter != null){
        filter = req.query.filter;
    }
      
    fs.readFile("peterson.txt",(err,data)=>{
        let arr = [];
        let shortfile = new ShortsFile(); 
        let line = data.toString().split("\n");

        for(let i = 0 ; i < line.length ; i++){
            const currentLine = line[i];
            if(currentLine.includes("youtube")){
                const url = currentLine.split(" ")[0];
                const title = currentLine.substring(currentLine.indexOf(" "),currentLine.length);
                shortfile.url = url.replace("shorts","embed")
                shortfile.title = title;
                arr.push(shortfile);
                shortfile = new ShortsFile();
            }
        } 
        let all = arr;
        if(filter != ""){
            arr = arr.filter((short)=>{
                return short.url.includes(filter);
            })    
        }
        res.render("shorts",{arr:arr.slice(0,limit),all:all});
    })
})



app.listen(3000,()=>{
    console.log("app listening on port 3000");
})
