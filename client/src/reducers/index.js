import { combineReducers } from 'redux'

import comments from './comments'
import news from './news'
import users from './users'

export default combineReducers({ comments, news, users })