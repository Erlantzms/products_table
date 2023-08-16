import React from 'react';

function ProductsTableItem(props) {
  const totalColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-emerald-500';
      case 'Due':
        return 'text-yellow-500';
      case 'Overdue':
        return 'text-rose-500';
      default:
        return 'text-slate-500';
    }
  };

  const warningStock = (stock) => {
    if (stock <= 5) {
        return 'bg-red-100 text-red-600';
    }
  };

  const defineTax = (tax) => {
    switch (tax) {
      case "fr_general_20":
        return 20
      case "fr_reduced_5.5":
        return 5.5
      case 'es_general_21':
        return 21
      case 'es_reduced_10':
        return 10
      default:
        return 4
    }
  }


  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{props.id}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`font-medium text-slate-500`}>{props.title}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-slate-800">{props.price}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <span className={`font-medium px-2 py-1 ${warningStock(props.stock)} rounded-full`}>{(props.stock)}</span>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <span className={`font-medium px-2 py-1 rounded-full`}>{`${defineTax(props.tax)}%`}</span>
      </td>
    </tr>
  );
}

export default ProductsTableItem;
