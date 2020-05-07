import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from './Posts/Posts';
import './Blog.css';
import asyncComponent from "../../hoc/asyncComponent";
// import NewPost from "./NewPost/NewPost";
// all imports here go to bundler as global dependecies but not if used asyncComponent

const AsyncNewPost = asyncComponent(() =>{
    // this import is only run when this function is executed
    return import('./NewPost/NewPost');
    // webpack will create an extra bundle w NewPost component and all components that were exclusive to that (called Chunk.js in network panel)
})




class Blog extends Component {
    state = {
        auth: true
    }

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/"
                                exact
                            >Posts</NavLink></li>

                            <li><NavLink
                                to={{
                                pathname: '/new-post'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    {/*{now user cant access page unless auth} ex of guard || in NewPost in componentDidMount func could check if unauth => this.props.history.replace('/posts')*/ }

                    {/*<Route render={() => <h1>404 page not found</h1>}/>*/}
                    {/*{catch all route for any non "/" route cant use with '/' route}. will catch any unknown route not handled prior to it*/}

                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts/" />
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


// can use Route anywhere in app as long as component is wrapped in <BrowserRouter> (wrapped app in it so its avaliable basically everywhere)
