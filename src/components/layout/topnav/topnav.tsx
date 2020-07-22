import styles from './topnav.module.scss';

const TopNav = () => {
  return (
    <div className={`${styles.topnav} ${styles.fixedtop}`}>
      <div className={styles.navleft}>
        <a className={styles.menubutton}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
            <rect x="0.5" y="0.5" width="25" height="1" />
            <rect x="0.5" y="7.5" width="25" height="1" />
            <rect x="0.5" y="15.5" width="25" height="1" />
          </svg>
        </a>
      </div>
      <div></div>
    </div>
  );
};

export default TopNav;
