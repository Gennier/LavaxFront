import Link from 'next/link';

import styles from './sidenav.module.scss';

const routelink = [
  { goto: 'index', label: 'Overview' },
  { goto: 'freelancer', label: 'Freelancer' },
  { goto: 'projects', label: 'Projects' },
];

const SideNav = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.mainmenu}>
        {routelink.map((e) => (
          <li className={styles.list} key={e.label}>
            <Link href={`/${e.goto}`}>
              <a className={styles.alink}>{e.label}</a>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
