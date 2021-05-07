import { CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SELECT_VIDEOS_FAIL, SELECT_VIDEOS_REQUEST, SELECT_VIDEOS_SUCCESS, SUBSCRIBTION_CHANNEL_FAIL, SUBSCRIBTION_CHANNEL_REQUEST, SUBSCRIBTION_CHANNEL_SUCCESS } from "../actionType"

export const homeVideoReducer = (state={

videos:[],
loading: false,
nextPageToken: null,
activeCategory:"All" 

}, action) => {

const {type, payload} = action 

switch(type){
    case HOME_VIDEOS_SUCCESS: 
    return {
        ...state,
        videos:
        state.activeCategory === payload.category
        ? [...state.videos,...payload.videos]
        : payload.videos
        ,
        loading:false,
        nextPageToken:payload.nextPageToken,
        activeCategory:payload.category
    }

        case HOME_VIDEOS_FAIL: 
        return {
            ...state,
            loading:false,
            error:payload
        }
        case HOME_VIDEOS_REQUEST: 
        return {
            ...state,
            loading:true,
            
        }

    default: return state
}


}

export const selectedVideoReducer = (
    state = {
    loading:true,
    video:null,
}, 
action
) => {
const {payload, type} = action

switch (type) {
    case  SELECT_VIDEOS_REQUEST:
        return{
            ...state,
            loading:true
        }
        case SELECT_VIDEOS_SUCCESS: 
        return{
            ...state,
            video:payload,
            loading:false
        }
        case SELECT_VIDEOS_FAIL:
            return{
                ...state,
                video:null,
                loading:false,
                error:payload
            }

    default:
        return state
}

}

export const relatedVideoReducer = (
    state = {
    loading:true,
    videos:[],
}, 
action
) => {
const {payload, type} = action

switch (type) {
    case  RELATED_VIDEO_REQUEST:
        return{
            ...state,
            loading:true
        }
        case RELATED_VIDEO_SUCCESS: 
        return{
            ...state,
            videos:payload,
            loading:false
        }
        case RELATED_VIDEO_FAIL:
            return{
                ...state,
                loading:false,
                error:payload
            }

    default:
        return state
}

}

export const searchedVideosReducer = (
    state = {
       loading: true,
       videos: [],
    },
    action
 ) => {
    const { payload, type } = action
 
    switch (type) {
       case SEARCH_VIDEO_REQUEST:
          return {
             ...state,
             loading: true,
          }
       case SEARCH_VIDEO_SUCCESS:
          return {
             ...state,
             videos: payload,
             loading: false,
          }
       case SEARCH_VIDEO_FAIL:
          return {
             ...state,
             loading: false,
             error: payload,
          }
 
       default:
          return state
    }
 }

 export const subscriptionChannelReducer = (
    state = {
       loading: true,
       videos: [],
    },
    action
 ) => {
    const { payload, type } = action
 
    switch (type) {
       case SUBSCRIBTION_CHANNEL_REQUEST:
          return {
             ...state,
             loading: true,
          }
       case SUBSCRIBTION_CHANNEL_SUCCESS:
          return {
             ...state,
             videos: payload,
             loading: false,
          }
       case SUBSCRIBTION_CHANNEL_FAIL:
          return {
             ...state,
             loading: false,
             error: payload,
          }
 
       default:
          return state
    }
 }

 export const channelVideosReducer = (
   state = {
      loading: true,
      videos: [],
   },
   action
) => {
   const { payload, type } = action

   switch (type) {
      case CHANNEL_VIDEOS_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case CHANNEL_VIDEOS_SUCCESS:
         return {
            ...state,
            videos: payload,
            loading: false,
         }
      case CHANNEL_VIDEOS_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}