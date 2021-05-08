import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentList, getCommentList } from '../../redux/actions/comments.action'
import Comment from '../comment/Comment'
import "./_comments.scss"


function Comments({videoId, totalComments}) {

    const comments = useSelector(state => state.commentList.comments)

    const [text, setText] = useState('')
    const {photoURL} = useSelector(state => state.auth?.user)
    const _comments = comments?.map(comment=>comment.snippet.topLevelComment.snippet)

    const dispatch = useDispatch()
    useEffect(() => {
    dispatch(getCommentList(videoId))
    }, [dispatch, videoId])
    const handelComment = (e) => {
        e.preventDefault();
        if(text.length === 0) return
        dispatch(commentList(videoId, text))
        setText('')
    }
    return (
        <div className=" comments">
           <p>{totalComments} comments</p>
           <div className="comments__form d-flex w-100 my-2">
           <img className="rounded-circle mr-3" 
           src={photoURL} 
           alt="userimage"/>
             <form onSubmit={handelComment} className="d-flex flex-grow-1">
               <input className="flex-grow-1" 
               type="text" placeholder="Write a comment..."
               value={text}
               onChange={e=>setText(e.target.value)}
               />
               <button className="border-o p-2">Comment</button>
           </form>
           </div>
            <div className="comments__list">
                {
                    _comments?.map((comment, i) => <Comment comment={comment} key={i}/>)
                }
            </div>
        </div>
    )
}

export default Comments
