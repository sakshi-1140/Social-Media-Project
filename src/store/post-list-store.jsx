import { useEffect } from "react";
import { useState } from "react";
import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  fetching:false,
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [fetching,setFetching]=useState(false)
  

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts:posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };
  useEffect(()=>{
    setFetching(true);
    //console.log("fetch started")
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts" ,{signal})
    .then((res)=>res.json())
    .then(data=>{
      console.log(data.posts);
      console.log("initial post from server")
      addInitialPosts(data.posts);
      setFetching(false);
    });
   return ()=>{
   //console.log("cleaning up UseEffect");
    controller.abort(); // delete isko
   }
  },[])

  return (
    <PostList.Provider
      value={{ postList,fetching, addPost, deletePost }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
