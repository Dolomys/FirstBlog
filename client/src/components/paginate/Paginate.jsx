import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import Posts from '../posts/Posts';
import './paginate.css'

export function PaginatedItems({posts, itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(posts.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(posts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage,posts]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % posts.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <div className='postsAndPaginate'>
        <Posts posts={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel=" > "
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel=" < "
          renderOnZeroPageCount={null}
          activeClassName="activePage"
          className="pagination"
        />
      </div>

    );
  }