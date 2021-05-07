import React, { useEffect, useState } from 'react'
import "./_videohorizontal.scss"
import { AiFillEye } from 'react-icons/ai'
import request from '../../api'
import moment from "moment"
import numeral from "numeral"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'

function VideoHorisontal({video, searchScreen, subScreen}) {
    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)
    const [channelIcon, setChaneelIcon] = useState(null)

    const {id,
    snippet:{
         channelId,
         channelTitle,
         description,
         title,
         publishedAt,
         thumbnails:{medium},
         resourceId
        },
    
    } = video

    const isVideo = !(id.kind === "youtube#channel" || subScreen)

    useEffect(()=>{

        const get_video_details = async()=> {

            const {data:{items}} = await request('/videos', {
                params:{
                    part:'contentDetails, statistics',
                    id:id.videoId
                }
            })
            setDuration(items[0].contentDetails.duration)
            setViews(items[0].statistics.viewCount)
        }
        if(isVideo)
        get_video_details()

    },[id, isVideo])

    useEffect(()=>{

        const get_channel_icon = async()=> {

            const {data:{items}} = await request('/channels', {
                params:{
                    part:'snippet',
                    id:channelId
                }
            })
            setChaneelIcon(items[0].snippet.thumbnails.default)
        }
        get_channel_icon()

    },[channelId])

    const _channelId = resourceId?.channelId || channelId
    
    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')
    const history = useHistory()
    const handelClick = () => {
        // TODO HANDEL CHANNEL CLICK
        isVideo ?
        history.push(`/watch/${id.videoId}`)
        : history.push(`/channel/${_channelId}`)
    }

    const thumbnail = !isVideo && "videoHorizontal__thumbnail-channel" 
    return (
       <Row className="videoHorizontal m-1 py-2 align-items-center" onClick={handelClick}>
           {/* //TODO RFRACOT GRID */}
           <Col xs={6} md={searchScreen || subScreen ? 4 : 6} className="videoHorizontal__left">
           <LazyLoadImage
            src={medium.url}
            effect="blur" 
            className={`videoHorizontal__thumbnail ${thumbnail}`}
            wrapperClassName="videoHorizontal__thumbnail-wrapper"
            />
            {isVideo && (
                 <span className="videoHorizontal__duration">{_duration}</span> 
            )}
           

           </Col>
           <Col xs={6} md={searchScreen || subScreen ? 8 : 6} className="videoHorizontal__right p-0">
               <p className="videoHorizontal__title mb-1">{title}</p>

                {isVideo && (
                      <div className="videoHorizontal__details">
                      <AiFillEye /> {numeral(views).format('0.a')} Views • &nbsp;
                        {moment(publishedAt).fromNow()}
                  </div>
                )}
             
               {(searchScreen || subScreen) && <p className="mt-1 videoHorizontal__descripition">
                   {description}
                   </p>}
               <div className="videoHorizontal__channel d-flex align-items-center my-1">
                   {/* //TODO SHOW IN SEARCH SCREEN */}
               {isVideo && (<LazyLoadImage 
            src={channelIcon?.url} 
            effect="blur" 
           
            /> )}
            <p className="mb-0">{channelTitle}</p>
               </div>
               {
              subScreen && (
                <p className="mt-2">
                {video.contentDetails.totalItemCount}{' '}Videos
            </p>
              )
               }
           </Col>
       </Row>
    )
}

export default VideoHorisontal
