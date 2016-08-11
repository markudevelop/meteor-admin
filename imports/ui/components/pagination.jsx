import React from 'react';

const generatePagesArray = (pages, currentPage) => {
  let startingPages = [];
  let endPages = [];

  for (let i = 0; i < 6; i++) {
    let page = currentPage - 1 - i;
    if (page < 1) break;
    startingPages.push(page);
  }

  for (let i = currentPage + 1; i < currentPage + 6; i++) {
    endPages.push(i);
  }

  return [
    ...startingPages.reverse(),
    currentPage,
    ...endPages
  ];
};

const Pagination = ({ count, page }) => {
  let pages = Math.ceil(count / 10);
  if (pages > 11) {
    pages = generatePagesArray(pages, page);
  } else {
    pages = Array.from({length: pages}, (v, k) => k+1);
  }

  return (
    <ul className="pagination">
      {/*<li className="disabled">
        <a href="#!"><i className="material-icons">chevron_left</i></a>
      </li>*/}
      {pages.map((pageNumber)=> {
        let isActiveClass = (pageNumber === page) ? 'active' : 'waves-effect';
        return (
          <li key={pageNumber} className={isActiveClass}>
            <a onClick={()=> { FlowRouter.setParams({ page: pageNumber }) }}>{pageNumber}</a>
          </li>
        );
      })}
      {/*<li className="waves-effect">
        <a href="#!"><i className="material-icons">chevron_right</i></a>
      </li>*/}
    </ul>
  )
};

export default Pagination;
