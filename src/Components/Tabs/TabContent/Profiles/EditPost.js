import React, {Component} from "react";
import Button from "@material/react-button";
import MaterialIcon from "@material/react-material-icon";
import {Overline} from "@material/react-typography";
import TextField, {HelperText, Input} from "@material/react-text-field";
import {deletePost, updatePost} from "../../../../libs/API";

class EditPost extends Component {
    state = {ID: null, title: "", content: "", attachments: "", updated_date: Date.now()};

    constructor(props) {
        super(props);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentWillReceiveProps(newProps) {

        let post = {
            ID: newProps.post && newProps.post.ID ? newProps.post.ID : null,
            title: newProps.post && newProps.post.title ? newProps.post.title : "",
            content: newProps.post && newProps.post.content ? newProps.post.content : "",
            attachments: newProps.post && newProps.post.attachments ? newProps.post.attachments : ""
        }

        this.setState({
            licenseKey: newProps.licenseKey,
            ID: post.ID,
            title: post.title,
            content: post.content,
            attachments: post.attachments
        });
    }

    updateData(name, value) {
        this.setState({[name]: value});
    }

    async updatePost() {
        let result = await updatePost(this.state.licenseKey, this.state.ID, this.state.title, this.state.content, this.state.attachments);

        this.props.updateAlert(result);

        if (result.status === 'success') {
            this.props.updatePost(this.state);
        }

        this.props.setActiveContent('list');
    }

    async deletePost() {
        let result = await deletePost(this.state.licenseKey, this.state.ID);

        this.props.updateAlert(result);

        if (result.status === 'success') {
            this.props.deletePost(this.state);
        }

        this.props.setActiveContent('list');
    }

    render() {
        return (
            <div>
                <div>
                    <Button
                        icon={<MaterialIcon icon='west'/>}
                        onClick={() => this.props.setActiveContent('list')}
                    >Back</Button>
                </div>
                <Overline>Edit post</Overline>
                <div className="edit-post-form">
                    <div className="form-group">
                        <TextField
                            label='Title'
                        ><Input
                            value={this.state.title}
                            onChange={(e) => this.updateData("title", e.currentTarget.value)}/>
                        </TextField>
                    </div>

                    <div className="form-group">
                        <TextField
                            label='Content'
                            textarea={true}
                        ><Input
                            value={this.state.content}
                            onChange={(e) => this.updateData("content", e.currentTarget.value)}/>
                        </TextField>
                    </div>

                    <div className="form-group">
                        <div className="form-group">
                            <TextField
                                label='Attachments'
                                textarea={true}
                                helperText={<HelperText>.jpg, .png, .jpeg,...</HelperText>}
                            ><Input
                                value={this.state.attachments}
                                onChange={(e) => this.updateData("attachments", e.currentTarget.value)}/>
                            </TextField>
                        </div>
                    </div>

                    <Button raised={true} onClick={this.updatePost}>Update</Button>
                    <Button className="button-float-right" outlined={true} onClick={this.deletePost}>Delete</Button>
                </div>
            </div>
        );
    }
}

export default EditPost;