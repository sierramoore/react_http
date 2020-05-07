import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from "react-router";

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    postDataHandler = () => {
        // axios auto extracts data and stringifys
        const post = { // send these bis of data to server
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post('/posts', post)
            .then(response => {
                console.log(response)
                this.setState({submitted: true})

                // other method w/o Redirect
                // this.props.history.push('/posts')
                // using push when u click back button it will go back to prev page (not w replace or Redirect ways it would go back to prev prev)
                // could use .replace instead of push and would work the same as Redirect
            })
    }

    render () {
        let redirect = null;
        if(this.state.submitted){
            redirect = <Redirect to="/posts" />
            //Redirect replaces whole page
        }
        // render component to leave the page in return
        return (
            <div className="NewPost">

                {redirect}

                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;
