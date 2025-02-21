# PNPM Monorepo

This is a monorepo using [PNPM](https://pnpm.io/) as a workspace and package manager and [NX](https://nx.dev/) as a scripts and CI runner.

## Requirements

- [NodeJS](https://nodejs.org/) - v22 or later
- [PNPM](https://pnpm.io/) - v10 or later

## Setup

### 1. Install PNPM

Refer to the [PNPM installation instructions](https://pnpm.io/installation).

### 2. Install dependencies

Each package has its own `package.json` and will generate its own `node_modules`, defining the necessary dependecies.

PNPM by default create "symlinks" that share repeating dependecies.

```bash
pnpm install
```

## Executing

It's recommended to use the [NX Constole](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) extension.
- Install the mentioned extension;
- On the sidebar, go to NX and, open the projects tab and execute the wanted tasks, or
- Write the Nx commands on the terminal.

## Adding new dependencies

Pay attention to the current path folder. Navigate to the target package or use PNPM filters.
```bash
pnpm add <package>
```
To install in the root (workspace) use the `-w` flag:
```bash
pnpm add -w <package>
```

### Dependencies between packages
To make a package depend on another, simply install the tarteg (by package.json name), as a normal dependecy.
```bash
pnpm add @pnpm-monorepo/utilities
```
