const express = require('express');
const router = express.Router();
const https = require('https');

// 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
// authentication
router.get('/github/users/:user', async function(req, res) {
    const user = req.params.user;
    const options = {
        hostname: 'api.github.com',
        // api.github.com/users/YiqianDeng
        path: '/users/' + user,
        headers: {
            'User-Agent': 'Biosensics LLC'
        },
        OAuth: "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"
    }
    https.get(options, function(apiResponse) {
        var result = apiResponse.pipe(res);
        console.log(result)
    }).on('error', (e) =>{
        console.log(e);
        res.status(500).send('Something went wrong!');
    })
})

router.get('/github/:user/:issue', async function(req, res) {
    const issue = req.params.issue;
    const orgs = req.params.orgs;
    const repo = req.params.repo;
    const options = {
        hostname: 'api.github.com',
        // api.github.com/repos/biosensics/v-v-checklist-test/issues/18
        path: '/repos/' + orgs + '/' + repo + '/issues/' + issue,
        headers: {
            'User-Agent': 'Biosensics LLC'
        },
        OAuth: "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"
    }
    https.get(options, function(apiResponse) {
        apiResponse.pipe(res);
    }).on('error', (e) =>{
        console.log(e);
        res.status(500).send('Something went wrong!');
    })
})



module.exports = router;