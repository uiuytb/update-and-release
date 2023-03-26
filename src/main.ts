import * as core from '@actions/core'
import * as github from '@actions/github'
import {readFileSync} from 'fs'

async function run(): Promise<void> {
    try {
        const token = core.getInput('token')
        const pkg = JSON.parse(
            readFileSync('package.json', {encoding: 'utf8'})
        ) as {version: string}
        const {repo, owner} = github.context.repo
        const GitHub = github.getOctokit(token)

        // core.info(JSON.stringify(GitHub.rest.git.getCommit()))

        core.debug(pkg.version)
        const d = await GitHub.rest.repos.createRelease({
            repo,
            tag_name: pkg.version,
            owner,
            generate_release_notes: true
        })
        core.info(`${d.status}`)
        core.info(d.data.url)
        if (core.isDebug()) {
            core.debug(JSON.stringify(github.context))
        }
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()
