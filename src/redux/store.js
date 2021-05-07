import {createStore, applyMiddleware, combineReducers} from "redux";

import { composeWithDevTools } from 'redux-devtools-extension';

import  thunk  from "redux-thunk"
import { authReducer } from "./reducers/auth.reducer";
import { channelVideosReducer, homeVideoReducer, searchedVideosReducer, subscriptionChannelReducer } from "./reducers/videos.reducer";
import{selectedVideoReducer} from "./reducers/videos.reducer";
import {channelDetailsReducer} from "./reducers/channel.reducer";
import {commentListReducer} from "./reducers/comments.reducer";
import {relatedVideoReducer} from "./reducers/videos.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideoReducer,
    selectedVideo: selectedVideoReducer,
    channelDetails: channelDetailsReducer,
    commentList: commentListReducer,
    relatedVideo: relatedVideoReducer,
    searchVideos: searchedVideosReducer,
    subscriptionChannel:subscriptionChannelReducer,
    channelVideos: channelVideosReducer
})

const store = createStore(
   rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk)) 
)

export default store;

