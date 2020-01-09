import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Alert } from 'react-bootstrap';
import CommentModal from "./component/CommentModal";
import InfoCard from "./component/InfoCard";
import PostCard from "./component/PostCard";
import Loader from './component/Loader';
import apiCall from "./appService";
import moment from 'moment';

function App() {
  // State initialization
  const [ posts, setPosts ] = useState([]);
  const [ comments, setComments ] = useState([]);
  const [ likes, setLikes ] = useState([]);
  const [ likesLoading, setLikesLoading ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ commentModalShow, setCommentModalShow ] = useState(false);
  const [ filterDate, setFilterDate ] = useState(new Date());
  const [error, setError] = useState(false);

  // Function to get post from api
  const getPosts = (d) => {
      const date = moment(d).format('YYYY-MM-DD');
      setLoading(true);
      setPosts([]);
      setLikes([]);
      setComments([]);
      setError(false);
      apiCall('/posts?day='+ date)
          .then(function (response) {
              setLoading(false);
              if(response.data && response.data.posts){
                  setPosts(response.data.posts);
              }
          })
          .catch(function (error) {
              setLoading(false);
              setError(true);
      });
  };

  // Initial api call to get post
  useEffect(() => {
      getPosts(filterDate);
  }, []);

  // Function to handle post like dislike
  const likePost = (postId) => {
      setLikes([]);
      setLikesLoading(true);
      setError(false);
      const index = posts.findIndex((d) => d.id === postId);
      if(index === -1) {
        return;
      }
      let voteCount = posts[index].votes_count;
        if(!posts[index].current_user.voted_for_post) {
            voteCount = voteCount + 1;
        } else {
            voteCount = voteCount -1;
        }

      const post = [
          ...posts.slice(0, index),
          {
              ...posts[index],
              votes_count: voteCount,
              current_user: {
                  ...posts[index].current_user,
                  voted_for_post: !posts[index].current_user.voted_for_post
              }
           },
          ...posts.slice(index + 1)
      ];
      // set update object in post array
      setPosts(post);
      // Api call to get voter of post
      apiCall(`/posts/${postId}/votes`)
          .then(function (response) {
              setLikesLoading(false);
              if(response?.data?.votes) {
                  setLikes(response.data.votes);
              }
          })
          .catch(function (error) {
              setLikesLoading(false);
              setError(true);
      });
  };

  // Function get post comments
  const getPostComments = (postId) => {
      setComments([]);
      setLoading(true);
      setCommentModalShow(true);
      setError(false);
      apiCall('/comments?search[post_id]='+postId)
          .then(function (response) {
              setLoading(false);
              if(response?.data?.comments) {
                  setComments(response.data.comments);
              }
          })
          .catch(function (error) {
              setLoading(false);
              setError(true);
      });
  };

  // Function to filter post by date
  const onFilter = (date) => {
      setFilterDate(date);
      getPosts(date);
  };

  // Function to clear filter
  const clearFilter = () => {
      setFilterDate(new Date);
      getPosts(new Date);
  };

  return (
    <div className="">
        <header className="py-2 px-3">
            <span style={{ fontSize: 25 }} className="text-white font-weight-bold">Header</span>
        </header>
        {
          error &&
          <Alert variant="danger" className="text-center">
            Something went wrong. Try again later.
            like.
          </Alert>
        }
        <div className="container-fluid">
            <div className="row content">
                <div className="col-md-4 col-lg-3 sidenav border pt-2">
                    <h4>Filter</h4>
                    <div className="input-group">
                        <DatePicker
                            selected={filterDate}
                            // dateFormat="dd-MM-yyyy"
                            onChange={(date) => onFilter(date)}
                        />
                    </div>
                    <div className="input-group py-2 ">
                        <button className="btn btn-primary border" type="button" onClick={() => clearFilter()}>
                            Clear Filter
                        </button>
                    </div>
                    <hr />
                    { likes && likes.length ? <div className="py-2">People Like the post</div> : ''}
                    <div className="py-2 " style={{ overflowY: "auto", maxHeight: 350 }}>
                        {
                            likesLoading && !likes.length ? <Loader /> :
                            likes && likes.length ? likes.map(like => <InfoCard key={like.id} data={like} />): ''
                        }
                    </div>
                </div>
                <div className="col-md-8 col-lg-9 pt-2">
                    <div className="row m-0">
                        {
                            loading && !posts.length ? <Loader /> :
                            posts && posts.length ? posts.map((post) =>
                                <PostCard key={post.id} post={post} likePostEvent={likePost} getPostCommentsEvent={getPostComments}  />
                            ) : <div className="w-100 text-center"><h4>No Post Found</h4></div>
                        }
                    </div>
                </div>
            </div>
        </div>
        <CommentModal loading={loading} comments={comments} show={commentModalShow} hide={setCommentModalShow} />
    </div>
  );
}

export default App;
