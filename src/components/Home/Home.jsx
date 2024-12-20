import React, { useEffect } from "react"
import Poster from "../Poster/Poster"
import Products from "../Products/Products"
import { useDispatch, useSelector } from "react-redux"
import Categories from "../Categories/Categories"
import Banner from "../Banner/Banner"
import { filterByPrice } from "../../features/prodducts/productSlice"

const Home = () => {
  const dispatch = useDispatch()
  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state)
  useEffect(() => {
    if (!list.length) return
    dispatch(filterByPrice(100))
  }, [dispatch, list.length]);

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title='Tranding' />
      <Categories products={categories.list} amount={5} title='You must see' />
      <Banner />
      <Products products={filtered} amount={5} title='Less then 100$' />
    </>
  )
}

export default Home
