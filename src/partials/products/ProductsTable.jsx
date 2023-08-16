import React from 'react';
import Products from './ProductsTableItem';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowDown from "../../icons/arrow-down.svg";
import ArrowUp from "../../icons/arrow-up.svg";

function ProductsTable({list, pagination}) {

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const orders = ['asc','desc'];
  const currentOrder = searchParams.get('order') || 'asc'
  const currentOrderBy = searchParams.get('orderBy') || 'title'
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

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">Productos <span className="text-slate-400 font-medium">{pagination.totalResults}</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer">
                  <div id="id" onClick={() => handleOrder('id')} className="flex items-center">
                    <span className="font-semibold text-left">Id</span>
                    {renderArrows('id')}
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer">
                  <div className="flex items-center" id="title" onClick={() => handleOrder('title')}>
                    <span className="font-semibold text-left">Producto</span>
                    {renderArrows('title')}
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer">
                  <div className="flex items-center" id="price" onClick={() => handleOrder('price')}>
                    <span className="font-semibold text-left">Precio</span>
                    {renderArrows('price')}
                </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer">
                  <div className="flex items-center" id="stock" onClick={() => handleOrder('stock')}>
                    <span className="font-semibold text-left">Stock</span>
                    {renderArrows('stock')}
                </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer">
                  <div className="flex items-center" id="tax" onClick={() => handleOrder('tax')}>
                    <span className="font-semibold text-left">Impuesto</span>
                    {renderArrows('tax')}
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {
                list.map(product => {
                  return (
                    <Products
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      stock={product.stock}
                      tax={product.tax}
                    />
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default ProductsTable;
