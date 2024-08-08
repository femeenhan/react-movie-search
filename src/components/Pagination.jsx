import { useEffect, useMemo, useState } from 'react';
import { sliceArrayByLimit } from '../lib/utils';
import styles from './Pagination.module.css';

export default function Pagination({ totalPage, limit, setPage, page }) {
  const [currentPageArr, setCurrentPageArr] = useState([]);
  const [totalPageArr, setTotalPageArr] = useState([]);

  // Effect가 아닌 Memo를 이용해야 렌더링과 상관없이 값 변경 때마다 실행. Effect를 사용하면 currentPageArr의 값이 생성되기 전에 렌더링이 실행되어 pagination이 제대로 작동하지 않는 버그발생
  useMemo(() => {
    const pageGroup = sliceArrayByLimit(totalPage, limit);
    setTotalPageArr(pageGroup);
    setCurrentPageArr(pageGroup[0]);
  }, [totalPage]);

  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArr(totalPageArr[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArr(totalPageArr[Math.floor(page / limit) - 1]);
    }
  }, [page]);

  return (
    <div className={styles.pagination}>
      {page > 1 && (
        <button
          className={styles.prev_btn}
          type="button"
          onClick={() => setPage(page - 1)}
        >
          이전
        </button>
      )}

      {currentPageArr?.map((num) => (
        <button
          className={`${styles.num_btn} ${
            page === num + 1 ? styles.active : ''
          }`}
          type="button"
          key={num}
          onClick={() => setPage(num + 1)}
        >
          {num + 1}
        </button>
      ))}
      {page !== totalPage && (
        <button
          className={styles.next_btn}
          type="button"
          onClick={() => setPage(page + 1)}
        >
          다음
        </button>
      )}
    </div>
  );
}
