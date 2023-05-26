# Datetime Wrapper Interface

| Version | URI | WRAP Version |
|-|-|-|
| 1.0.0 | [`wrap://ens/wraps.eth:websocket@1.0.0`](https://wrappers.io/v/ens/wraps.eth:websocket@1.0.0) | 0.1 |

## Interface
```graphql
type Module {
    open(url: String!, protocols: [String], timeout: UInt32): Connection!
    close(id: UInt32!, code: Int, reason: String): Boolean!
    send(id: UInt32!, message: String!): Boolean!
    sendBinary(id: UInt32!, message: Bytes!): Boolean!
    setOnMessage(id: UInt32!, callback: Callback!): Boolean!
    setOnClose(id: UInt32!, callback: Callback!): Boolean!
    setOnError(id: UInt32!, callback: Callback!): Boolean!
    addCache(id: UInt32!): Boolean!
    removeCache(id: UInt32!): Boolean!
    receive(id: UInt32!, min: UInt32, timeout: UInt32): [Message!]!
    getReadyState(id: UInt32!): ConnectionState!
    getConnection(id: UInt32!): Connection
}

type Connection {
    id: UInt!
    url: String!
    state: ConnectionState!
    subprotocol: String
    extensions: [String]
    closeCode: Int
    closeReason: String
}

enum ConnectionState {
    CONNECTING
    OPEN
    CLOSING
    CLOSED
}

type Message {
    data: String!
    origin: String!
    timeStamp: String!
    isBinary: Boolean!
    lastEventId: String
    binaryData: Bytes
    extensionData: String
}

type CloseEvent {
    code: Int!
    reason: String!
    wasClean: Boolean!
    timeStamp: String!
}

type ErrorEvent {
    message: String!
    filename: String
    lineno: Int
    colno: Int
    timeStamp: String!
}

type Callback {
    uri: String!
    method: String!
}
```

## Usage
```graphql
#import * from "ens/wraps.eth:websocket@1.0.0"
```

And implement the interface methods within your programming language of choice.

## Source Code
[Link](https://github.com/polywrap/std/websocket)

## Known Implementations
[Link](https://github.com/polywrap/websocket/tree/master/implementations)