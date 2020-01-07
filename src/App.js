import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CommentModal from "./component/CommentModal";
import InfoCard from "./component/InfoCard";
import PostCard from "./component/PostCard";

function App() {
  const [ commentModalShow, setCommentModalShow ] = useState(false);
  const [ filterDate, setFilterDate ] = useState(new Date());
  const productClick = (e) => {
      if(e.target.id === 'like-btn') {
          console.log('like logic');
      } else {
          setCommentModalShow(true);
      }

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
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                    </div>
                </div>
            </div>
        </div>
        <CommentModal show={commentModalShow} hide={setCommentModalShow} />
    </div>
  );
}

export default App;
