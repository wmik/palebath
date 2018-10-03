# palebath


![Travis (.com)](https://img.shields.io/travis/com/wmik/palebath.svg?style=flat-square)
[![codecov coverage](https://img.shields.io/codecov/c/github/wmik/palebath.svg?style=flat-square)](https://codecov.io/github/wmik/palebath)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## Motivation
A tiny utility tool that generates simple standard reusable data

## Installation
`$ npm install palebath`

## Example usage
```js
const palebath = require("palebath");
// es6 => import palebath from "palebath";
palebath.getCharInfo("a");
// { upperCase: { CODE: 65, string: "A" }, lowerCase: { CODE: 97, string: "a" }, position: 1, index: 0 }
```

See [API documentation]()

## License
**MIT** &copy; wmik
