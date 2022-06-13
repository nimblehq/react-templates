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
The complete list of features included in this template is available in [the Wiki](https://github.com/nimblehq/react-templates/wiki).

## Getting Started

### Prerequisites

[![node-version-image](https://img.shields.io/badge/node-16.14.2-brightgreen.svg)](https://nodejs.org/download/release/v16.14.2/)

### Usage

To use this template, add `--template nimble` when creating a new app from the `create-react-app` command.


```sh
npx create-react-app my-app --template nimble
```

For more information about `create-react-app`, please refer to:

- [Getting Started](https://create-react-app.dev/docs/getting-started) — How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.

## Template structure

```
.
├── template
│   ├── public
│   │   ├── ...
│   ├── src
│   |   └── ...
│   ├── gitignore
│   └── README.md
├── .gitignore
├── LICENSE
├── package.json
├── README.md
└── template.json
```

`Typescript` is used by default for our React applications.
With the standard files from a non-ejected `create-react-app` project, this template adds a folder structure in `/src` that follows our [React Convention](https://nimblehq.co/compass/development/code-conventions/javascript/react/#project-structure).

## How to contribute

To test the template locally, simply run the template install command with the path of your local `react-template` repository, prefixed by `file:`:

```sh
npx create-react-app my-app --template file:{../path/to/your/local/template/repo}
```

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
