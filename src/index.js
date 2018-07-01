import React from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import Routes from './Routes';

const client = new ApolloClient({
    uri: "https://eu1.prisma.sh/muslim-guseinov-4235e0/ecommerce/ecommerce-dev"
});

export default () => (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
);
