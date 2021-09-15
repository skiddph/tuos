# Tuos

Offers free online tools and services for the public.

# Documentation

- OpenAPI v3.0.3 specification: `https://<host>/docs`

# How to use?

Start server and client

```bash
yarn start  # PRODUCTION
yarn dev    # DEVELOPMENT
```

Start [client only](https://github.com/eru123/tuos/tree/main/clients)

```bash
# LOCATE WEB UI CLIENT DIRECTORY
cd clients/<webUI_client>

yarn start  # PRODUCTION
yarn dev    # DEVELOPMENT
```

# Structure

| PATH                                                                    | DESCRIPTION                       |
| ----------------------------------------------------------------------- | --------------------------------- |
| [/bootstsrap](https://github.com/eru123/tuos/tree/main/bootstsrap)      | Preloaded plugins                 |
| [/clients](https://github.com/eru123/tuos/tree/main/clients)            | Web UI Clients                    |
| [/core](https://github.com/eru123/tuos/tree/main/core)                  | Core/Submodules directory for Dev |
| [/plugins](https://github.com/eru123/tuos/tree/main/plugins)            | Plugins directory                 |
| [/index.js](https://github.com/skiddph/tuos/blob/main/index.js)         | Fastify plugin file               |
| [/server.js](https://github.com/skiddph/tuos/blob/main/server.js)       | Server entry file                 |
| [/openapi.yaml](https://github.com/skiddph/tuos/blob/main/openapi.yaml) | API docs                          |

# LICENSE

Apache-2.0[@Jericho Aquino](https://github.com/eru123)
