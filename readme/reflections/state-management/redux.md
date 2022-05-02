# On Asychronous Front-End Data ( React + Redux )


## Front-End Technologies

- react
- react-redux
- redux-thunk
- socketio



# Development Flow

1. Write pub-sub channels. Set up server-client interface for the duplex communications.
Asynchronous means we can consider the sequence of interaction at a later stage.

2. Create store, define reducers and its interface.

- Actions: Nominally a type and payload which are conditions applied to the current state to produce the next state.
- Reducer: Produces the next state from current state and a proposed action.