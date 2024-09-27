import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

const InstaPostView = props => {
  const {eachList, onToggleLikeIcon} = props
  const {
    userId,
    userName,
    postId,
    profilePic,
    caption,
    imageUrl,
    likesCount,
    createdAt,
    commentsList,
    message,
  } = eachList

  const isLiked = message === 'Post has been liked'

  const onClickLikeBtn = () => {
    onToggleLikeIcon(postId, true)
  }

  const onClickDislikeBtn = () => {
    onToggleLikeIcon(postId, false)
  }

  return (
    <li className="instapostview-li-container">
      <div className="instapostview-header-card">
        <div className="instapostview-profile-icon-border">
          <img
            className="instapostview-profile-icon"
            src={profilePic}
            alt="post author profile"
          />
        </div>
        <Link className="instapostview-classname-link" to={`/users/${userId}`}>
          <h1 className="instapostview-userame">{userName}</h1>
        </Link>
      </div>
      <img className="instapostview-image" src={imageUrl} alt="post" />
      <div className="instapostview-footer-card">
        <div className="instapostview-btn-card">
          {isLiked ? (
            <button
              onClick={onClickDislikeBtn}
              className="instapostview-icon-btn"
              type="button"
              testid="unLikeIcon"
            >
              <FcLike className="instapostview-icon" />
            </button>
          ) : (
            <button
              onClick={onClickLikeBtn}
              className="instapostview-icon-btn"
              type="button"
              testid="likeIcon"
            >
              <BsHeart className="instapostview-icon" />
            </button>
          )}
          <button className="instapostview-icon-btn" type="button">
            <FaRegComment className="instapostview-icon" />
          </button>
          <button className="instapostview-icon-btn" type="button">
            <BiShareAlt className="instapostview-icon" />
          </button>
        </div>
        <p className="instapostview-likes">{likesCount} likes</p>
        <p className="instapostview-caption">{caption}</p>
        {commentsList.map(eachComment => (
          <p className="instapostview-comment" key={eachComment.userId}>
            <Link
              className="instapostview-classname-link"
              to={`/users/${eachComment.userId}`}
            >
              <span className="instapostview-spancomment">
                {eachComment.username}
              </span>
            </Link>
            {eachComment.comment}
          </p>
        ))}
        <p className="instapostview-createdat">{createdAt}</p>
      </div>
    </li>
  )
}

export default InstaPostView
