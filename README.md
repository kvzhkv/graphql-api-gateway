# GraphQL API gateway

API gateway for constructing composed schema of remote federated GraphQL schemas and exposing single schema via single endpoint.

## Environment variables

`SERVICE_URL_%N%` - remote GraphQL service endpoints (replace `%N%` with integers started with 0)

`SERVICE_NAME_%N%` - remote GraphQL service name (replace `%N%` with string service name, optional)

At least one remote service endpoint must be provided.
