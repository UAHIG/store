import React from "react"
import styles from "../../styles/Footer.module.css"
import { Link } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import LOGO from "../../images/logo.svg"

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt='Stuff' />
        </Link>
      </div>

      <div className={styles.rights}>
        Developed by{" "}
        <a href='https://github.com/UAHIG' target='blank' rel='noreffer'>
          UAHIG
        </a>
      </div>
      <div className={styles.socials}>
        <a href='https://www.instagram.com' target='blank' rel='noreffer'>
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
          </svg>
        </a>

        <a href='https://www.facebook.com' target='blank' rel='noreffer'>
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
          </svg>
        </a>

        <a href='https://www.youtube.com' target='blank' rel='noreffer'>
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
          </svg>
        </a>

      </div>
    </section>
  )
}

export default Footer
