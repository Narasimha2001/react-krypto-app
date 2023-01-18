import { HStack } from '@chakra-ui/react';
import React from 'react'
import Pagination from 'react-js-pagination';

const PageNation = ({activePage}) => {
    function handlePageChange(){

    }
  return (
    <HStack>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </HStack>
    );
  
}

export default PageNation