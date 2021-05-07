import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getSubscibedChannels } from "../../redux/actions/videos.action"
import "./subscriptionScreen.scss"
import VideoHorisontal from "../../components/videoHorizontal/VideoHorisontal"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SubscriptionScreen = () => {
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSubscibedChannels())
    }, [dispatch ])
    const {videos, loading} = useSelector(state => state.subscriptionChannel)
    return (
        <div>
           <Container fluid>
            {!loading ? videos?.map(video=><VideoHorisontal video={video} key={video.id} subScreen/>): 
                    <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                         <Skeleton width="100%" height="160px" count={20}/>
                    </SkeletonTheme>}
           </Container>
        </div>
    )
}

export default SubscriptionScreen
