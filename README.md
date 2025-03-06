# Home task

The home task consists of two groups of subtasks.
The first group contains frontend-/dev-related subtasks, and the second group focuses on Ops skills.

## Frontend subtasks

To run the application, use:

```sh
npm run start
```

### 1. Fix a bug in the existing functionality

There is an issue. When placing a bet, the user's balance is not updating.

Steps to reproduce:

1) Click on any SelectionButton to add a selection into Betslip
2) Input some value into the Stake field
3) Place a bet

Current result:
The user's balance remains unchanged.

Expected result:
The total stake amount is deducted from the user's balance.

### 2. Improve SelectionButton

Currently, clicking SelectionButton adds the corresponding selection to Betslip.
And the button becomes active (selected).

Implement the following functionality:
When the user clicks on the active (selected) SelectionButton, remove the corresponding selection from Betslip, and
restore the button's initial state.

### 3. Introduce Websocket updates

Setup a WebSocket server.

Connect to the Websocket server from the client.

Broadcast a message from the server to the client within every 10 seconds.

The message to contain a set of random values (odds). For example:

```json
[
  {
    "id": 100010,
    "odds": 1.20,
    "description": "Atlanta Hawks"
  },
  {
    "id": 100020,
    "odds": 2.50,
    "description": "Southampton"
  }
]
```

Use these odds to update the corresponding selections in the application's store.

For example, the client receives the following message:

```json
[
  {
    "id": 100010,
    "odds": 1.20,
    "description": "Atlanta Hawks"
  }
]
```

The client has to update the corresponding selection in `coupon` reducer and `event` reducer, in case if the selection
exists.

Each selection has a unique `id`.

## Ops subtasks

### Create Dockerfile

Provide a Dockerfile to containerize the application.

Compile the application and put it as a static website into the container.

Use any web server to serve the application.

Expose the application to some port.

### Optimize images (optional)

This is an optional bonus task.

Optimize the existing [images](./public/img) while copying them into the Docker container.
You are free to choose a technology or tool for this.
