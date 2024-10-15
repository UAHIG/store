import { useDispatch } from "react-redux"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import AppRoutes from "../Routes/Routes"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import { useEffect } from "react"
import { getCategories } from "../../features/categories/categoriesSlice"
import { getProducts } from "../../features/prodducts/productSlice"

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className='app'>
      <Header />
      <div className='container'>
        <Sidebar />
        <Home />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  )
}

export default App
