# Dijkstra's Solver

An interactive visualizer built using React for building weighted graphs and finding the shortest distances from a selected node using Dijkstra's algorithm.

## Deployed Webapp

https://sheikh-rashdan.github.io/dijkstras-solver-webapp/

## Features

- Create, remove, select, and move nodes on an interactive canvas.
- Connect nodes with weighted, undirected edges.
- Visualize the calculated shortest-path tree.
- View and sort shortest distances by node or distance.

## Gallery

<p align="center">
  <img width="1200" height="675" alt="dijkstras-solver-webapp" src="https://github.com/user-attachments/assets/f08e7ce2-44a7-4853-837c-666842f89721" />
</p>

## Getting started

### Requirements

- Node.js 18 or newer

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

## Usage

1. Select **Create**, then click the canvas to add nodes.
2. Select a node with **Select**.
3. Enter a non-negative edge weight, choose **Connect**, and select another node.
4. Select the source node and click **Calculate**.
5. Review the shortest distances in the results panel. Highlighted edges show the resulting shortest-path tree.

Use **Move** to reposition the canvas or nodes. **Remove** lets you delete nodes and clear the graph with the trash button.

## Scripts

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `npm run dev`     | Start the Vite development server.    |
| `npm run build`   | Create a production build.            |
| `npm run preview` | Preview the production build locally. |
| `npm run lint`    | Run Oxlint.                           |

## Project structure

```text
src/
  components/  Canvas, nodes, and sidebar UI
  scripts/     Graph data structures and Dijkstra's algorithm
  App.jsx      Application composition
```
