export interface Launch {
    id: string;
    launch_date_local: string;
    mission_name: string;
    rocket: {
      rocket_name: string;
    };
    launch_site: {
      site_name_long: string;
    };
  }
  
  // export { Launch };