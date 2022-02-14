const axios = require('axios');


(async () => {
    console.log('in main func')

    // analyze script parameters
    var orgs = process.argv[2]
    var repo = process.argv[3]
    var issueNumber = process.argv[4]
    var user = process.argv[5]

    var getIssueUrl = 'https://api.github.com/repos/' + orgs + '/' + repo + '/issues/' + issueNumber;

    // get current issue body
    var bodyContent = await getIssueBody(getIssueUrl)

    // analyze issue body and create new issues
    // var newIssues = await analyzeBody(bodyContent)

    // create new issues
    createIssue(Yiqian, repo)
})()


// get issue body
function getIssueBody(issueUrl) {
    return new Promise(resolve => {
        axios.get(issueUrl, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Biosensics LLC',
                Authorization: 'token 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'
            }
        }).then((response) => {
            var bodyContent = response.data.body
            // console.log(bodyContent)
            resolve(bodyContent)
        })
    })
}

// analyze issue body
function analyzeBody(body) {
    return new Promise(resolve => {
        console.log(body)
        var result = []

        // break into several blocks
        var blocks = body.split('\r\n\r\n')

        for (var i = 0; i < blocks.length; i++) {

        }

        // console.log(blocks)

        // return issues we need to create
        resolve(result)
    })
}

// create issue
function createIssue(user, repo) {
    octokit.request('POST /repos/{user}/{repo}/issues'), {
        user: user,
        repo: repo,
        title: 'title',
        body: 'body'
    }
}

// update current issue after create new issue
function updateCurrentIssue() {

}
