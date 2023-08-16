export const getProducts = (setList, setPagination, paramsObject, setIsLoading) => {
    const endpoint = 'http://vps-123eb2fc.vps.ovh.net/graphql';
    const query = `
      query FetchProducts($tax_filter: [String!], $title_filter: String, $order_by: String, $order: String, $page: Int!, $per_page: Int!) {
        fetchProducts {
          results(
            taxFilter: $tax_filter,
            titleFilter: $title_filter,
            orderBy: $order_by,
            order: $order,
            page: $page,
            perPage: $per_page
          ) {
            id
            title
            price
            tax
            stock
          }
          pagination(
            taxFilter: $tax_filter,
            titleFilter: $title_filter,
            orderBy: $order_by,
            order: $order,
            page: $page,
            perPage: $per_page
          ) {
            totalResults
            limitValue
            totalPages
            currentPage
            nextPage
            prevPage
            firstPage
            lastPage
            outOfRange
          }
        }
      }
    `;

    const variables = {
        tax_filter: paramsObject.filters,
        title_filter: paramsObject.title,
        order_by: paramsObject.orderBy || "title",
        order: paramsObject.order || "asc",
        page: paramsObject.page || 1,
        per_page: 100,
    };

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    .then(response => response.json())
    .then(data => {
      setList(data?.data?.fetchProducts?.results);
      setPagination(data?.data?.fetchProducts?.pagination);
      setIsLoading(false)
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }