import styles from './MovieTab.module.css';

const types = ['All', 'Movie', 'Series', 'Episode'];

export default function MovieTab({ setType, selectedTab, setPage }) {
  let select = selectedTab;
  if (select === '') {
    select = 'All';
  }
  function handleType(t) {
    if (t === 'All') {
      setType('');
      setPage(1);
    } else {
      setType(t);
      setPage(1);
    }
  }

  return (
    <ul className={styles.movie_tab}>
      {types.map((t, i) => {
        return (
          <li key={i}>
            <button
              className={t === select ? styles.active : ''}
              type="button"
              onClick={() => handleType(t)}
            >
              {t}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
