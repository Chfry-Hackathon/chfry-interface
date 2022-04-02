// import { createClient } from "urql";

// const APIURL = "https://thegraph.com/hosted-service/subgraph/briskhan/trackingmodule";

// // import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// const tokensQuery = `
//   query {
//     leveragePositions(first:5){
//         id,
//         targetToken,
//         EOA,
//         account,
//         direction,
//         amount,
//     }
//   }
// `;

// const client = createClient({
//   url: APIURL,
// });
// const data = await client.query(tokensQuery).toPromise();
export const fetchOrder = () => {
    // client.query(tokensQuery).toPromise().then(res=>{
    //     console.log(res);
    // })
}
// const client = new ApolloClient({
//   uri: APIURL,
//   cache: new InMemoryCache(),
// });

// // const fetcher = (query) =>
// //   request("https://thegraph.com/hosted-service/subgraph/briskhan/trackingmodule", query);

// export const fetchOrder = () => {
//   client
//     .query({
//       query: gql(tokensQuery),
//     })
//     .then((data) => console.log("Subgraph data: ", data))
//     .catch((err) => {
//       console.log("Error fetching data: ", err);
//     });
//   //   const QUERY = `{
//   //         leveragePositions(first:${first}){
//   //             id,
//   //             targetToken,
//   //             EOA,
//   //             account,
//   //             direction,
//   //             amount,
//   //         }
//   //       }`;
//   //   const data = swr(QUERY, fetcher);
//   //   console.log(data);
//   //   return data;
// };
