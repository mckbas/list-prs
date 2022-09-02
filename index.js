import core from '@actions/core';
import github from '@actions/github';

try {
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    const githubRequest = await github.getOctokit().rest.pulls.list({
        owner, repo, per_page: 100
    });
    const prList = [];
    githubRequest.forEach((pr) => {
        prList.push(pr['number']);
    })
    core.setOutput('prs', prList)
} catch (error) {
    core.setFailed(error.message);
}