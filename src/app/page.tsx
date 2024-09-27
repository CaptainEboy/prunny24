// https://stackoverflow.com/questions/74965849/youre-importing-a-component-that-needs-usestate-it-only-works-in-a-client-comp
// This is a client component 👈🏽
"use client";


import React, { useState } from 'react';
import Layout from '../components/Layout';
import LaunchCard from '../components/LaunchCard';
import { useSpacexLaunches } from '../utils/api';
import { AxiosError } from 'axios';

interface Launch {
  id: string;
  mission_name: string;
  launch_date_local: string;
  rocket: {
    rocket_name: string;
  };
  launch_site: {
    site_name_long: string;
  };
}

const HomePage = () => {
  const { data, error, isLoading } = useSpacexLaunches();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 9;

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error: {error.message}
        {error instanceof AxiosError && (
          <div>API Response: {error.response?.data}</div>
        )}
      </div>
    );
  }
  if (!data?.launchesUpcoming) {
    return <div>No upcoming launches or invalid data.</div>;
  }

  // const filteredLaunches = data.launchesUpcoming.filter((launch) =>
  //   launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   launch.launch_site.site_name_long.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const filteredLaunches = data.launchesUpcoming.filter((launch) =>
  //   launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   launch.launch_site?.site_name_long?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   launch.launch_site?.site_name_long ?? 'TBD').toLowerCase().includes(searchTerm.toLowerCase()
  // );
  
  

  const filteredLaunches = data.launchesUpcoming.filter((launch) =>
    launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (launch.launch_site?.site_name_long ?? 'TBD').toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  

  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = filteredLaunches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <Layout>
      <h1>Upcoming SpaceX Launches</h1>
      <div className="flex justify-center">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by mission name or launch site"
          className="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentLaunches.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
      <div className="flex justify-center">
        {filteredLaunches.length > launchesPerPage && (
          <div className="pagination">
            {Array.from(Array(Math.ceil(filteredLaunches.length / launchesPerPage)).keys()).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number + 1)}
                className={`btn btn-sm ${currentPage === number + 1 ? 'btn-active' : ''}`}
              >
                Next
                </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;



// import React from 'react';
// import Layout from '../components/Layout';
// import LaunchCard from '../components/LaunchCard';
// import { useSpacexLaunches } from '../utils/api';
// import { AxiosError } from 'axios';

// interface Launch {
//   id: string;
//   mission_name: string;
//   launch_date_local: string;
//   rocket: {
//     rocket_name: string;
//   };
//   launch_site: {
//     site_name_long: string;
//   };
// }

// const HomePage = () => {
//   const { data, error, isLoading } = useSpacexLaunches();

//   console.log('Data:', data);
//   console.log('Error:', error);
//   console.log('Loading:', isLoading);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) {
//     return (
//       <div>
//         Error: {error.message}
//         {error instanceof AxiosError && (
//           <div>API Response: {error.response?.data}</div>
//         )}
//       </div>
//     );
//   }
//   if (!data?.launchesUpcoming) {
//     return <div>No upcoming launches or invalid data.</div>;
//   }

//   return (
//     <Layout>
//       <h1>Upcoming SpaceX Launches</h1>
//       {data.launchesUpcoming.map((launch) => (
//         <LaunchCard key={launch.id} launch={launch} />
//       ))}
//     </Layout>
//   );
// };

// export default HomePage;








// // import React from 'react';
// // import Layout from '../components/Layout';
// // import LaunchCard from '../components/LaunchCard';
// // import { useSpacexLaunches } from '../utils/api';
// // import { AxiosError } from 'axios';


// // interface Launch {
// //   id: string;
// //   mission_name: string;
// //   launch_date_local: string;
// //   rocket: {
// //     rocket_name: string;
// //   };
// //   launch_site: {
// //     site_name_long: string;
// //   };
// // }

// // interface SpaceXData {
// //   launchesUpcoming: Launch[];
// // }

// // const HomePage = () => {
// //   const { data, error, isLoading } = useSpacexLaunches();
  
// //   console.log('Data:', data);
// //   console.log('Error:', error);
// //   console.log('Loading:', isLoading);
  
// //   if (isLoading) return <div>Loading...</div>;
 
// //   if (error) {
// //     return (
// //       <div>
// //         Error: {error.message}
// //         {error instanceof AxiosError && (
// //           <div>API Response: {error.response?.data}</div>
// //         )}
// //       </div>
// //     );
// //   }
  
  
// //   if (!data || data.launchesUpcoming?.length === 0) {
// //     return <div>No upcoming launches.</div>;
// //   }
  
// //   return (
// //     <Layout>
// //       <h1>Upcoming SpaceX Launches</h1>
// //       {data.launchesUpcoming.map((launch) => (
// //         <LaunchCard key={launch.id} launch={launch} />
// //       ))}
// //     </Layout>
// //   );
// // };

// // export default HomePage;


// // // const HomePage = () => {
// // //   const { data, error, isLoading } = useSpacexLaunches();

// // //   if (isLoading) return <div>Loading...</div>;
// // //   if (error) return <div>Error: {error.message}</div>;

// // //   if (!data) return <div>No data available.</div>;

// // //   return (
// // //     <Layout>
// // //       <h1>Upcoming SpaceX Launches</h1>
// // //       {data.launchesUpcoming?.map((launch: Launch) => (
// // //         <LaunchCard key={launch.id} launch={launch} />
// // //       ))}
// // //     </Layout>
// // //   );
// // // };

// // // export default HomePage;

  

// // // import React from 'react';
// // // import Layout from '../components/Layout';
// // // import LaunchCard from '../components/LaunchCard';
// // // import { useSpacexLaunches } from '../utils/api';

// // // interface Launch {
// // //   id: string;
// // //   mission_name: string;
// // //   launch_date_local: string;
// // //   rocket: {
// // //     name: string;
// // //   };
// // //   launch_site: {
// // //     site_name_long: string;
// // //   };
// // // }

// // // const HomePage = () => {
// // //   const { data, error, isLoading } = useSpacexLaunches();

// // //   if (isLoading) return <div>Loading...</div>;
// // //   if (error) return <div>Error: {error.message}</div>;

// // //   if (!data) return <div>No data available.</div>;

  
// // //   return (
// // //     <Layout>
// // //       <h1>Upcoming SpaceX Launches</h1>
// // //       {data.launchesUpcoming.map((launch: Launch) => (
// // //         <LaunchCard key={launch.id} launch={launch} />
// // //       ))}
// // //     </Layout>
// // //   );
// // // };

// // // export default HomePage;

  


// // // // import React from 'react';
// // // // import Layout from '../components/Layout';
// // // // import LaunchCard from '../components/LaunchCard';
// // // // import { useSpacexLaunches } from '../utils/api';

// // // // const HomePage = () => {
// // // //   const { data, error, isLoading } = useSpacexLaunches();

// // // //   if (isLoading) return <div>Loading...</div>;
// // // //   if (error) return <div>Error: {error.message}</div>;

// // // //   return (
// // // //     <Layout>
// // // //       <h1>Upcoming SpaceX Launches</h1>
// // // //       {data.launchesUpcoming.map((launch) => (
// // // //         <LaunchCard key={(link unavailable)} launch={launch} />
// // // //       ))}
// // // //     </Layout>
// // // //   );
// // // // };

// // // // export default HomePage;


// // // // // import React from 'react';
// // // // // import Layout from '../components/Layout';
// // // // // import LaunchCard from '../components/LaunchCard';
// // // // // import { useSpacexLaunches } from '../utils/api';

// // // // // const HomePage = () => {
// // // // //   const { data, error, isLoading } = useSpacexLaunches();

// // // // //   if (isLoading) return <div>Loading...</div>;
// // // // //   if (error) return <div>Error: {error.message}</div>;

// // // // //   return (
// // // // //     <Layout>
// // // // //       <h1>Upcoming SpaceX Launches</h1>
// // // // //       {data.launchesUpcoming.map((launch) => (
// // // // //         <LaunchCard key={(link unavailable)} launch={launch} />
// // // // //       ))}
// // // // //     </Layout>
// // // // //   );
// // // // // };

// // // // // export default HomePage;


// // // // // // import Image from "next/image";
// // // // // // import localFont from "next/font/local";

// // // // // // const geistSans = localFont({
// // // // // //   src: "./fonts/GeistVF.woff",
// // // // // //   variable: "--font-geist-sans",
// // // // // //   weight: "100 900",
// // // // // // });
// // // // // // const geistMono = localFont({
// // // // // //   src: "./fonts/GeistMonoVF.woff",
// // // // // //   variable: "--font-geist-mono",
// // // // // //   weight: "100 900",
// // // // // // });

// // // // // // export default function Home() {
// // // // // //   return (
// // // // // //     <div
// // // // // //       className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
// // // // // //     >
// // // // // //       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
// // // // // //         <Image
// // // // // //           className="dark:invert"
// // // // // //           src="https://nextjs.org/icons/next.svg"
// // // // // //           alt="Next.js logo"
// // // // // //           width={180}
// // // // // //           height={38}
// // // // // //           priority
// // // // // //         />
// // // // // //         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
// // // // // //           <li className="mb-2">
// // // // // //             Get started by editing{" "}
// // // // // //             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
// // // // // //               src/pages/index.tsx
// // // // // //             </code>
// // // // // //             .
// // // // // //           </li>
// // // // // //           <li>Save and see your changes instantly.</li>
// // // // // //         </ol>

// // // // // //         <div className="flex gap-4 items-center flex-col sm:flex-row">
// // // // // //           <a
// // // // // //             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
// // // // // //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
// // // // // //             target="_blank"
// // // // // //             rel="noopener noreferrer"
// // // // // //           >
// // // // // //             <Image
// // // // // //               className="dark:invert"
// // // // // //               src="https://nextjs.org/icons/vercel.svg"
// // // // // //               alt="Vercel logomark"
// // // // // //               width={20}
// // // // // //               height={20}
// // // // // //             />
// // // // // //             Deploy now
// // // // // //           </a>
// // // // // //           <a
// // // // // //             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
// // // // // //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
// // // // // //             target="_blank"
// // // // // //             rel="noopener noreferrer"
// // // // // //           >
// // // // // //             Read our docs
// // // // // //           </a>
// // // // // //         </div>
// // // // // //       </main>
// // // // // //       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
// // // // // //         <a
// // // // // //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// // // // // //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
// // // // // //           target="_blank"
// // // // // //           rel="noopener noreferrer"
// // // // // //         >
// // // // // //           <Image
// // // // // //             aria-hidden
// // // // // //             src="https://nextjs.org/icons/file.svg"
// // // // // //             alt="File icon"
// // // // // //             width={16}
// // // // // //             height={16}
// // // // // //           />
// // // // // //           Learn
// // // // // //         </a>
// // // // // //         <a
// // // // // //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// // // // // //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
// // // // // //           target="_blank"
// // // // // //           rel="noopener noreferrer"
// // // // // //         >
// // // // // //           <Image
// // // // // //             aria-hidden
// // // // // //             src="https://nextjs.org/icons/window.svg"
// // // // // //             alt="Window icon"
// // // // // //             width={16}
// // // // // //             height={16}
// // // // // //           />
// // // // // //           Examples
// // // // // //         </a>
// // // // // //         <a
// // // // // //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// // // // // //           href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
// // // // // //           target="_blank"
// // // // // //           rel="noopener noreferrer"
// // // // // //         >
// // // // // //           <Image
// // // // // //             aria-hidden
// // // // // //             src="https://nextjs.org/icons/globe.svg"
// // // // // //             alt="Globe icon"
// // // // // //             width={16}
// // // // // //             height={16}
// // // // // //           />
// // // // // //           Go to nextjs.org →
// // // // // //         </a>
// // // // // //       </footer>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="https://nextjs.org/icons/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="https://nextjs.org/icons/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
