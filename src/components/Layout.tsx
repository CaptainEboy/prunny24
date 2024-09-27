import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <header>
        <title>SpaceX Launches</title>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;

