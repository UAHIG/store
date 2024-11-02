import React, { useState, useEffect } from "react"
import { togglePosterActivity } from "../../features/user/userSlice"
import styles from "../../styles/User.module.css"
import homeStyles from "../../styles/Home.module.css"
import posterStyles from "../../styles/PosterActivity.module.css"
import { useSelector, useDispatch } from "react-redux"
import { fullText } from "../../utils/constants"

const PosterActivity = () => {
  const dispatch = useDispatch()
  const { showPosterActivity } = useSelector(({ user }) => user)
  const [typedText, setTypedText] = useState("")

  useEffect(() => {
    let typingInterval;
  
    if (showPosterActivity) {
      setTypedText(""); 
      let currentIndex = 0;
      typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText((prev) => prev + fullText.charAt(currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 150); 
    }
  
    return () => {
      clearInterval(typingInterval);
      setTypedText(""); 
    };
  }, [showPosterActivity]);
  
  
  const closePosterActivity = () => dispatch(togglePosterActivity(false))

  return showPosterActivity ? (
    <div className={styles.overlayAi} onClick={closePosterActivity}>
      <div className={styles.wrapperAi}>
        <div className={posterStyles.typingEffect}>{typedText}</div>
        <div className={homeStyles.image}>
        </div>
      </div>
    </div>
  ) : null
}

export default PosterActivity
