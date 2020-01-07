import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CommentModal from "./component/CommentModal";
import InfoCard from "./component/InfoCard";
import PostCard from "./component/PostCard";
import axios from 'axios';

function App() {
  const [ posts, setPosts ] = useState([]);
  useEffect(() => {
      axios.get('https://api.producthunt.com/v1/posts', {
          headers:{
              Authorization: 'Bearer Xbdpx_jQy6cWVQE-rfPPso8-F_PZZrgItIDRGKumkIw',
          }
      })
      .then(function (response) {
          // handle success
          if(response.data && response.data.posts){
              setPosts(response.data.posts);
          }
          console.log(response);
      })
      .catch(function (error) {
          // handle error
          console.log(error);
      });
  }, []);
  const [ commentModalShow, setCommentModalShow ] = useState(false);
  const [ filterDate, setFilterDate ] = useState(new Date());
  const productClick = (e) => {
      console.log('e', e.target);
      if(e.target.id === 'like-btn') {
          console.log('like logic');
      } else {
          setCommentModalShow(true);
      }

  };
  const onProductFilter = (date) => {
      setFilterDate(date);
  };
  console.log('posts', posts);
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
                            Filter
                        </button>
                        <button className="btn btn-primary border" type="button">
                            Clear Filter
                        </button>
                    </div>
                    <hr />
                    <div className="py-2 " style={{ overflowY: "auto", maxHeight: 350 }}>
                        <InfoCard />
                    </div>
                </div>
                <div className="col-md-8 col-lg-9 pt-2">
                    <div className="row m-0" onClick={(e) => productClick(e)}>
                        {
                            posts && posts.length ? posts.map((post) =>
                                <PostCard key={post.id} id={post.id} name={post.name} imageUrl={post.thumbnail.image_url}  />
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        </div>
        <CommentModal show={commentModalShow} hide={setCommentModalShow} />
    </div>
  );
}

export default App;
