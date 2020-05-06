import React, { Component } from 'react';
import axiosInstance from "../../../axios";
// import {Link} from 'react-router-dom';

import Post from '../../../components/Post/Post'
import './Posts.css'
import FullPost from "../FullPost/FullPost";
import {Route} from "react-router-dom";

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {


        //returns a promise (once data is fetched)
        // recieves response obj
        axiosInstance.get('/posts')
            .then(response =>{
                const posts = response.data.slice(0, 4); // limit data
                const updatedPosts = posts.map(post => { // add new property to data
                    return {
                        ...post, //keep all prev data
                        author: 'Sierra' //add new data
                    }
                })
                this.setState({posts: updatedPosts})
            })
            .catch(error => {
                console.log(error)
                // this.setState({error: true})
            });
    }

    postSelectedHandler = (id) =>{ //getting id from <Post clicked function
        // this.setState({selectedPostId: id}) //set id to state
        this.props.history.push({pathname: '/posts/' + id}) // navigate programatically with previous url
    }

    render() {
        let posts = <p style={{color: "red"}}>Something went wrong</p>;
        if(!this.state.error) {
            // get state data that was just updated and loop over each to create new post element
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} key={post.id}>
                    <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}/>
                    // </Link>
                    )
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        )
    }
}

export default Posts;
