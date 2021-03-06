import React, { useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesBar from "../../components/categoriesBar/CategoriesBar"
import Video from "../../components/video/Video"
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action'
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideos from '../../components/skeletons/SkeletonVideos'


function HomeScreen() {

     const dispatch = useDispatch()
     useEffect(() => {
            dispatch(getPopularVideos())
     }, [dispatch])

     const {videos, activeCategory, loading} = useSelector(state => state.homeVideos)
     const fetchData = () => {
         //LOGIC
         if(activeCategory === 'All'){
         dispatch(getPopularVideos())
          } else {
             dispatch(getVideosByCategory(activeCategory))
         }
     }

    return (
        <div>
           <Container>
               <CategoriesBar />
               
                   <InfiniteScroll
                   dataLength={videos.length}
                   next={fetchData}
                   hasMore={true}
                   loader={<div className="spinner-border text-danger d-block mx-auto"></div>} 
                   className="row"
                   >
                { !loading ? videos.map((video) => (
                    <Col lg={3} md={4} key={video.id}>
                    <Video video={video} />
                    </Col>
                ))  
                :   [...Array(20).map(() => 
                    ( 
                    <Col lg={3} md={4} >
                    <SkeletonVideos/>
                    </Col>
                    )
                    )]
                    
                    }

                </InfiniteScroll>
               
           </Container>
        </div>
    )
}

export default HomeScreen
