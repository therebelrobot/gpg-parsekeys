var expect = require('chai').expect
var parse = require('../gpg-parsekeys.js')
var fs = require('fs')
var cliParsed = require('./fixtures/cli-parsed.json')
var curlParsed = require('./fixtures/curl-parsed.json')

/* Definitions for JS Standard */
/* global describe, it */

describe('gpg-parsekeys', function () {
  it('should be a function', function (done) {
    expect(parse).to.be.an('function')
    done()
  })
  it('should parse cli data into coherent key objects', function (done) {
    fs.readFile(__dirname + '/fixtures/cli-output.txt', function (err, data) {
      if (err) throw err
      data = data.toString()
      var parsedData = parse(data)
      expect(parsedData).to.be.an('array')
      expect(parsedData).to.deep.equal(cliParsed)
      done()
    })
  })
  it('should parse curl data into coherent key objects', function (done) {
    fs.readFile(__dirname + '/fixtures/curl-output.html', function (err, data) {
      if (err) throw err
      data = data.toString()
      var parsedData = parse(data)
      expect(parsedData).to.be.an('array')
      expect(parsedData).to.deep.equal(curlParsed)
      done()
    })
  })
})
