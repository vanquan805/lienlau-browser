import React from "react";
import "./App.css";
import TopAppBar, {
    TopAppBarFixedAdjust,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle
} from "@material/react-top-app-bar";
import TabBar from "@material/react-tab-bar";
import Tab from "@material/react-tab";
import {Grid} from "@material/react-layout-grid";
import TabContent from "./Components/Tabs/TabContent";
import Footer from "./Components/Footer/Footer";

class App extends React.Component {
    state = {activeTabIndex: 0, currentVersion: '1.0.0', isEnableCache: true};

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.handleActiveTabIndexUpdate = this.handleActiveTabIndexUpdate.bind(this);
    }

    handleActiveTabIndexUpdate = (activeTabIndex) => {
        console.log('activeTabIndex', activeTabIndex);
        this.setState({activeTabIndex});
    };



    onClick() {
        window.electronAPI.runCMD(this.state.cmd);
    }

    render() {
        return (
            <div className="wrap">
                <TopAppBar>
                    <TopAppBarRow>
                        <TopAppBarSection align='start'>
                            {/*<img src={logo} className="logo" alt="Facebook Extension" width="50px"/>*/}
                            <TopAppBarTitle className="extension-title">LienLau Browser</TopAppBarTitle>
                        </TopAppBarSection>
                    </TopAppBarRow>
                    <TopAppBarRow>

                        <TabBar
                            activeIndex={this.state.activeTabIndex}
                            handleActiveIndexUpdate={this.handleActiveTabIndexUpdate}
                        >
                            <Tab>
                                <span className='mdc-tab__text-label'>General</span>
                            </Tab>

                            <Tab>
                                <span className='mdc-tab__text-label'>Settings</span>
                            </Tab>
                        </TabBar>

                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust>
                    <TabContent
                                activeTabIndex={this.state.activeTabIndex}/>
                </TopAppBarFixedAdjust>
                <Footer/>
            </div>
        )
    }
}

export default App;