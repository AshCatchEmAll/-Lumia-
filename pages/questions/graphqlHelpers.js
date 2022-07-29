import { gql } from "@apollo/client";

export function publishUnreadMutation() {
  // Define mutation
  return gql`
    # Increments a back-end counter and gets its resulting value
    mutation updateUnread($uid: String!, $unread: Int!) {
      publishUnread(uid: $uid, unread: $unread) 
    }
  `;
}
