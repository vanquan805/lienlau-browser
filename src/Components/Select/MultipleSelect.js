import {Component} from "react";

class MultipleSelect extends Component {
    state = {
        values: [], options: [], onChange: () => {
        }, helperText: null, label: null
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    async componentWillReceiveProps(newProps) {
        let options = newProps.options && Array.isArray(newProps.options) ? newProps.options : this.state.options;
        let values = newProps.values && Array.isArray(newProps.values) ? newProps.values : this.state.values;
        let onChange = newProps.onChange && typeof newProps.onChange === 'function' ? newProps.onChange : this.state.onChange;
        let helperText = newProps.helperText && typeof newProps.helperText === 'string' ? newProps.helperText : this.state.helperText;
        let label = newProps.label && typeof newProps.label === 'string' ? newProps.label : this.state.label;

        values = values.map(item=>item.toString());

        this.setState({options, values, onChange, helperText, label});
    }

    onChange(e) {
        let values = [];
        for (let option of e.target.options) {
            if (option.selected)
                values.push(option.value);
        }

        this.state.values = values;

        this.state.onChange(this.state.values);
    }

    render() {
        return (
            <div>
                <div className="mdc-select multiple mdc-select--outlined">
                    <select className="mdc-select__native-control"
                            label={this.state.label}
                            onChange={this.onChange}
                            multiple
                    >
                        {
                            this.state.options ? this.state.options.map(option => {
                                return (<option
                                    value={option.value}
                                    selected={this.state.values.indexOf(option.value.toString()) !== -1}>{option.name}</option>)
                            }) : ""
                        }
                    </select>
                    <div className="mdc-notched-outline mdc-notched-outline--upgraded mdc-notched-outline--notched">
                        <div className="mdc-notched-outline__leading"></div>
                        <div className="mdc-notched-outline__notch">
                            <label
                                className="mdc-floating-label mdc-floating-label--float-above">{this.state.label}</label>
                        </div>
                        <div className="mdc-notched-outline__trailing"></div>
                    </div>
                </div>
                {
                    this.state.helperText ? (
                        <p className="mdc-select-helper-text">{this.state.helperText}</p>) : ""
                }

            </div>
        );
    }
}

export default MultipleSelect;