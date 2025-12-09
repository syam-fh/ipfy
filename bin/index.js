#!/usr/bin/env node

import { exec } from 'child_process'
import select from '@inquirer/select'
import chalk from 'chalk'

const args = process.argv.slice(2)

function getLocalIPv4() {
  return new Promise((resolve, reject) => {
    exec("ip -4 -o addr show | awk '{print $4}' | cut -d/ -f1", (error, stdout, stderr) => {
      if (error) return reject(error)
      if (stderr) return reject(new Error(stderr))

      const ips = stdout
        .split('\n')
        .map((ip) => ip.trim())
        .filter((ip) => ip && ip !== '127.0.0.1')
      resolve(ips)
    })
  })
}

async function getPublicIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch (error) {
    throw new Error('Failed to fetch public IP: ' + error.message)
  }
}

function showHelp() {
  console.log(`
${chalk.bold('Usage:')} ipfy [options]

${chalk.bold('Options:')}
  ${chalk.green('--local')}       Show local IPv4 addresses
  ${chalk.green('--public')}      Show public IPv4 address
  ${chalk.green('--help, -h')}    Show this help message

If no flags are provided, interactive mode will be started.
  `)
}

async function promptUser() {
  const action = await select({
    message: 'Select:',
    choices: [
      { name: 'My Local IP Address', value: 'local' },
      { name: 'My Public IP Address', value: 'public' },
      { name: 'Both Local and Public IPs', value: 'both' },
      { name: 'Exit', value: 'exit' },
    ],
  })

  console.log('') // Add spacing

  switch (action) {
    case 'local':
      try {
        const ips = await getLocalIPv4()
        console.log(chalk.bold('Local IP(s):'))
        ips.forEach((ip) => console.log(chalk.green(`  ${ip}`)))
      } catch (err) {
        console.error(chalk.red('Error fetching local IP:'), err)
      }
      break
    case 'public':
      try {
        const ip = await getPublicIP()
        console.log(chalk.bold('Public IP:'))
        console.log(chalk.green(`  ${ip}`))
      } catch (err) {
        console.error(chalk.red('Error fetching public IP:'), err)
      }
      break
    case 'both':
      try {
        const localIps = await getLocalIPv4()
        console.log(chalk.bold('Local IP(s):'))
        localIps.forEach((ip) => console.log(chalk.green(`  ${ip}`)))
        
        console.log('') // Spacing

        const publicIp = await getPublicIP()
        console.log(chalk.bold('Public IP:'))
        console.log(chalk.green(`  ${publicIp}`))
      } catch (err) {
        console.error(chalk.red('Error fetching IPs:'), err)
      }
      break
    case 'exit':
      process.exit(0)
      break
  }
}

async function main() {
  if (args.includes('--help') || args.includes('-h')) {
    showHelp()
    return
  }

  if (args.includes('--local')) {
    try {
      const ips = await getLocalIPv4()
      ips.forEach((ip) => console.log(chalk.green(ip)))
    } catch (err) {
      console.error(chalk.red('Error:'), err)
    }
    return
  }

  if (args.includes('--public')) {
    try {
      const ip = await getPublicIP()
      console.log(chalk.green(ip))
    } catch (err) {
      console.error(chalk.red('Error:'), err)
    }
    return
  }

  if (args.length === 0) {
    await promptUser()
  }
}

main()
