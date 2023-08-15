import React from 'react';
import Products from './ProductsTableItem';
import { useLocation, useNavigate } from 'react-router-dom';


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
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
          <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#0F0F0F"/>
          </svg>)
      } else {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
          <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" fill="#0F0F0F"/>
          </svg>)
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
