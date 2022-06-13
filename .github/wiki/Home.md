# Features list

This template is based on top of the TypeScript version of [Create-React-App](https://create-react-app.dev/) toolkit and contains all its features.
In addition to Create-React-App, this template provides the following features:

## Development

### Project Structure

- A project structure matching our [React Project Strucutre](https://nimblehq.co/compass/development/code-conventions/javascript/react/#project-structure) conventions
- ESLint and Prettier — using our [custom ESLint configuration](https://github.com/nimblehq/eslint-config-nimble)
- SCSS support with our [conventional file structure](https://nimblehq.co/compass/development/code-conventions/css/#stylesheets-structure)
- Using `Dart SASS` with `@use` and `@forward` imports
- Absolute file imports

### Helpers & Tools

- [Axios](https://github.com/axios/axios) and a ready-to-use `requestManager` helper
- [Localization](https://github.com/nimblehq/react-templates/issues/34) using `i18next`
- [React Router](https://github.com/nimblehq/react-templates/issues/53)

## Testing

- [Cypress](https://nimblehq.co/compass/development/code-conventions/javascript/cypress/) confiugured for UI tests
- `data-test-id` [made consistent](https://github.com/nimblehq/react-templates/issues/30) across Cypress and Jest tests
- [Test coverage reports](https://github.com/nimblehq/react-templates/pull/38) — merging Cypress and Jest tests reports

## GitHub

- GitHub templates for Issues and Pull Requests
- GitHub workflows for Preview, Deployment and Tests

## GitLab

- GitLab templates for Merge Requests

# Recommended React Libraries

| Domain | This was great | This was bad | This has not been tried, but it seems interesting! |
|---|---|---|---|
| HTML Form Handling | [React Hook Form](https://react-hook-form.com/) — Used in [Varuna](https://github.com/nimblehq/varun-web/) | | | |
| Store | [Redux](https://redux.js.org/) with the [Redux Toolkit](https://redux-toolkit.js.org/) — Used in [Varuna](https://github.com/nimblehq/varun-web/) | | | |
| UI Notifications | [React Hot Toast](https://react-hot-toast.com/) — Used in [Varuna](https://github.com/nimblehq/varun-web/) | | | |
| Calendar Component | [React Calendar](https://github.com/wojtekmaj/react-calendar)  — Used in [Varuna](https://github.com/nimblehq/varun-web/) | | | |
| Google Maps | [Google Map React](https://github.com/google-map-react/google-map-react)  — Used in [Varuna](https://github.com/nimblehq/varun-web/) | | | |