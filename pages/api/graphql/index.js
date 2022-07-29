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
        countdown: {
          // This will return the value on every 1 sec until it reaches 0
          subscribe: async function* (_, { from }) {
            for (let i = from; i >= 0; i--) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              yield { countdown: i };
            }
          },
          randomNumber: {
            // subscribe to the randomNumber event
            subscribe: () => {
              return pubSub.subscribe("randomNumber");
            },
          },
        },
        unread: {
          subscribe: (_, { uid }) => {
            console.log(uid);
            return pubSub.subscribe("user:unread", uid);
          },
          resolve: (payload) => {
            console.log(payload);
            return payload;
          },
        },
      },
      Mutation: {
        publishUnread: (_,{uid}) => {
          console.log("Mutating rn with uid: " + uid);
          pubSub.publish("user:unread", uid, {
            unread: 30,
          });
          return true;
        },
        broadcastRandomNumber: (_, args) => {
          // publish a random number
          pubSub.publish("randomNumber", Math.random());
        },
      },
    },
  },
});
