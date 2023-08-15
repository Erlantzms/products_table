import React, { useState, useEffect } from 'react';
import Products from './ProductsTableItem';
import { useLocation, useNavigate } from 'react-router-dom';


function ProductsTable({list, pagination}) {

  const location = useLocation();
  const navigate = useNavigate();

  const handleOrderByChange = (orderByValue) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('orderBy', orderByValue);
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
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left" id="id" onClick={() => handleOrderByChange('id')}>Id</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left" id="title" onClick={() => handleOrderByChange('title')}>Producto</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left" id="price" onClick={() => handleOrderByChange('price')}>Precio</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left" id="stock" onClick={() => handleOrderByChange('stock')}>Stock</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left" id="tax" onClick={() => handleOrderByChange('tax')}>Impuesto</div>
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
