import { createServer, createPubSub } from "@graphql-yoga/node";

//'user:followerCount': [userId: string, payload: { followerCount: number }]
export const pubSub = createPubSub();

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
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
