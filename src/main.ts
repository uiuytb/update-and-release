import * as core from '@actions/core'
import {readFileSync} from 'fs'

async function run(): Promise<void> {
    try {
        core.debug(readFileSync('package.json', {encoding: 'utf8'}))
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()
