import { useDispatch } from "react-redux"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import AppRoutes from "../Routes/Routes"
import Sidebar from "../Sidebar/Sidebar"
import { useEffect } from "react"
import { getCategories } from "../../features/categories/categoriesSlice"
import { getProducts } from "../../features/prodducts/productSlice"
import UserForm from "../User/UserForm"
import PosterActivity from "../PoserActivity/PosterActivity"

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className='app'>
      <Header />
      <UserForm />
      <PosterActivity />
      <div className='container'>
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  )
}

export default App
