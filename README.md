<p align="center">
  <img alt="Nimble logo" src="https://assets.nimblehq.co/logo/light/logo-light-text-320.png" />
</p>

<p align="center">
  <strong>React Templates</strong>
</p>


---

<p align="center">
  <a href="https://www.npmjs.com/package/cra-template-nimble"><img src="https://badgen.net/npm/v/cra-template-nimble" /></a>
  <a href="https://www.npmjs.com/package/cra-template-nimble"><img src="https://badgen.net/npm/dy/cra-template-nimble" /></a>
</p>

Our template offers a rich boilerplate to jump-start React-based application development with [Create React App](https://github.com/facebook/create-react-app).
The complete list of features included in this template is available on [the Wiki](https://github.com/nimblehq/react-templates/wiki).

## Getting Started

### Prerequisites

[![node-version-image](https://img.shields.io/badge/node-16.14.2-brightgreen.svg)](https://nodejs.org/download/release/v16.14.2/)

### Usage

* With CLI tool

Start the CLI to generate the React application

```bash
npm install -g @nimblehq/react-template

nimble-react generate {application-name}
```

* With npx

```bash
npx @nimblehq/react-template generate {application-name}
```

## Template structure

This project uses [Lerna](https://lerna.js.org/) to manage packages. The packages are consist of

* The CLI tool facilitates the process of application generating
* CRA template

```bash
├─ packages
│ ├─ cli-tool
│ └─ cra-template
├── .gitignore
├── LICENSE
├── package.json
├── README.md
└── template.json
```

`Typescript` is used by default for our React applications.

## How to contribute

* Install Lerna for accessing to the lerna CLI.

* To contribute to the existing packages, simply navigate to the `/packages` folder and create a pull request to change them.

## License

This project is Copyright (c) 2014 and onwards.
It is free software and may be redistributed under the terms specified in the [LICENSE] file.

[LICENSE]: /LICENSE

## About

![Nimble](https://assets.nimblehq.co/logo/dark/logo-dark-text-160.png)

This project is maintained and funded by [Nimble](https://nimblehq.co).

We love open source and do our part in sharing our work with the community!
See [our other projects][community] or [hire our team][hire] to help build your product.

[community]: https://github.com/nimblehq
[hire]: https://nimblehq.co/
