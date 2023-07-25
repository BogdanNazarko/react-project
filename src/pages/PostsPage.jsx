import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';

const PostsPage = () => {
   const params = useParams()
   const [post, setPost] = useState(null)
   const [fetchPostById, isLoading, error] = useFetching(async () => {
      const response = await PostService.getById(params.id)
   })

   useEffect(() => {

   })

   return (
      <div>
         <h1>Why You just opened fucking {params.id} post?</h1>
      </div>
   );
}

export default PostsPage;