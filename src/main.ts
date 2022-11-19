import * as core from '@actions/core'
import {join} from 'path'
import * as env from 'dotenv'

async function run(): Promise<void> {
  try {
    const filepath: string = join(process.cwd(), core.getInput('path'))
    const filter: string[] = core.getInput('filter').split(',')
    core.info(`环境文件地址：${filepath}`)
    env.config({path: filepath})
    const code = Object.entries(process.env)
      .filter(item => filter.includes(item[0]))
      .reduce((a: string[], b) => a.concat([`${b[0]}=${b[1]}`]), [])
      .join('\n')
    core.info(`变量：${code}`)

    core.setOutput('env', code)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
