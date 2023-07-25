import React, { useEffect, useState } from 'react';
import PostService from "../API/PostService";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";


function Posts() {
   const [posts, setPosts] = useState([]); //массив постов
   const [filter, setFilter] = useState({ sort: '', query: '' });
   const [modal, setModal] = useState(false);
   const [totalPages, setTotalPages] = useState(0);
   const [limit, setLimit] = useState(10);
   const [page, setPage] = useState(1);
   const sortedAndSerachedPosts = usePosts(posts, filter.sort, filter.query);

   const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data) //загружаем полученные посты в posts
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
   })

   useEffect(() => {
      fetchPosts();
   }, [page])

   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }

   // получаем post из дочернего компонента
   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id));
   }

   const changePage = (page) => {
      setPage(page)
   }

   return (
      <div className="App">
         {/* <button onClick={fetchPosts}> GET POSTS </button> */}
         <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
            Create fucking post
         </MyButton>
         <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost} />
         </MyModal>

         <hr style={{ margin: '15px 0' }} />
         <PostFilter filter={filter} setFilter={setFilter} />
         {postError &&
            <h1>Error has occurred ${postError}</h1>}
         {isPostsLoading
            ?
            <div><Loader /></div>
            :
            <PostList remove={removePost} posts={sortedAndSerachedPosts} title={"Posts list 1"} />
         }
         <Pagination
            page={page}
            totalPages={totalPages}
            changePage={changePage}
         />
      </div >
   );
}

export default Posts;