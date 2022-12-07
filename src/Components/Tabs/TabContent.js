import React from "react";
import {Grid} from "@material/react-layout-grid";
import GeneralTab from "./TabContent/GeneralTab";
import SettingsTab from "./TabContent/SettingsTab";

class TabContent extends React.Component {
    state = {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tab-content">
                <Grid className={"tab-item " + (this.props.activeTabIndex === 0 ? "active" : "")}>
                    <GeneralTab/>
                </Grid>

                <Grid className={"tab-item " + (this.props.activeTabIndex === 1 ? "active" : "")}>
                    <SettingsTab/>
                </Grid>
            </div>
        )
    }
}

export default TabContent;