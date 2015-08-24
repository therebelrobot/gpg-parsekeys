var expect = require('chai').expect
var parse = require('../gpg-parsekeys.js')
var fs = require('fs')

/* Definitions for JS Standard */
/* global describe, it */

describe('gpg-parsekeys', function () {
  it('should be a function', function (done) {
    expect(parse).to.be.an('function')
    done()
  })
  it('should parse curl data into coherent key objects', function (done) {
    fs.readFile(__dirname + '/fixtures/curl-output.txt', function (err, data) {
      if (err) throw err
      console.log(data.toString())
      data = data.toString()
      var parsedData = parse(data)
      console.log(parsedData)
      done()
    })
  })
  it('should parse cli data into coherent key objects', function (done) {
    fs.readFile(__dirname + '/fixtures/cli-output.txt', function (err, data) {
      if (err) throw err
      console.log(data.toString())
      data = data.toString()
      var parsedData = parse(data)
      console.log(parsedData)
      done()
    })
  })
})
