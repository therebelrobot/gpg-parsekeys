# gpg-parsekeys

A simple node module to parse PGP key information from either gpg cli output or html from a keyserver and outputs a handy collection of objects.

## Install

```bash
npm install gpg-parsekeys
```

## Usage

Given either cli output of `gpg --listkeys` or HTML of a keyserver request, you can pass this into
gpg-parsekeys as follows:

```javascript
var parse = require('gpg-parsekeys')

var parsedOutput = parse(cliOutput)

// Sample output:
// [
//   {
//     "key": "9CA54517",
//     "fingerprint": "",
//     "date": "2012-07-10",
//     "uids": [
//       {
//         "type": "",
//         "comment": "",
//         "name": " Awesome Dude",
//         "email": "awesomedude@eff.org"
//       }
//     ],
//     "subs": [
//       {
//         "keyprint": "9E2234D4",
//         "date": "2012-07-10",
//         "expires": "2016-07-10"
//       }
//     ],
//     "sigs": [],
//     "type": "public"
//   }, ...
// ]

```
## Contributing

If you find an error in the module, please [open a Github Issue](). If you're handy with code, feel free to fork/PR the update, and I'll get it in asap!

## License

[ISC](https://tldrlegal.com/license/-isc-license)

Copyright (c) 2015, Trent Oswald (@therebelrobot) <trentoswald@therebelrobot.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
