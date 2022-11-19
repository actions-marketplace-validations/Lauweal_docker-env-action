import * as core from '@actions/core'
import {join} from 'path'
import * as env from 'dotenv'

async function run(): Promise<void> {
  try {
    const filepath: string = join(process.cwd(), core.getInput('path'))
    core.info(`环境文件地址：${filepath}`)
    const config = env.config({path: filepath})?.parsed
    const code = Object.entries(config!)
      .reduce((a: string[], b) => a.concat([`${b[0]}=${b[1]}`]), [])
      .join('\n')
    core.info('环境')
    core.setOutput('env', code)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
