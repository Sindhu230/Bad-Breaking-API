
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/ui/Search'
import './App.css'
import ReactPaginate from 'react-paginate';

const App = () => {
  const [items, setItems] = useState([0,60])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] =useState(0)

const usersPerPage = 10
const pagesVisited = pageNumber * usersPerPage

const displayUsers = items.slice(pagesVisited, pagesVisited + usersPerPage).map((container) =>{
    <CharacterGrid isLoading={isLoading} items={items} />

})

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      )

      console.log(result.data)

      setItems(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query])
const pageCount = Math.ceil(items.length /usersPerPage)
const changePage = ({selected})=>{
setPageNumber(selected);
}  
return (
    <div className='container'>
     {displayUsers}
     <ReactPaginate
     previousLabel ={"Previous"}
     nextLabel ={"Next"}
     pageCount={pageCount}
     onPageChange ={changePage}
     containerClassName ={"paginationBttns"}
     previousLinkClassName ={"previousBttn"}
     nextLinkClassName={"nextBttn"}
     disabledClassName ={"paginationDisable"}
     activeClassName={"paginationActive"}
     />
     <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default App