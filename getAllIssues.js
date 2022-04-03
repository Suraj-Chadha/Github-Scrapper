const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const jspdf = require("jspdf");


function getAllIssues(url,topic){
    const doc = new jspdf.jsPDF();
    request(url,cb);
    function cb(err,res,body){
        if(err){
            console.error(err);
        }else{
            scrapeIssuesIntoPDF(body);
        }
    }
    function scrapeIssuesIntoPDF(html){
        let $ = cheerio.load(html);
        let repoName = $('.d-flex.flex-wrap.flex-items-center.wb-break-word.f3.text-normal a[data-pjax="#repo-content-pjax-container"]').text();
        // console.log(topic + "/"+ repoName);
        // let repoPath = path.join(__dirname,"Github Topics",topic,repoName+".pdf");
        // if(!fs.existsSync(repoPath)){
        //     fs.mkdirSync(repoPath);
        // }

        let issueArr = $('.flex-auto.min-width-0.p-2.pr-3.pr-md-2>a');
        let pdfPath = path.join(__dirname,"Github Topics",topic,repoName+".pdf");
        let count = 0;
        for(let i = 0; i < issueArr.length; i++){
            // doc.addPage();
            let issueTitle = $(issueArr[i]).text();
            let issueLink = $(issueArr[i]).attr("href");
            issueLink = `https:github.com${issueLink}`;
            // console.log(issueTitle+" ----> "+issueLink);
            doc.text(0,20+i+10,issueTitle);
            doc.text(0,20+i+20,issueLink);
            doc.addPage();
        }
        doc.save(pdfPath);

    }
}

module.exports = {
    getAI: getAllIssues,
}