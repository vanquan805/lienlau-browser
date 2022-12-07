/*global chrome*/

import React from "react";
import Button from "@material/react-button";
import {Overline} from "@material/react-typography";
import TextField, {HelperText, Input} from "@material/react-text-field";
import List, {ListItem, ListItemMeta, ListItemText} from "@material/react-list";
import Checkbox from "@material/react-checkbox";

class GeneralTab extends React.Component {
    state = {isEnableCache: true, selectedIndex: [1]};

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
                <Overline>General</Overline>
                <List
                    checkboxList
                    selectedIndex={this.state.selectedIndex}
                    handleSelect={(activatedIndex, allSelected) => this.setState({selectedIndex: allSelected})}
                >
                    <ListItem>
                        <Checkbox/>
                        <ListItemText primaryText='Profile 1' secondaryText={(new Date()).toLocaleString()}/>
                        <ListItemMeta meta='Running'/>
                    </ListItem>
                    <ListItem>
                        <Checkbox checked/>
                        <ListItemText primaryText='Profile 2' secondaryText={(new Date()).toLocaleString()}/>
                        <ListItemMeta meta='Stopped'/>
                    </ListItem>
                    <ListItem>
                        <Checkbox/>
                        <ListItemText primaryText='Profile 3' secondaryText={(new Date()).toLocaleString()}/>
                        <ListItemMeta meta='Stopped'/>
                    </ListItem>
                </List>

                <div className="justify-content-space-between">
                    <Button raised={true}>Create new profile</Button>
                    <Button raised={true}>Start</Button>
                    <Button raised={true}>Stop</Button>
                </div>
            </div>

        );
    }
}

export default GeneralTab;