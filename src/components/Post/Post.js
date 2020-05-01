import React from 'react';
import { withRouter } from "react-router-dom";
import './Post.css';

const post = (props) => {
    return (
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    )

};

export default withRouter(post);

// routing related props are no passed down the component tree however can pass them with {...props} OR wrap component with withRouter
