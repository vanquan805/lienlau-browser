import React from "react";
import {Grid, Row, Cell} from "@material/react-layout-grid";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer">
                <Grid>
                    <Row>
                        <Cell phoneColumns={2}>© 2022 Developed by <a target="_blank" href="https://lienlau.com">lienlau.com</a></Cell>
                        <Cell phoneColumns={1}><a target="_blank" href="https://t.me/quannv27">Support</a></Cell>
                        <Cell phoneColumns={1}><a target="_blank" href="mailto:vanquan805@gmail.com">Contact</a></Cell>
                    </Row>
                </Grid>
            </footer>
        )
    }
}

export default Footer;