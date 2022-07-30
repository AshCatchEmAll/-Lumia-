//* This Graphql endpoint is used to query the database for data.
//* It needs to be seperate Server from the Next.js


import { createServer, createPubSub } from "@graphql-yoga/node";


export const pubSub = createPubSub();

export const config = {
  api: {
  
    bodyParser: true,
  },
};

export default createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type UnreadNotification {
        unread: Int
      }

      type Query {
        hello: String
      }

      type Subscription {
        countdown(from: Int!): Int!
        unread(uid: String!): UnreadNotification
        randomNumber: Float!
      }

      type Mutation {
        publishUnread(uid:String!): Boolean
        broadcastRandomNumber: Boolean
      }
    `,
    resolvers: {
      Query: {
        hello: () => "world",
      },
      Subscription: {
       
          
    
        unread: {
          subscribe: (_, { uid }) => {
            
            return pubSub.subscribe("user:unread", uid);
          },
          resolve: (payload) => {
            
            return payload;
          },
        },
      },
      Mutation: {
        publishUnread: (_,{uid}) => {
          
          pubSub.publish("user:unread", uid, {
            unread: 30,
          });
          return true;
        },
       
      },
    },
  },
});
