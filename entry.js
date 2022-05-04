const { Octokit } = require("@octokit/core");

(async () => {
    // analyze script parameters
    var owner = process.argv[2]
    var repo = process.argv[3]
    var issueNumber = process.argv[4]

    const octokit = new Octokit({ auth: `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` }); // this is the credential

    // get current issue body
    var bodyContent = await getIssueData(owner, repo, issueNumber, octokit)

    // analyze issue body and get (all issues we need to create) and (information for update current issue).
    var result = await analyzeBody(bodyContent)
    var newIssues = result[0]
    var updateIssue = result[1]

    // create new issues
    var issueNumbersCreated = []

    for (let i = 0; i < newIssues.length; i++) {
        var currentTitle = newIssues[i]

        await delay(3000)
        var eachIssueNumber = await createAPICall(owner, repo, octokit, currentTitle, i + 1)
        issueNumbersCreated.push(eachIssueNumber)
    };

    // replace placeholder in updateIssue to specific issue number with #
    var updatedIssue = await replacePlaceholder(updateIssue, issueNumbersCreated)
    // update current issue
    await updateCurrentIssue(owner, repo, issueNumber, octokit, updatedIssue)
})()

function replacePlaceholder(updateIssue, issueNumbersCreated) {
    console.log('replace placeholders ...')
    return new Promise((resolve) => {
        var result = []
        var title = updateIssue[0]
        var body = updateIssue[1]
        for (let i = 0; i < issueNumbersCreated.length; i++) {
            var str = '#' + issueNumbersCreated[i]
            var newBody = body.replace('<placeholder>', str)
            body = newBody
        }
        result.push(title)
        result.push(body)
        resolve(result)
    })
}

function analyzeBody(data) {
    return new Promise((resolve) => {
        // variables init: createIssueInfo, updateIssueInfo, newBody
        var createIssueInfo = [] // [title1, title2, title3, ...]
        var updateIssueInfo = [data.title] // [data.title, data.newBody]
        var newBody = []

        // break into each line
        var eachLine = data.body.split('\r\n')

        for (var i = 0; i < eachLine.length; i++) {
            if (eachLine[i].substring(0, 6) === '- [ ] ') {
                createIssueInfo.push(eachLine[i].substring(6))
                newBody.push('- [ ] <placeholder>')
            } else {
                newBody.push(eachLine[i])
            }
        }

        updateIssueInfo.push(newBody.join('\r\n'))
        // return lst of issue title we need to create, and updated content of current issue
        resolve([createIssueInfo, updateIssueInfo])
    })
}



// get issue body api call
function getIssueData(owner, repo, issueNumber, octokit) {
    console.log('in getIssueData function!')
    return new Promise((resolve) => {
        octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
            owner: owner,
            repo: repo,
            issue_number: issueNumber
        }).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
        })
    })
}

// create issues helper functions. delay create to not exceed limit
const delay = function (time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(time);
        }, time);
    })
};

// create issue api call
const createAPICall = function (owner, repo, octokit, title, times) {
    return new Promise((resolve) => {
        octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: owner,
            repo: repo,
            title: title
        }).then((response) => {
            console.log('create api call success', times)
            resolve(response.data.number)
        }).catch((error) => {
            console.log(error)
            console.log('failed to create some issue!')
        })
    })
}

// update issue api call
function updateCurrentIssue(owner, repo, issueNumber, octokit, updatedIssue) {
    return new Promise((resolve) => {
        console.log('in updateCurrentIssue function!')
        var title = updatedIssue[0]
        var body = updatedIssue[1]
        octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
            owner: owner,
            repo: repo,
            issue_number: issueNumber,
            title: title,
            body: body
        }).then((response) => {
            console.log('current issue updated!')
        }).catch((error) => {
            console.log(error)
        })
    })
}


// previous algorithm handle assigner, save for future modify.

// analyze issue body // with assigner version
// function analyzeBody(data) {
//     console.log('in analyzeBody function!')
//     return new Promise(resolve => {
//         // return: 1. a nested list contain all issues we need to create
//         // 2. a list contain all we need to update current issue.
//         var createIssueInfo = [] // [[title, Assignee], [title2, Assignee2]...]
//         var updateIssueInfo = [data.title] // [data.title, data.newBody]
//         var newBody = []

//         // break into several blocks
//         var blocks = data.body.split('\r\n\r\n')

//         var currentAssignee = ''

//         for (var i = 0; i < blocks.length; i++) {
//             var lst = arrTrim(blocks[i].split('\r\n'))
//             if (blocks[i].includes('**@')) {
//                 if (lst.length > 1) {
//                     currentAssignee = getAssignee(lst[0])
//                     var pair = createIssueInfoHelper(lst, currentAssignee, createIssueInfo, newBody)
//                     createIssueInfo = pair[0]
//                     newBody = pair[1]
//                 } else {
//                     currentAssignee = getAssignee(lst[0])
//                     // will modify each element in arr and push to newBody
//                     newBody.push(blocks[i])
//                 }
//             } else if ((blocks[i].includes('Server:') || blocks[i].includes('Application:'))) {
//                 var pair = createIssueInfoHelper(lst, currentAssignee, createIssueInfo, newBody)
//                 createIssueInfo = pair[0]
//                 newBody = pair[1]

//                 // will modify each element in arr and push to newBody
//             } else {
//                 // other than include **@ and Server/Application.
//                 if (lst.length > 1) {
//                     for (var j = 0; j < lst.length; j++) {
//                         if (lst[j].substring(0, 6) === '- [ ] ') createIssueInfo = createIssueInfoHelper([lst[j]], currentAssignee, createIssueInfo)
//                         else {

//                             // add to new body
//                         }
//                     }
//                 } else {
//                     // add to new body
//                     newBody.push(blocks[i])
//                 }
//             }
//         }

//         // console.log(createIssueInfo)
//         // return issues we need to create
//         resolve([createIssueInfo, updateIssueInfo])
//     })
// }

// // helper function modify createIssueInfo
// function createIssueInfoHelper(lst, currentAssignee, createIssueInfo) {
//     // console.log('in createIssueInfoHelper')
//     for (var i = 0; i < lst.length; i++) {
//         // create new list, with title and Assignee, push to createIssueInfo
//         var currentIssue = []
//         // 2 type if already have Assignee, or not
//         if (lst[i].includes('@')) {
//             // different Assignee

//             if (lst[i].substring(0, 6) === '- [ ] ') {
//                 var tempList = lst[i].substring(6).split(' ')
//                 currentIssue = [tempList.slice(0, tempList.length - 1).join(' '), tempList[tempList.length - 1]]
//                 createIssueInfo.push(currentIssue)
//             } else {
//                 // add to new body
//             }

//         } else {
//             if (lst[i].substring(0, 6) === '- [ ] ') {
//                 // title + Assignee
//                 currentIssue = [lst[i].substring(6), currentAssignee]
//                 createIssueInfo.push(currentIssue)
//             }
//             else {
//                 // add to new body
//             }
//         }
//     }
//     return createIssueInfo
// }

// // helper function list trim
// function arrTrim(arr) {
//     var newArr = []
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i] != '') {
//             newArr.push(arr[i])
//         }
//     }
//     return newArr
// }

// // helper function get Assignee
// // need to identify format of assignee later
// function getAssignee(str) {
//     var lst = str.split(' ')
//     var result = ''
//     for (var i = 0; i < lst[0].length; i++) {
//         if (lst[0][i] != '*') {
//             result += lst[0][i]
//         }
//     }

//     return result
// }