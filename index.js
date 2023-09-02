
const { log } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");
require("./server");
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

function readData(filename){
    let map = new Map();
    let shortfile = new ShortsFile(); 
    let arr = [];  
    fs.readFile(filename,(err,data)=>{

        let line = data.toString().split("\n");
          

        for(let i = 0 ; i < line.length ; i++){
            const currentLine = line[i];
            if(currentLine.includes("youtube")){
                const url = currentLine.split(" ")[0];
                const title = currentLine.substring(currentLine.indexOf(" "),currentLine.length);
                shortfile.url = url.replace("shorts","embed")
                shortfile.title = title;
                arr.push(shortfile);
            }
        
        
        }
        //console.log(arr);
        return arr;

    })
}

app.get("/",(req,res)=>{
    let map = new Map();
    
      
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
        //res.send(arr);
        res.render("shorts",{arr:arr.slice(0,2)});

    })
})



app.listen(3000,()=>{
    console.log("app listening on port 3000");
})
