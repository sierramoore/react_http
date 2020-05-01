import React, { Component } from 'react';
// import axios from 'axios';
// import axiosInstance from '../../axios'
import { Route, NavLink, Switch } from 'react-router-dom';

import Posts from './Posts/Posts';
import './Blog.css';
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";


class Blog extends Component {

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/"
                                exact
                            >Home</NavLink></li>

                            <li><NavLink
                                to={{
                                pathname: '/new-post'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                <Route path="/" exact component={Posts} />

                <Switch>
                    <Route path="/new-post"  component={NewPost} />
                    <Route path="/:id" exact component={FullPost} />
                </Switch>


            </div>
        );
    }
}

export default Blog;

// Switch tells Routes to load the FIRST route that matches from a list of Routes (so it will stop analyzing other routes for matches) ~helpful when want to ensure only one route gets loaded


// Link component from router-dom allows page to not be refreshed

// pathname: this.props.match.url + /whatever/ or <Link to={props.match.url + '/new'}> creates a relative path. will append ending to whatever current url they are on

//NavLink is basically the same and has .active style built in for active link styling
