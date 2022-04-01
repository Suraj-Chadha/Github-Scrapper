const url = "https://github.com/topics";

const request = require("request");
const cheerio = require("cheerio");
const {getPL} = require("./getProjectsLink");

request(url,cb); // request the url https://github.com/topics

function cb(err,res,body){ // callback function of request
    if(err){
        console.error("error: ", err);
    }else{
        // console.log("success");
        getFirst3FeaturedTopics(body);
    }
}

function getFirst3FeaturedTopics(html){ //function that will get us first 3 links to topic
    let selecTool = cheerio.load(html);
    let topicArr = selecTool('.no-underline.flex-grow-0'); // will return array of all the topics
    // console.log(topicArr[0]);
    // console.log(topicArr.text());
    for(let i = 0; i < 3; i++){
        let relativeLink = selecTool(topicArr[i]).attr("href"); //relative link to topic eg: /topics/3d
        // console.log(relativeLink);
        let fullUrlToTopic = "https://github.com" + relativeLink; //full link to open topic eg: https://github.com/topics
        // console.log(fullUrlToTopic);
        getPL(fullUrlToTopic);
        
    }
}