import React, { useContext } from 'react'
import Post from './Post'
import {PostList as PostListData} from '../store/post-list-store'
import WelcomeMessage from './WelcomeMessage';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
function PostList() {
  const {postList, fetching} = useContext(PostListData);
  return (
    <>
    {fetching && <LoadingSpinner />}
    {!fetching && postList.length===0 && <WelcomeMessage />}
    {!fetching && postList.map((post)=> 
    <Post key={post.id} post={post}/>)}
    
    </>
  )
}

export default PostList