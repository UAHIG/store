import React from 'react'
import styles from "../../styles/Sidebar.module.css"
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink to={`/categories/${1}`}>
              link
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.footer}>
        <a href="/help" className={styles.link} target='_blank'>Help</a>
        <a href="/terms" className={styles.link} target='_blank' style={{ textDecoration: "underline" }}>Terms & Conditions</a>

      </div>
    </section>
  )
}

export default Sidebar