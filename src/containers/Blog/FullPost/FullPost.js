import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }


// if u call setState w/in componentDidUpdate it creates an infinite loop bc setState the component will be updated and componentDidUpdate will be called again so make a check to ensure only if it was a new post
    componentDidMount() {
        console.log(this.props);
        if(this.props.match.params.id) { // first have  the id and then a litle bit later have loadedPost. so  you cant reRender dom immediately after u get id wo first getting loadedPost

            // if its no post has been loaded yet or if its a different post than the previous
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        this.setState({loadedPost: response.data})
                    })
            }

        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response)
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if(this.props.id) {//initally id is set to null/false. and if item was selected, id is set
            post = <p style={{textAlign: 'center'}}>Loading..</p>;
        }
            if(this.state.loadedPost) { //if post data from associated id is returned
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;
