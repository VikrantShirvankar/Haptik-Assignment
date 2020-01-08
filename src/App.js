import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CommentModal from "./component/CommentModal";
import InfoCard from "./component/InfoCard";
import PostCard from "./component/PostCard";
import Loader from './component/Loader';
import apiCall from "./appService";

function App() {
  const [ posts, setPosts ] = useState([]);
  const [ comments, setComments ] = useState([]);
  const [ commentsLoading, setCommentsLoading ] = useState(false);
  const [ likesLoading, setLikesLoading ] = useState(false);

  const [ likes, setLikes ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
      apiCall('/posts')
      .then(function (response) {
          setLoading(false);
          if(response.data && response.data.posts){
              setPosts(response.data.posts);
          }
      })
      .catch(function (error) {
          setLoading(false);
      });
  }, []);

  const [ commentModalShow, setCommentModalShow ] = useState(false);
  const [ filterDate, setFilterDate ] = useState(new Date());
  const postLike = (postId) => {
      setLikes([]);
      setLikesLoading(true);
      const index = posts.findIndex((d) => d.id === postId);
      let voteCount = posts[index].votes_count;
        if(!posts[index].current_user.voted_for_post) {
            voteCount = voteCount + 1;
        } else {
            voteCount = voteCount -1;
        }

      const p = [
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
      setPosts(p);

      apiCall(`/posts/${postId}/votes`)
          .then(function (response) {
              setLikesLoading(false);
              if(response?.data?.votes) {
                  setLikes(response.data.votes);
              }
          })
          .catch(function (error) {
              setLikesLoading(false);
          });
  };
  const postComment = (postId) => {
      setComments([]);
      setCommentsLoading(true);
      setCommentModalShow(true);
      apiCall('/comments?search[post_id]='+postId)
          .then(function (response) {
              setCommentsLoading(false);
              if(response?.data?.comments) {
                  setComments(response.data.comments);
              }
          })
          .catch(function (error) {
              setCommentsLoading(false);
      });
  };
  const onProductFilter = (date) => {
      setFilterDate(date);
  };

  return (
    <div className="">
        <header className="py-2 px-3">
            <span style={{ fontSize: 25 }} className="text-white font-weight-bold">Header</span>
        </header>
        <div className="container-fluid">
            <div className="row content">
                <div className="col-md-4 col-lg-3 sidenav border pt-2">
                    <h4>Filter</h4>
                    <div className="input-group">
                        <DatePicker
                            selected={filterDate}
                            onChange={(date) => onProductFilter(date)}
                        />
                    </div>
                    <div className="input-group py-2 ">
                        <button className="btn btn-primary border" type="button">
                            Clear Filter
                        </button>
                    </div>
                    <hr />
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
                                <PostCard key={post.id} post={post} postLikeEvent={postLike} postCommentEvent={postComment}  />
                            ) : <div className="w-100 text-center"><h4>No Post Found</h4></div>
                        }
                    </div>
                </div>
            </div>
        </div>
        <CommentModal loading={commentsLoading} comments={comments} show={commentModalShow} hide={setCommentModalShow} />
    </div>
  );
}

export default App;
