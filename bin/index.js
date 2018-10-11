#!/usr/bin/env node

const path = require('path')
const request = require('request-promise')
const argv = require('minimist')(process.argv.slice(2));

(argv.packages || '')
  .split(',')
  .forEach(cp => {

    const { appId, name, version } = require(`${cp}/package.json`)

    // testing
    if (argv.test) {
      console.log(argv['request-url'], appId, version, name)
      return
    }

    request.post({
      'url': argv['request-url'],
      'form': {
        appId,
        'versionName': version,
        'uiProjectName': name
      }
    })
  })

