import React from "react";
import AddPost from "./AddPost";
import ListPost from "./ListPost";
import EditPost from "./EditPost";

class ProfilesTab extends React.Component {
    state = {
        activeContent: "list",
        postIndexSelected: 0
    };

    constructor(props) {
        super(props);
        this.updateAlert = this.updateAlert.bind(this);
        this.setActiveContent = this.setActiveContent.bind(this);

        this.addPost = this.addPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    async componentWillReceiveProps(newProps) {
        if (newProps.licenseKey) {
            let posts = await getPosts(newProps.licenseKey);
            await Chrome.setLocalData('fe_posts', posts);
            this.setState({posts, licenseKey: newProps.licenseKey});
        }
    }

    setActiveContent = (value, postIndex = null) => {
        this.setState({activeContent: value});

        if (postIndex !== null) {
            this.setState({postIndexSelected: postIndex});
        }
    }

    updateAlert(alert) {
        if ((alert == null) || (alert.status && ['success', 'error', 'warning'].indexOf(alert.status) !== -1)) {
            this.setState({alert});
        }
    }

    async addPost(post) {

        let posts = this.state.posts;
        posts.push(post);

        await Chrome.setLocalData('fe_posts', posts);
        this.setState({posts});
    }

    async updatePost(post) {
        let posts = this.state.posts;
        let index = posts.findIndex(item => item.ID === post.ID);
        if (index !== -1) {
            posts[index] = post;
            await Chrome.setLocalData('fe_posts', posts);
            this.setState({posts: posts});
        }
    }

    async deletePost(post) {
        let posts = this.state.posts;
        let index = posts.findIndex(item => item.ID === post.ID);
        if (index !== -1) {
            posts.splice(index, 1);
            await Chrome.setLocalData('fe_posts', posts);
            this.setState({posts: posts});
        }
    }

    render() {
        return (
            <div>
                <div className={this.state.activeContent === "list" ? '' : 'hidden'}>
                    {
                        this.state && this.state.alert && this.state.alert.status && this.state.alert.message ? (
                            <div className={"alert alert-" + this.state.alert.status}>{this.state.alert.message}</div>
                        ) : ''
                    }
                    <ListPost setActiveContent={this.setActiveContent} posts={this.state.posts}/>
                </div>
                <div className={this.state.activeContent === 'add-post-form' ? '' : 'hidden'}>
                    <AddPost addPost={this.addPost} updateAlert={this.updateAlert}
                             licenseKey={this.state.licenseKey} setActiveContent={this.setActiveContent}/>
                </div>
                <div className={this.state.activeContent === 'edit-post-form' ? '' : 'hidden'}>
                    <EditPost
                        licenseKey={this.state.licenseKey}
                        updateAlert={this.updateAlert}
                        setActiveContent={this.setActiveContent}
                        updatePost={this.updatePost}
                        deletePost={this.deletePost}
                        post={this.state.posts && this.state.posts.length > 0 && typeof this.state.posts[this.state.postIndexSelected] !== "undefined" ? this.state.posts[this.state.postIndexSelected] : null}/>
                </div>
            </div>
        );
    }
}

export default PostsTab;