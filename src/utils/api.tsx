import React from 'react';
import axios from 'axios';

interface SpaceXResponse {
  launchesUpcoming: {
    id: string;
    mission_name: string;
    launch_date_local: string;
    rocket: {
      rocket_name: string;
    };
    launch_site: {
      site_name_long: string;
    };
  }[];
}

interface UseSpacexLaunchesResponse {
  data: SpaceXResponse | null;
  error: Error | null;
  isLoading: boolean;
}

export const useSpacexLaunches = (): UseSpacexLaunchesResponse => {
  const [data, setData] = React.useState<SpaceXResponse | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const query = `
    query SpaceXLaunches {
      launchesUpcoming {
        id
        mission_name
        launch_date_local
        rocket {
          rocket_name
        }
        launch_site {
          site_name_long
        }
      }
    }
  `;

  React.useEffect(() => {
    const fetchLaunches = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post('https://spacex-production.up.railway.app/', 
        { query }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Apollo-Operation-Name': 'spacexLaunches',
          },
        });
        setData(response.data.data); // Access nested data
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          console.error('Unknown error:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchLaunches();
  }, []);

  return { data, error, isLoading };
};



// import React from 'react';
// import axios from 'axios';

// interface SpaceXResponse {
//   launchesUpcoming: {
//     id: string;
//     mission_name: string;
//     launch_date_local: string;
//     rocket: {
//         rocket_name: string;
//     };
//     launch_site: {
//       site_name_long: string;
//     };
//   }[];
// }

// interface UseSpacexLaunchesResponse {
//   data: SpaceXResponse | null;
//   error: Error | null;
//   isLoading: boolean;
// }

// export const useSpacexLaunches = (): UseSpacexLaunchesResponse => {
//   const [data, setData] = React.useState<SpaceXResponse | null>(null);
//   const [error, setError] = React.useState<Error | null>(null);
//   const [isLoading, setIsLoading] = React.useState(false);

//   const query = `
//   query SpaceXLaunches {
//     launchesUpcoming {
//       id
//       mission_name
//       launch_date_local
//       rocket {
//         rocket_name
//       }
//       launch_site {
//         site_name_long
//       }
//     }
//   }
// `

//   React.useEffect(() => {
//     const fetchLaunches = async () => {
//       setIsLoading(true);
    
//       try {
//         const response = await axios.post('https://spacex-production.up.railway.app/', 
//         { query }, 
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-Apollo-Operation-Name': 'spacexLaunches',
//           },
//         });
//         setData(response.data);
//       } 
      
      
//       catch (error: unknown) {
//         if (error instanceof Error) {
//           setError(error);
//         } else {
//           console.error('Unknown error:', error);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchLaunches();
//   }, []);

//   return { data, error, isLoading };
// };




// // import React from 'react';
// // import axios from 'axios';

// // export const useSpacexLaunches = () => {
// //   const [data, setData] = React.useState(null);
// //   const [error, setError] = React.useState<Error | null>(null); // Specify error type
// //   const [isLoading, setIsLoading] = React.useState(false);

// //   React.useEffect(() => {
// //     const fetchLaunches = async () => {
// //       setIsLoading(true);
// //       try {
// //         const response = await axios.get('/api/spacex');
// //         setData(response.data);
// //       } catch (error: unknown) { // Specify unknown type
// //         if (error instanceof Error) {
// //           setError(error);
// //         } else {
// //           // Handle other types of errors
// //           console.error('Unknown error:', error);
// //         }
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
// //     fetchLaunches();
// //   }, []);

// //  return { data, error, isLoading };
// // };


// // // import React from 'react';
// // // import axios from 'axios';

// // // export const useSpacexLaunches = () => {
// // //   const [data, setData] = React.useState(null);
// // //   const [error, setError] = React.useState(null);
// // //   const [isLoading, setIsLoading] = React.useState(false);

// // //   React.useEffect(() => {
// // //     const fetchLaunches = async () => {
// // //       setIsLoading(true);
// // //       try {
// // //         const response = await axios.get('/api/spacex');
// // //         setData(response.data);
// // //       } catch (error) {
// // //         setError(error);
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     fetchLaunches();
// // //   }, []);

// // //   return { data, error, isLoading };
// // // };


// // // // import { getUpcomingLaunches } from '../api/spacex';

// // // // export const useSpacexLaunches = () => {
// // // //   const [data, setData] = React.useState(null);
// // // //   const [error, setError] = React.useState(null);
// // // //   const [isLoading, setIsLoading] = React.useState(false);

// // // //   React.useEffect(() => {
// // // //     const fetchLaunches = async () => {
// // // //       setIsLoading(true);
// // // //       try {
// // // //         const data = await getUpcomingLaunches();
// // // //         setData(data);
// // // //       } catch (error) {
// // // //         setError(error);
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };

// // // //     fetchLaunches();
// // // //   }, []);

// // // //   return { data, error, isLoading };
// // // // };