import React from 'react';

function PaginationNumeric({pagination}) {
  const numberOfPages = [];
  const handlePageValue = (page) => {
    console.log(page)
  }

  for (let i = 1; i <= pagination?.totalPages; i++) {
    numberOfPages.push(
      <li key={i}> 
        <span
          // className={`inline-flex items-center justify-center rounded leading-5 px-3.5 py-2 mx-0.5 bg-${page===i ? 'blue-500' : 'white'} border border-slate-200 text-${page===i ? 'white' : 'blue-500'} cursor-pointer hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm`}
          className={`inline-flex items-center justify-center rounded leading-5 px-3.5 py-2 mx-0.5 bg-blue-500 border border-slate-200 text-white cursor-pointer hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm`}
          onClick={() => handlePageValue(i)}>
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
            <span className="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white border border-slate-200 text-slate-300">
              <span className="sr-only">Previous</span><wbr />
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
              </svg>
            </span>
          </div>
          <ul className="inline-flex text-sm font-medium -space-x-px shadow-sm">
            {numberOfPages}
          </ul>
          <div className="ml-2">
            <a href="#0" onClick={()=>console.log('next')} className="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm">
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
          <span className="font-medium text-slate-600">1</span> a <span className="font-medium text-slate-600">10</span> de <span className="font-medium text-slate-600">{pagination.totalResults}</span> resultados
        </div>
      </div>
    </>
  );
}

export default PaginationNumeric;
