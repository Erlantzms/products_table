import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PaginationNumeric({pagination}) {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const {t} = useTranslation();

  const numberOfPages = [];
  const [page, setPage] = useState(1)

  const handlePage = (page) => {
    setPage(page)
    searchParams.set('page', page);
    navigate(`/products?${searchParams.toString()}`);
  }

  const handleNextPrevPage = (id) => {
    let page = parseInt(searchParams.get('page')) || 1;
    if (id === 'next') {
      page++;
    } else if (id === 'prev') {
      page--;
    }
    setPage(page)
    searchParams.set('page', page.toString());
    navigate(`/products?${searchParams.toString()}`);
  }

  const checkIsOnOff = (type) => {
    if (type ==='next' && page === pagination.totalPages) return "bg-gray-200 pointer-events-none cursor-no-allowed"
    else if (type ==='prev' && page === 1) return "bg-gray-200 pointer-events-none cursor-no-allowed"
    else return 'bg-white hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm cursor-pointer'
  }

  const paginationColors = (i) => {
    const page = parseInt(searchParams.get('page')) || 1;
    if (page === i) {
      return 'bg-blue-500 text-white'
    } else {
      return 'bg-white text-blue-500'
    }
  }

  for (let i = 1; i <= pagination?.totalPages; i++) {
    numberOfPages.push(
      <li key={i}> 
        <span
          className={`${paginationColors(i)} inline-flex items-center justify-center rounded leading-5 px-3.5 py-2 mx-0.5 border border-slate-200 cursor-pointer hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm`}
          onClick={() => handlePage(i)}>
          {i}
        </span>
      </li>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <nav className="flex" role="navigation" aria-label="Navigation">
          <div className="mr-2 b">
            <button
              id="prev"
              onClick={()=>handleNextPrevPage('prev')}
              className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 ${checkIsOnOff('prev')}`}
            >
              <span className="sr-only">Previous</span><wbr />
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
              </svg>
            </button>
          </div>
          <ul className="inline-flex text-sm font-medium -space-x-px shadow-sm">
            {numberOfPages}
          </ul>
          <div className="ml-2">
            <button
              id="next"
              onClick={()=>handleNextPrevPage('next')}
              className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 ${checkIsOnOff('next')}`}
            >
              <span className="sr-only">Next</span><wbr />
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
      <div className="flex justify-center">
        <div className="text-sm text-slate-500 text-center sm:text-left py-2">
          <span className="font-medium text-slate-600">{(page-1)*100}</span>
          {t("paginator_footer_to")}
          <span className="font-medium text-slate-600">{Math.min(pagination.totalResults,(page)*100)}</span>
          {t("paginator_footer_of")}
          <span className="font-medium text-slate-600">{pagination.totalResults}</span>
          {t("paginator_footer_res")}
        </div>
      </div>
    </>
  );
}

export default PaginationNumeric;
