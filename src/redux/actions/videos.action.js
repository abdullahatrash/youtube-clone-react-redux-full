import {CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SELECT_VIDEOS_FAIL, SELECT_VIDEOS_REQUEST, SELECT_VIDEOS_SUCCESS, SUBSCRIBTION_CHANNEL_FAIL, SUBSCRIBTION_CHANNEL_REQUEST, SUBSCRIBTION_CHANNEL_SUCCESS } from "../actionType"
import request from "../../api"


export const getPopularVideos = () => async (dispatch, getState) => {

    try{

        dispatch({
            type: HOME_VIDEOS_REQUEST,
        })
        const {data} = await request("/videos", {
            params: {
                part: "snippet, contentDetails, statistics",
                chart:"mostPopular",
                regionCode: "US",
                maxResults:20,
                pageToken: getState().homeVideos.nextPageToken,
            }
        })

        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category:"All"
            }
        })
        

    } catch (error) {
        console.log(error.message)
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload:error.message
        })
    }
}

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {

    try{

        dispatch({
            type: HOME_VIDEOS_REQUEST,
        })
        const {data} = await request("/search", {
            params: {
                part: "snippet",
                maxResults:20,
                pageToken: getState().homeVideos.nextPageToken,
                q:keyword,
                type:"video"
            }
        })

        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category:keyword
            }
        })
        

    } catch (error) {
        console.log(error.message)
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload:error.message
        })
    }
}

export const getVideoById = (id) => async dispatch => {
    try {
        dispatch({
            type: SELECT_VIDEOS_REQUEST,
        })
        const { data } =  await request('/videos', {
            params:{
                part:'snippet, statistics',
                id:id
            }
        })
        dispatch({
            type: SELECT_VIDEOS_SUCCESS,
            payload:data.items[0] 
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: SELECT_VIDEOS_FAIL,
            payload:error.message
        })
    }
}

export const getRealtedVideos = (id) => async dispatch => {
    try {
        dispatch({
            type: RELATED_VIDEO_REQUEST,
        })
        const { data } =  await request('/search', {
            params:{
                part:'snippet',
                relatedToVideoId :id,
                maxResults:15,
                type:"video"
            }
        })
        dispatch({
            type: RELATED_VIDEO_SUCCESS,
            payload:data.items 
        })
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type: RELATED_VIDEO_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getVideosBySearch = keyword => async dispatch => {
    try {
       dispatch({
          type: SEARCH_VIDEO_REQUEST,
       })
       const { data } = await request('/search', {
          params: {
             part: 'snippet',
 
             maxResults: 20,
             q: keyword,
             type: 'video,channel',
          },
       })
 
       dispatch({
          type: SEARCH_VIDEO_SUCCESS,
          payload: data.items,
       })
    } catch (error) {
       console.log(error.message)
       dispatch({
          type: SEARCH_VIDEO_FAIL,
          payload: error.message,
       })
    }
 }

 export const getSubscibedChannels = () => async (dispatch, getState) => {
    try {
        dispatch({
            type:SUBSCRIBTION_CHANNEL_REQUEST
        })
        const {data} = await request("./subscriptions", {
            params: {
                part:"snippet, contentDetails",
                mine:true
            },
            headers:{
                Authorization:`Bearer ${getState().auth.accessToken}`
            }
        })

        dispatch({
            type: SUBSCRIBTION_CHANNEL_SUCCESS,
            payload:data.items
        })
        
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type:SUBSCRIBTION_CHANNEL_FAIL,
            payload:error.response.data
        })
      
    }
}

export const getVideosByChannels = (id) => async (dispatch) => {
    try {
        dispatch({
            type:CHANNEL_VIDEOS_REQUEST
        })

        // 1. get upload playlist id
        const {data:{items}} = await request("./channels", {
            params: {
                part:"contentDetails",
                id:id
            },
           
        })
        const uploadPlayListId = items[0].contentDetails.relatedPlaylists.uploads

       // 2. get the videos using the id 

       const {data} = await request("./playlistItems", {
        params: {
            part:"contentDetails, snippet",
            playlistId:uploadPlayListId,
            maxResults:30
        },
    })
        dispatch({
            type: CHANNEL_VIDEOS_SUCCESS,
            payload:data.items
        })
        
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type:CHANNEL_VIDEOS_FAIL,
            payload:error.response.data.message
        })
      
    }
}