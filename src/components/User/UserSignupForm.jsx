import React from "react"
import { useState } from "react"
import styles from "../../styles/User.module.css"
import { createUser } from "../../features/user/userSlice"
import { useDispatch } from "react-redux"

const UserSignupForm = ({ closeForm, toggleCurrentFormType }) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  })

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const defaultAvatar = "https://cs14.pikabu.ru/post_img/2023/02/13/8/1676295806139337963.jpg";
   
    const userData = {
      ...values,
      avatar: values.avatar || defaultAvatar, // используем значение по умолчанию, если поле пустое
    };
  
    const isNotEmpty = userData.name && userData.email && userData.password;
    // const isNotEmpty = Object.values(values).every((val) => val)

    if (!isNotEmpty) return

    dispatch(createUser(userData))
    closeForm()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className='icon'>
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Sign Up</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type='email'
            placeholder='Your email'
            name='email'
            value={values.email}
            autoComplete='off'
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type='name'
            placeholder='Your name'
            name='name'
            value={values.name}
            autoComplete='off'
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type='password'
            placeholder='Your password'
            name='password'
            value={values.password}
            autoComplete='off'
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type='avatar'
            placeholder='Avatar link'
            name='avatar'
            value={values.avatar}
            autoComplete='off'
            onChange={handleChange}
            title="You can enter a link to your avatar, if you want"
          />
        </div>

        <div
          className={styles.link}
          onClick={() => toggleCurrentFormType("login")}>
          I already have an account
        </div>
        <button type='submit' className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  )
}

export default UserSignupForm;
