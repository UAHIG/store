import React, { useEffect } from "react"
import styles from "../../styles/Header.module.css"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import LOGO from "../../images/logo.svg"
import AVATAR from "../../images/avatar.png"
import { useDispatch, useSelector } from "react-redux"
import { toggleForm } from "../../features/user/userSlice"
import { useState } from "react"
import { useGetProductsQuery } from "../../features/api/apiSlice"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setsearchValue] = useState("")

  const { currentUser, cart, favorites } = useSelector(({ user }) => user)

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true))
    else navigate(ROUTES.PROFILE)
  }

  const handleSearch = ({ target: { value } }) => {
    setsearchValue(value)
  }

  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR })

  const { data, isLoading } = useGetProductsQuery({ title: searchValue })
  useEffect(() => {}, [searchValue])

  useEffect(() => {
    if (!currentUser) return
    setValues(currentUser)
  }, [currentUser])

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt='Stuff' />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}>{values.name}</div>
        </div>

        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className='icon'>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type='search'
              name='search'
              placeholder='Search for anything..'
              autoComplete='off'
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? "Loading"
                : !data || data.length === 0
                ? "No results"
                : data.map(({ title, images, id }) => {
                    return (
                      <Link
                        onClick={() => setsearchValue("")}
                        className={styles.item}
                        to={`/products/${id}`}
                        key={id}>
                        <div
                          className={styles.image}
                          style={{
                            backgroundImage: `url(${images[0]})`,
                          }}></div>
                        <div className={styles.title}>{title}</div>
                      </Link>
                    )
                  })}
            </div>
          )}
        </form>
        <div className={styles.account}>
          <Link to={ROUTES.FAVORITES} className={styles.favourites}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
            {!!favorites.length && <span className={styles.count}>{favorites.length}</span>}
          </Link>

          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && <span className={styles.count}>{cart.length}</span>}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
