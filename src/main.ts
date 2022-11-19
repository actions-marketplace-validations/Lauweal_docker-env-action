import * as core from '@actions/core'
import { join } from 'path'
import * as env from 'dotenv'

async function run(): Promise<void> {
  try {
    const filepath: string = join(process.cwd(), core.getInput('path'))
    core.info(`环境文件地址：${filepath}`)
    const config = env.config({ path: filepath })?.parsed

    core.setOutput('env', config)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
