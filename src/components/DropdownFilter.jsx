import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';
import { useLocation, useNavigate } from 'react-router-dom';

function DropdownFilter({
  align
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const filters = ["es_general_21", "es_reduced_10", "es_super-reduced_4", "fr_general_20", "fr_reduced_5.5"]
  const [filtersToApply, setFiltersToApply] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState([]);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    
    setFiltersApplied(prevState => ({
      ...prevState,
      [value]: isChecked
    }));
    if (event.target.checked) {
      setFiltersToApply([...filtersToApply, value]);
    } else {
      setFiltersToApply(filtersToApply.filter(filter => filter !== value));
    }
  };

  const handleFilters = (event) => {
    event.preventDefault();
    searchParams.delete('page');
    searchParams.set('filters', filtersToApply);
    navigate(`/products?${searchParams.toString()}`);
  }

  const handleClear = (event) => {
      event.preventDefault();
      setDropdownOpen(false);
      setFiltersToApply([]);
      setFiltersApplied({});

      let newSearchParams = searchParams.delete('filters');
      (searchParams.length) ? navigate(`/products?${newSearchParams.toString()}`) : navigate(`/products`);
  }


  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="btn bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Filter</span><wbr />
        <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
          <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full min-w-56 bg-white border border-slate-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">Filters</div>
          
          <form onSubmit={handleFilters}>
            <ul className="mb-4">
              {
                
                filters.map(el => {
                  return (
                    <li key={el} className="py-1 px-3">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        value={el}
                        checked={filtersApplied[el] || false}
                        onChange={handleCheckboxChange}/>
                      <span className="text-sm font-medium ml-2">{el}</span>
                    </li>
                  )
                })
              }
            </ul>
            <div className="py-2 px-3 border-t border-slate-200 bg-slate-50">
              <ul className="flex items-center justify-between">
                <li>
                  <button
                    className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                </li>
                <li>
                  <button
                    type="submit"
                    className="btn-xs bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => setDropdownOpen(false)}
                    onBlur={() => setDropdownOpen(false)}
                  >
                    Apply
                  </button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownFilter;
