import React from "react";
import TextField, {HelperText, Input} from '@material/react-text-field';
import Button from '@material/react-button';
import {Overline} from "@material/react-typography";
import Switch from "@material/react-switch";

class SettingsTab extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.state && this.state.alert && this.state.alert.status && this.state.alert.message ? (
                        <div className={"alert alert-" + this.state.alert.status}>{this.state.alert.message}</div>
                    ) : ''
                }
                <Overline>Settings</Overline>
                <div className="form-group">
                    <TextField
                        label='License Key'
                    ><Input
                    />
                    </TextField>
                </div>

                <Button raised={true} >Update</Button>
            </div>
        );
    }
}

export default SettingsTab;