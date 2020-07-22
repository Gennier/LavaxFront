import Head from 'next/head';

import TopNav from './topnav/topnav';
import SideNav from './sidenav/sidenav';

import styles from './layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Lavax</title>
      </Head>
      <TopNav />
      <SideNav />
      <div className={styles.body} id="main">
        <div className={styles.containerfluid}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
