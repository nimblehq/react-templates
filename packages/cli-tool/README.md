oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @nimblehq/react-templates
$ nimble-react  COMMAND
running command...
$ nimble-react  (--version)
@nimblehq/react-templates/0.0.0 darwin-x64 node-v16.14.2
$ nimble-react  --help [COMMAND]
USAGE
  $ nimble-react  COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nimble-react  hello PERSON`](#nimble-react--hello-person)
* [`nimble-react  hello world`](#nimble-react--hello-world)
* [`nimble-react  help [COMMAND]`](#nimble-react--help-command)
* [`nimble-react  plugins`](#nimble-react--plugins)
* [`nimble-react  plugins:install PLUGIN...`](#nimble-react--pluginsinstall-plugin)
* [`nimble-react  plugins:inspect PLUGIN...`](#nimble-react--pluginsinspect-plugin)
* [`nimble-react  plugins:install PLUGIN...`](#nimble-react--pluginsinstall-plugin-1)
* [`nimble-react  plugins:link PLUGIN`](#nimble-react--pluginslink-plugin)
* [`nimble-react  plugins:uninstall PLUGIN...`](#nimble-react--pluginsuninstall-plugin)
* [`nimble-react  plugins:uninstall PLUGIN...`](#nimble-react--pluginsuninstall-plugin-1)
* [`nimble-react  plugins:uninstall PLUGIN...`](#nimble-react--pluginsuninstall-plugin-2)
* [`nimble-react  plugins update`](#nimble-react--plugins-update)

## `nimble-react  hello PERSON`

Say hello

```
USAGE
  $ nimble-react  hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/nimblehq/react-templates/blob/v0.0.0/dist/commands/hello/index.ts)_

## `nimble-react  hello world`

Say hello world

```
USAGE
  $ nimble-react  hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `nimble-react  help [COMMAND]`

Display help for nimble-react .

```
USAGE
  $ nimble-react  help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for nimble-react .
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `nimble-react  plugins`

List installed plugins.

```
USAGE
  $ nimble-react  plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ nimble-react  plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `nimble-react  plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ nimble-react  plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ nimble-react  plugins add

EXAMPLES
  $ nimble-react  plugins:install myplugin 

  $ nimble-react  plugins:install https://github.com/someuser/someplugin

  $ nimble-react  plugins:install someuser/someplugin
```

## `nimble-react  plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ nimble-react  plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ nimble-react  plugins:inspect myplugin
```

## `nimble-react  plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ nimble-react  plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ nimble-react  plugins add

EXAMPLES
  $ nimble-react  plugins:install myplugin 

  $ nimble-react  plugins:install https://github.com/someuser/someplugin

  $ nimble-react  plugins:install someuser/someplugin
```

## `nimble-react  plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ nimble-react  plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ nimble-react  plugins:link myplugin
```

## `nimble-react  plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ nimble-react  plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nimble-react  plugins unlink
  $ nimble-react  plugins remove
```

## `nimble-react  plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ nimble-react  plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nimble-react  plugins unlink
  $ nimble-react  plugins remove
```

## `nimble-react  plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ nimble-react  plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nimble-react  plugins unlink
  $ nimble-react  plugins remove
```

## `nimble-react  plugins update`

Update installed plugins.

```
USAGE
  $ nimble-react  plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
