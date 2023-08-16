import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PaginationNumeric({pagination}) {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const {t} = useTranslation();

  const numberOfPages = [];

  const handlePage = (page) => {
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
    searchParams.set('page', page.toString());
    navigate(`/products?${searchParams.toString()}`);
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
          <div className="mr-2">
            <a
              id="prev"
              onClick={()=>handleNextPrevPage(document.getElementById('prev').getAttribute('id'))}
              className="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm cursor-pointer"
            >
              <span className="sr-only">Previous</span><wbr />
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
              </svg>
            </a>
          </div>
          <ul className="inline-flex text-sm font-medium -space-x-px shadow-sm">
            {numberOfPages}
          </ul>
          <div className="ml-2">
            <a id="next" onClick={()=>handleNextPrevPage(document.getElementById('next').getAttribute('id'))} className="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm  cursor-pointer">
              <span className="sr-only">Next</span><wbr />
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
      <div className="flex justify-center">
        <div className="text-sm text-slate-500 text-center sm:text-left py-2">
          <span className="font-medium text-slate-600">1</span> {t("paginator_footer_to")} <span className="font-medium text-slate-600">10</span> {t("paginator_footer_of")} <span className="font-medium text-slate-600">{pagination.totalResults}</span> {t("paginator_footer_res")}
        </div>
      </div>
    </>
  );
}

export default PaginationNumeric;
