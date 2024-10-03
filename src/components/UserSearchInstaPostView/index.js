import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

const UserSearchInstaPostView = props => {
  const {eachList, onUserSearchToggleLikeIcon} = props
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
    onUserSearchToggleLikeIcon(postId, true)
  }

  const onClickDislikeBtn = () => {
    onUserSearchToggleLikeIcon(postId, false)
  }

  return (
    <li className="usersearchinstapostview-li-container">
      <div className="usersearchinstapostview-header-card">
        <div className="usersearchinstapostview-profile-icon-border">
          <img
            className="usersearchinstapostview-profile-icon"
            src={profilePic}
            alt="post author profile"
          />
        </div>
        <Link
          className="usersearchinstapostview-classname-link"
          to={`/users/${userId}`}
        >
          <h1 className="usersearchinstapostview-username">{userName}</h1>
        </Link>
      </div>
      <img
        className="usersearchinstapostview-image"
        src={imageUrl}
        alt="post"
      />
      <div className="usersearchinstapostview-footer-card">
        <div className="usersearchinstapostview-btn-card">
          {isLiked ? (
            <button
              onClick={onClickDislikeBtn}
              className="instapostview-icon-btn"
              type="button"
              testid="unLikeIcon"
            >
              <FcLike className="usersearchinstapostview-icon" />
            </button>
          ) : (
            <button
              onClick={onClickLikeBtn}
              className="usersearchinstapostview-icon-btn"
              type="button"
              testid="likeIcon"
            >
              <BsHeart className="usersearchinstapostview-icon" />
            </button>
          )}
          <button className="usersearchinstapostview-icon-btn" type="button">
            <FaRegComment className="usersearchinstapostview-icon" />
          </button>
          <button className="usersearchinstapostview-icon-btn" type="button">
            <BiShareAlt className="usersearchinstapostview-icon" />
          </button>
        </div>
        <p className="usersearchinstapostview-likes">{likesCount} likes</p>
        <p className="usersearchinstapostview-caption">{caption}</p>
        {commentsList.map(eachComment => (
          <p
            className="usersearchinstapostview-comment"
            key={eachComment.userId}
          >
            <Link
              className="usersearchinstapostview-classname-link"
              to={`/users/${eachComment.userId}`}
            >
              <span className="usersearchinstapostview-spancomment">
                {eachComment.username}
              </span>
            </Link>
            {eachComment.comment}
          </p>
        ))}
        <p className="usersearchinstapostview-createdat">{createdAt}</p>
      </div>
    </li>
  )
}

export default UserSearchInstaPostView
