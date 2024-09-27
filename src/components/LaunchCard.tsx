import React from 'react';
import { Launch } from '../types';

interface Props {
  launch: Launch;
}

const LaunchCard: React.FC<Props> = ({ launch }) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{launch.mission_name}</h2>
        <p>Launch Date: {new Date(launch.launch_date_local).toLocaleDateString()}</p>
        <p>Rocket Name: {launch.rocket.rocket_name}</p>
        <p>Launch Site: {launch.launch_site?.site_name_long || 'TBD'}</p>
      </div>
    </div>
  );
};

export default LaunchCard;




// import React from 'react';
// import { Launch } from '../types';

// interface Props {
//   launch: Launch;
// }

// const LaunchCard: React.FC<Props> = ({ launch }) => {
//   return (
//     <div key={launch.id}>
//       <h2>Mission Name:{launch.mission_name}</h2>
//       <p>Launch Date: {new Date(launch.launch_date_local).toLocaleDateString()}</p>
//       <p>Rocket Name: {launch.rocket.rocket_name}</p>
//       <p>Launch Site: {launch.launch_site?.site_name_long || 'TBD'}</p>
//     </div>
//   );
// };

// export default LaunchCard;