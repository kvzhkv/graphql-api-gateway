import { ApolloServer } from "apollo-server";

import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";

import { serverConfig, serviceList } from "./config";
import { GraphQLRequestContext } from "apollo-server-types";

type Context = Record<string, any>;

const initServer = async () => {
    try {
        const gateway = new ApolloGateway({
            serviceList,
            // debug: true,
            buildService({ url }) {
                return new RemoteGraphQLDataSource({
                    url,
                    willSendRequest: ({
                        request,
                        context,
                    }: Pick<
                        GraphQLRequestContext<Context>,
                        "request" | "context"
                    >) => {
                        const { http } = request;
                        if (http) {
                            const headers = context.headers;
                            Object.keys(headers).forEach(header => {
                                http.headers.set(header, headers[header]);
                            });
                        }
                    },
                });
            },
        });

        const server = new ApolloServer({
            gateway,
            subscriptions: false,
            context: ({ req: { headers } }): Context => ({ headers }),
        });

        server.listen(serverConfig.port).then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
        });
    } catch (e) {
        console.error(e);
    }
};

process.on("unhandledRejection", err => {
    console.error(err);
    process.exit(1);
});

initServer();
