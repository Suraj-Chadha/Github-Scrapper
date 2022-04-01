const request = require("request");
const cheerio = require("cheerio");

function getPL(url){
    request(url,cb);
}

function cb(err,res,body){
    if(err){
        console.error("error: ",err);
    }else{
        getProjectLink(body);
    }
}
function getProjectLink(html){
    let selecTool = cheerio.load(html);
    let issueArr = selecTool('a[data-ga-click="Explore, go to repository issues, location:explore feed"]');
    for(let i = 0; i < 8; i++){
        let relativeLink = selecTool(issueArr[i]).attr("href");
        // console.log(relativeLink);
        let fullProjectLink = "https://github.com"+relativeLink;
        // console.log(fullProjectLink);
    }
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}

module.exports = {
    getPL:getPL,
}