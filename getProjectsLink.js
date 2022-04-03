const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const {getAI} = require("./getAllIssues");
function getPL(url){
    request(url,cb);
}

function cb(err,res,body){
    if(err){
        console.error(err);
    }else{
        // console.log(body);
        getProjectLink(body);
    }
}
function getProjectLink(html){
    let $ = cheerio.load(html);
    let headingArr = $('.f3.color-fg-muted.text-normal.lh-condensed');
    // console.log($($(headingArr[0]).find('a')[1]).text().trim());
    let topicName = $('.h1').text().trim();
    let issueLinkArr = $('a[data-ga-click="Explore, go to repository issues, location:explore feed"]');
    let topicpath = path.join(__dirname, "Github Topics", topicName);
    if(!fs.existsSync(topicpath)){
        fs.mkdirSync(topicpath);
    }
    // console.log(topicName);
    for(let i = 0 ; i < 8; i++){
        // let repoName = $($(headingArr[i]).find('a')[1]).text().trim();
        // console.log(topicName,"/",repoName);
        let relativeLink = $(issueLinkArr[i]).attr("href");
        let fullPath = `https://github.com${relativeLink}`;
        // console.log(fullPath);
        getAI(fullPath,topicName);
    }

}
module.exports = {
    getPL:getPL,
}