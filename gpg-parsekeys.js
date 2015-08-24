var debug = require('debug-log2')
var _ = require('lodash')
var htmlparser = require('htmlparser2')

module.exports = function _parseKey (keyArray, secrets) {
  debug('_parseKey entered')
  if (_.isString(keyArray) && !_isHTML(keyArray)) {
    keyArray = keyArray.split('\n\n')
  }
  if (_.isString(keyArray) && _isHTML(keyArray)) {
    var parsed = []
    var parser = new htmlparser.Parser({
      ontext: function (text) {
        parsed.push(text)
      }
    }, {
      decodeEntities: true
    })
    parser.write(keyArray)
    parser.end()
    parsed = parsed.join('').split('Search results for')[2].split('\n')
    parsed.shift()
    parsed = parsed.join('\n').split('pub')
    parsed = _.map(parsed, function (line, index) {
      if (line.length > 0) {
        return 'pub' + line
      }
      return ''
    })
    keyArray = parsed
  }
  var allKeys = _.map(keyArray, function _parseKeyMap (key, index) {
    key = key.split('\n')
    if (index === 0) {
      key.shift()
      key.shift()
    }
    if (key.length > 1) {
      var keydate = key[0]
      var keyprint = keydate.match(/\/([A-Z|0-9]*)/)
      keyprint = keyprint ? keyprint[1].trim() : ''
      var date = keydate.match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/)
      date = date ? date[0].trim() : ''
      var fingerprint = key[1].match(/\=([\w|\s]*)/)
      fingerprint = fingerprint ? fingerprint[1].trim() : ''
      var type = 'public'
      if (secrets && secrets.indexOf(keyprint) > -1) {
        type = 'secret'
      }
      var uids = _.map(key, function _parseKeyMapUidMap (line) {
        if (line.match(/^uid*.*/)) {
          line = line.split('uid ')
          line.shift()
          if (line.length === 1) {
            line = line[0]
          } else {
            line = line.join('uid ')
          }
          line = line.trim()
          if (line.indexOf(']') > -1) {
            line = line.split(']')[1]
          }
          var uid = {}
          uid.type = line.match(/\[(.*)\]/)
          uid.type = uid.type ? uid.type[1] : ''
          uid.comment = line.match(/\((.*)\)/)
          uid.comment = uid.comment ? uid.comment[1] : ''
          uid.name = line.split(' <')[0]
          if (uid.name.indexOf(' (') > -1) {
            uid.name = uid.name.split(' (')[0]
          }
          uid.email = line.match(/\<(.*)\>/)
          uid.email = uid.email ? uid.email[1].trim() : ''
          return uid
        }
      })
      uids = _.without(uids, undefined)
      sigs = _.map(key, function _parseKeyMapSigMap (line) {
        if (line.match(/^sig*.*/)) {
          var sig = {}
          sig.id = line.match(/sig[3|2]?\s*([A-Z|0-9]{8})/)
          sig.id = sig.id ? sig.id[1] : false
          sig.date = line.match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/)
          sig.date = sig.date ? sig.date[0].trim() : ''
          sig.name = line.split('__________ ')
          sig.name = sig.name[sig.name.length - 1].split('\r')[0]
          sig.email = sig.name ? sig.name.match(/\<(.*)\>/) : false
          sig.email = sig.email ? sig.email[1].trim() : ''
          sig.comment = sig.name ? sig.name.match(/\((.*)\)/) : false
          sig.comment = sig.comment ? sig.comment[1] : ''
          sig.name = sig.name.split(' <')[0]
          if (sig.name.indexOf(' (') > -1) {
            sig.name = sig.name.split(' (')[0]
          }
          if (sig.id && sig.name.indexOf('[selfsig]') < 0) {
            return sig
          }
        }
      })
      var sigs = _.without(sigs, undefined)
      var subs = _.map(key, function _parseKeyMapSubMap (line) {
        if (line.match(/^sub*.*/)) {
          var sub = {}
          sub.keyprint = line.match(/\/([A-Z|0-9]*)/)
          sub.keyprint = sub.keyprint ? sub.keyprint[1] : false
          sub.date = line.match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/)
          sub.date = sub.date ? sub.date[0].trim() : ''
          sub.expires = line.match(/\[(.*)\]/)
          sub.expires = sub.expires ? sub.expires[0].match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/) : ''
          sub.expires = sub.expires ? sub.expires[0].trim() : ''
          return sub
        }
      })
      subs = _.without(subs, undefined)
      var returnKey = {
        key: keyprint,
        fingerprint: fingerprint,
        date: date,
        uids: uids,
        subs: subs,
        sigs: sigs,
        type: type
      }
      return returnKey
    }
    return false
  })
  allKeys = _.without(allKeys, false)
  return allKeys
}

function _isHTML (string) {
  return string.indexOf('<body') > -1
}
