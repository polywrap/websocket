# WebSocket Wrapper Interface

| Version | URI | WRAP Version |
|-|-|-|
| 1.0.0 | [`wrap://ens/wrappers.polywrap.eth:web-socket@1.0.0`](https://wrappers.io/v/ens/wrappers.polywrap.eth:web-socket@1.0.0) | 0.1 |

## Interface
```graphql
"""Subset of JS MessageEvent interface"""
type Message {
    data: String!
    origin: String!
    lastEventId: String!
}

type Callback {
    """WRAP Module URI"""
    uri: String!
    """WRAP Module Method"""
    method: String!
}

type Module {
    """
    create a socket with id, can return after `timeout`
    if the server is not responding. Returns the socket `id`
    """
    open(url: String!, timeout: UInt32): UInt32!

    """
    close socket `id`
    """
    close(id: UInt32!): Boolean!

    """
    send message via socket `id`
    """
    send(id: UInt32!, message: String!): Boolean!

    """
    send all messages to callback for socket `id`
    """
    addCallback(id: UInt32!, callback: Callback!): Boolean!

    """
    stop sending messages to callback for socket `id`
    """
    removeCallback(id: UInt32!, callback: Callback!): Boolean!

    """
    save messages to ws plugin cache for socket `id`
    """
    addCache(id: UInt32!): Boolean!

    """
    stop caching messages for socket `id`
    """
    removeCache(id: UInt32!): Boolean!

    """
    get messages and flush cache,
    can wait until receives `min` events or reaches `timeout`
    """
    receive(id: UInt32!, min: UInt32, timeout: UInt32): [Message!]!
}
```

## Usage
```graphql
#import { Module } into WebSocket from "ens/wrappers.polywrap.eth:web-socket@1.0.0"

type Module implements WebSocket_Module {}
```

And implement the interface methods within your programming language of choice.

## Source Code
[Link](https://github.com/polywrap/WebSocket)

## Known Implementations
[Link](https://github.com/polywrap/WebSocket/tree/master/implementations)