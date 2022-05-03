https://lucid.app/lucidchart/71168ced-34b0-4a48-87f0-1e3e77e8b6be/edit?invitationId=inv_ec5cf113-40a3-447b-b200-c752bf69b7b2

### Network / Controller

`npm run server-dev` run hot.

### Client

`npm run client-dev-build` build client hot.

Features/Principles retained:

- Mapping of last known user of socketio session.
- Three Way Event: notify-request-serve secured route flow. server will not send intended data on first emit. Server will only signal to client there is fresh data, and client will have to present its token for the said data to be served.

Recurring Requirements:

[ ] If an invalid (revoked/ expired/ out-of-scope etc) token is presented, the server should notify the sender as such.
[ ] if a valid token is presented,
