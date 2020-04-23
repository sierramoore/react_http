import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
    }

    componentDidMount() {
        //returns a promise (once data is fetched)
        // recieves response obj
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response =>{
                const posts = response.data.slice(0, 4); // limit data
                const updatedPosts = posts.map(post => { // add new property to data
                    return {
                        ...post, //keep all prev data
                        author: 'Sierra' //add new data
                    }
                })
                this.setState({posts: updatedPosts})
                console.log(response);
        });
    }

    postSelectedHandler = (id) =>{ //getting id from <Post clicked function
        this.setState({selectedPostId: id}) //set id to state
    }

    render () {
        // get state data that was just updated and loop over each to create new post element
        const posts = this.state.posts.map(post => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}/>
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    {/*pass id to listen to getting a new id then fetch data for that id*/}
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
