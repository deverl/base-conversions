import React from "react";
import { connect } from "react-redux";
import { Header, Form, Table } from "semantic-ui-react";

// import './ToDecimal.css';
import { decimalToRadix, radixToDecimal, hasNotes, digitToDecimal } from "../utils";
import { digits } from "../constants";
import { isValidRadix } from "../utils";
import { setRadix, setRadixNumber, setDecimalNumber } from "../actions";

class ToDecimal extends React.Component {
    state = { invalidInput: false };

    decimalNumber = "";

    componentDidMount() {}

    componentWillUnmount() {
        this.props.setDecimalNumber(this.decimalNumber);
    }

    onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    onChange = e => {
        if (e.target.name === "radix") {
            this.props.setRadix(e.target.value);
            this.inputContainsValidDigits(this.props.radixNumber, e.target.value);
        } else if (e.target.name === "radixNumber") {
            this.props.setRadixNumber(e.target.value);
            this.inputContainsValidDigits(e.target.value, this.props.radix);
        } else {
            throw new Error("Unrecognized input name!");
        }
    };

    inputContainsValidDigits = (inputValue, radix) => {
        // console.log(`inputContainsValidDigits: value = ${inputValue}, radix = ${radix}`);
        const validDigits = digits.slice(0, radix);
        // console.log("validDigits = " + JSON.stringify(validDigits));
        let valid = true;
        for (let i = 0; i < inputValue.length; ++i) {
            const c = inputValue[i].toUpperCase();
            const idx = validDigits.indexOf(c);
            if (idx === -1) {
                valid = false;
            }
        }
        if (valid) {
            this.setState({ invalidInput: false });
        } else {
            this.setState({ invalidInput: true });
        }
    };

    renderAnswer = () => {
        const { radixNumber, radix } = this.props;
        if (radixNumber) {
            const answer = radixToDecimal(radixNumber, radix);
            this.decimalNumber = answer;
            return (
                <React.Fragment>
                    <div className="answer">{answer}</div>
                    <Header as="h2">{`${radixNumber} in base ${radix} is ${answer} in decimal`}</Header>
                </React.Fragment>
            );
        } else {
            return null;
        }
    };

    getSteps = (radixNumber, radix) => {
        if (radix < 2 || radix > 36) {
            return [];
        }
        const steps = [{ operation: "Initialize sum to zero", sum: 0 }];
        let result = 0;
        let s = "" + radixNumber;
        let i = s.length - 1;
        let p = 0;
        while (i >= 0) {
            const step = {};
            const c = s[i];
            const v = digitToDecimal(c.toUpperCase());
            const prevResult = result;
            result += v * radix ** p;
            step.operation = `sum = ${prevResult} + (${v} * ${radix} ** ${p})`;
            step.sum = result;
            if (v > 10) {
                let d = decimalToRadix(v, radix);
                step.notes = `${d} in base ${radix} = ${v} in decimal`;
            }
            steps.push(step);
            i -= 1;
            p += 1;
        }
        return steps;
    };

    renderStepsBody = (steps, notes) => {
        if (steps && steps.length > 1) {
            return steps.map((step, index) => {
                return (
                    <Table.Row key={index}>
                        <Table.Cell>{step.operation}</Table.Cell>
                        <Table.Cell>{step.sum}</Table.Cell>
                        {notes ? <Table.Cell>{step.notes}</Table.Cell> : null}
                    </Table.Row>
                );
            });
        }
        return null;
    };

    renderSteps = () => {
        const { radixNumber, radix } = this.props;
        const steps = this.getSteps(radixNumber, radix);
        const notes = hasNotes(steps);
        if (steps && steps.length > 1) {
            return (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Operation</Table.HeaderCell>
                            <Table.HeaderCell>Sum</Table.HeaderCell>
                            {notes ? <Table.HeaderCell>Notes</Table.HeaderCell> : null}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderStepsBody(steps, notes)}</Table.Body>
                </Table>
            );
        }
        return null;
    };

    renderErrors = () => {
        const { invalidInput } = this.state;
        const { radix } = this.props;
        const invalidRadix = !isValidRadix(radix);

        if (!invalidRadix && !invalidInput) {
            return null;
        }

        if (invalidRadix) {
            return (
                <Header as="h3" style={{ color: "tomato" }}>
                    Radix must be in the range of [2..36]
                </Header>
            );
        }

        if (invalidInput) {
            return (
                <Header as="h3" style={{ color: "tomato" }}>
                    Input contains invalid base {radix} digits.
                </Header>
            );
        }
    };

    render() {
        const { invalidInput } = this.state;
        const { radix, radixNumber } = this.props;
        const invalidRadix = !isValidRadix(radix);
        const errors = invalidRadix || invalidInput;

        return (
            <React.Fragment>
                <Header as="h1">Convert to decimal number from a different radix</Header>
                {this.renderErrors()}
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Field>
                            <label>Radix</label>
                            <Form.Input
                                error={invalidRadix}
                                type="number"
                                min="2"
                                max="36"
                                name="radix"
                                value={radix}
                                onChange={this.onChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Number (in base {radix}) to convert</label>
                            <Form.Input
                                name="radixNumber"
                                error={invalidInput}
                                value={radixNumber}
                                onChange={this.onChange}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
                {!errors ? this.renderAnswer() : null}
                {!errors ? this.renderSteps() : null}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        radix: state.radix,
        radixNumber: state.radixNumber,
    };
};

export default connect(mapStateToProps, { setRadix, setRadixNumber, setDecimalNumber })(
    ToDecimal
);
