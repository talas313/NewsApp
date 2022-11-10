import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getNews } from "../actions/news"
import News from "../components/News"

const Home = () => {
  const dispatch = useDispatch()
  const news = useSelector((state) => state.news)
  
  useEffect(() => {
    dispatch(getNews())
  }, [])

  return(
    news.length === 0 ? <div class="mx-auto mt-5 text-center"> No news to show! </div> : (
      <div class="container m-auto row row-cols-1 row-cols-md-3 g-4 mt-2 w-100">
        {news.map((n) => (
          <div key={n.id}>
            <News data={n} />
          </div>
        ))}
      </div>
    )
  )
}

export default Home