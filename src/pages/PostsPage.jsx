import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';

const PostsPage = () => {
   const params = useParams(null)
   const [post, setPost] = useState({})
   const [fetchPostById, isLoading, error] = useFetching(async () => {
      const response = await PostService.getById(params.id)
      setPost(response.data);
   })

   useEffect(() => {
      if (params) {
         fetchPostById(params.id)
      }
   }, [])

   return (
      <div>
         <h1>You just opened fucking {params.id} post</h1>
         {isLoading
            ? <Loader />
            : <div>{post.id}. {post.title}</div>
         }

      </div>
   );
}

export default PostsPage;