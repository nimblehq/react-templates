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

## Getting Started

### Prerequisites

[![node-version-image][node-v-src]](https://nodejs.org/download/release/v14.18.1/)

### Usage

To use this template, add `--template nimble` when creating a new app from the `create-react-app` package.


```sh
npx create-react-app my-app --template nimble

# or

yarn create react-app my-app --template nimble
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
To the standard files from a non-ejected `create-react-app` project, this template adds a folder structure in `/src` that follows our [React Convention](https://nimblehq.co/compass/development/code-conventions/javascript/react/#project-structure).

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
[node-v-src]: https://img.shields.io/badge/node-14.x.x-brightgreen.svg
