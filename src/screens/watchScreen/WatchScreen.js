import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Comments from '../../components/comments/Comments'
import VideoHorisontal from '../../components/videoHorizontal/VideoHorisontal'
import VideoMetaData from '../../components/videoMetaData/VideoMetaData'
import { getRealtedVideos, getVideoById } from '../../redux/actions/videos.action'
import "./watchscreen.scss"
import {Helmet} from "react-helmet";


function WatchScreen() {

    const {id} = useParams()
    const dispatch = useDispatch()

    const {videos, loading:relatedVideoLoading} = useSelector(state => state.relatedVideo)

    useEffect(() => {
        dispatch(getVideoById(id))
        dispatch(getRealtedVideos(id))
    }, [dispatch, id])

    const {video, loading} = useSelector(state => state.selectedVideo)

    return (
       <Row>
           <Helmet>
               
                <title>{video?.snippet?.title}</title>
              
            </Helmet>
           <Col lg={8}>
            <div className="watchScreen_player">
           <iframe allowFullScreen width="100%" height="100%" title={video?.snippet?.title}
            src={`https://www.youtube.com/embed/${id}`} frameBorder="0">
            </iframe>
            </div>
            {
                !loading ?    <VideoMetaData video={video} videoId={id}/> : <h6>Loading...</h6>
            }
          
            <Comments videoId={id} totalComments={video?.statistics?.commentCount}/>
           </Col>
           <Col lg={4}>

               {

                   !relatedVideoLoading ? videos?.filter(video=> video.snippet).map((video)=><VideoHorisontal video={video} key={video.id.videoId}/>)
                    :
                    <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                    <Skeleton width="100%" height="130px" count={15}/>
                    </SkeletonTheme>
                }

           </Col>
       </Row>
    )
}

export default WatchScreen                