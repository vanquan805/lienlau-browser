/*global chrome*/
import React, {Component} from "react";
import Button from "@material/react-button";
import MaterialIcon from "@material/react-material-icon";
import {Overline} from "@material/react-typography";
import TextField, {HelperText, Input} from "@material/react-text-field";
import {createPost} from "../../../../libs/API";

class AddPost extends Component {
    state = {title: "Wordpress", content: "Hello, my name is Quan and I'm a wordpress developer...", attachments:"D:/facebook-logo.png\nD:/facebook-logo2.png\nD:/facebook-logo3.png"};

    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
    }

    updateData(name, value) {
        this.setState({[name]: value});
    }

    componentWillReceiveProps(newProps) {
        this.setState({licenseKey: newProps.licenseKey});
    }

    async addPost() {
        let result = await createPost(this.state.licenseKey, this.state.title, this.state.content, this.state.attachments);
        this.props.updateAlert(result);

        if (result.post_id) {
            this.props.addPost({
                ID: result.post_id,
                title: this.state.title,
                content: this.state.content,
                attachments: this.state.attachments,
                updated_date: Date.now()
            })
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
                <Overline>Add new post</Overline>
                <div className="add-proposal-form">
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
                                helperText={<HelperText>.jpg, .png, .jpeg,...</HelperText>}
                                textarea={true}
                            ><Input
                                value={this.state.attachments}
                                onChange={(e) => this.updateData("attachments", e.currentTarget.value)}/>
                            </TextField>
                        </div>
                    </div>

                    <Button raised={true} onClick={this.addPost}>Add Post</Button>
                </div>
            </div>
        );
    }
}

export default AddPost;