import * as core from '@actions/core'
import * as github from '@actions/github'
import {readFileSync} from 'fs'

async function run(): Promise<void> {
    try {
        const pkg = JSON.parse(readFileSync('package.json', {encoding: 'utf8'}))
        core.debug(pkg.version)
        core.info(JSON.stringify(github.context))
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()
