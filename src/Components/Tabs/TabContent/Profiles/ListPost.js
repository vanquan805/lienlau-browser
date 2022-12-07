import React, {Component} from "react";
import {Overline} from "@material/react-typography";
import List, {ListItem, ListItemText} from "@material/react-list";
import Button from "@material/react-button";

class ListPost extends Component {
    constructor(props) {
        super(props);
    }

    async componentWillReceiveProps(newProps) {
        this.setState({posts: newProps.posts});
    }

    render() {
        return (
            <div>
                {
                    (this.state && this.state.posts && Array.isArray(this.state.posts) && this.state.posts.length > 0) ? (
                        <div>
                            <Overline>List</Overline>
                            <List>
                                {this.state.posts.map((post, i) => {
                                    // Return the element. Also pass key
                                    return (
                                        <ListItem
                                            onClick={() => this.props.setActiveContent('edit-post-form', i)}>
                                            <ListItemText
                                                primaryText={post.title}
                                                secondaryText={(new Date(post.updated_date)).toLocaleString()}/>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                    ) : ``
                }

                <Button onClick={() => this.props.setActiveContent('add-post-form')}>Add new post</Button>
            </div>
        );
    }
}

export default ListPost;