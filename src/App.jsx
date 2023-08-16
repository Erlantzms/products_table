import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

// Import pages
import Products from './pages/Products';
import PageNotFound from './pages/utility/PageNotFound';
import { getProducts } from './helpers/helpers';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';


function App() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''

  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    const paramsObject = {
      orderBy : searchParams.get('orderBy'),
      order : searchParams.get('order'),
      page : parseInt(searchParams.get('page')),
      filters : (searchParams.get('filters'))?.split(','),
      title : (searchParams.get('title'))
    } 
    getProducts(setList, setPagination, paramsObject, setIsLoading)
  }, [location.search]);

  return (
    <>
    <I18nextProvider i18n={i18n}>
      <Routes>
        <Route exact path="/" element={<Products list={list} pagination={pagination} isLoading={isLoading}/>} />
        <Route path="/products" element={<Products list={list} pagination={pagination} isLoading={isLoading}/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </I18nextProvider>
    </>
  );
}

export default App;
