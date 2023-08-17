import React from 'react';
import Products from './ProductsTableItem';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowDown from "../../icons/arrow-down.svg";
import ArrowUp from "../../icons/arrow-up.svg";
import Loader from '../../components/Loader';
import { useTranslation } from 'react-i18next';

function ProductsTable({list, pagination, isLoading}) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const orders = ['asc','desc'];
  const currentOrder = searchParams.get('order') || 'asc'
  const currentOrderBy = searchParams.get('orderBy') || 'title'

  const {t} = useTranslation();

  const renderArrows = (id) => {
    if (currentOrderBy === id) {
      if (currentOrder === 'asc') {
        return (
          <img src={ArrowUp} alt="Arrow Up" />
        )
      } else {
        return (
          <img src={ArrowDown} alt="Arrow Down" />
        )
      }
    }   
  }

  const handleOrder = (orderByValue) => {
    searchParams.delete('page');
    const orderValue = orderByValue !== currentOrderBy ? orders[0] : orders.filter((order) => order !== currentOrder)[0];
    searchParams.set('orderBy', orderByValue);
    searchParams.set('order', orderValue);
    navigate(`/products?${searchParams.toString()}`);
  };

  const headersTitles = ["id", "title", "price", "stock", "tax"]

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">{t("products")} <span className="text-slate-400 font-medium">{pagination.totalResults}</span></h2>
      </header>
      <div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                {headersTitles.map(tit => (
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer">
                  <div id={tit} onClick={() => handleOrder(tit)} className="flex items-center">
                    <span className="font-semibold text-left">{t(`table_header.${tit}`)}</span>
                    {renderArrows(tit)}
                  </div>
                </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                list.map((product, index) => (
                  <Products
                    key={index}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    stock={product.stock}
                    tax={product.tax}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    <Loader />
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default ProductsTable;
