import * as core from '@actions/core'
import {readFileSync} from 'fs'

async function run(): Promise<void> {
    try {
        const pkg = JSON.parse(
            readFileSync('package.json', {encoding: 'utf8'})
        ) as {version: string}

        core.setOutput('version', pkg.version)
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()
