import React from "react";
import { connect } from "react-redux";
import { Form, Header, Table } from "semantic-ui-react";

// import "./FromDecimal.css";
import { digits } from "../constants";
import { decimalToRadix, hasNotes, isValidRadix } from "../utils";
import { setRadix, setDecimalNumber, setRadixNumber } from "../actions";

class FromDecimal extends React.Component {
    radixNumber = "";

    componentDidMount() {}

    componentWillUnmount() {
        this.props.setRadixNumber(this.radixNumber);
    }

    onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    onChange = e => {
        if (e.target.name === "radix") {
            this.props.setRadix(e.target.value);
        } else if (e.target.name === "decimalNumber") {
            this.props.setDecimalNumber(e.target.value);
        } else {
            throw new Error("Unrecognized input name!");
        }
    };

    getSteps = (decimalNumber, radix) => {
        const n = parseInt(decimalNumber, 10);
        const r = parseInt(radix, 10);
        if (Number.isNaN(n) || Number.isNaN(r) || r < 2 || r > 36 || n <= 0) {
            return [];
        }
        const steps = [];
        let num = n;
        while (num > 0) {
            const m = num % r;
            const q = Math.floor(num / r);
            const c = digits[m];
            const step = {
                operation: `${num} / ${r}`,
                quotient: String(q),
                remainder: c,
                notes: m > 9 ? `${c} is ${m} in decimal` : "",
            };
            steps.push(step);
            num = q;
        }
        return steps;
    };

    renderAnswer = () => {
        const { decimalNumber, radix } = this.props;
        if (decimalNumber) {
            const answer = decimalToRadix(decimalNumber, radix);
            this.radixNumber = answer;
            return (
                <React.Fragment>
                    <div className="answer">{answer}</div>
                    <Header as="h2">{`${decimalNumber} decimal is ${answer} in base ${radix}`}</Header>
                </React.Fragment>
            );
        } else {
            return null;
        }
    };

    renderStepsBody = (steps, notes) => {
        if (steps && steps.length) {
            return steps.map((step, index) => {
                return (
                    <Table.Row key={index}>
                        <Table.Cell>{step.operation}</Table.Cell>
                        <Table.Cell>{step.quotient}</Table.Cell>
                        <Table.Cell>{step.remainder}</Table.Cell>
                        {notes ? <Table.Cell>{step.notes}</Table.Cell> : null}
                    </Table.Row>
                );
            });
        }
        return null;
    };

    renderSteps = () => {
        const { decimalNumber, radix } = this.props;
        const steps = this.getSteps(decimalNumber, radix);
        const notes = hasNotes(steps);
        if (steps && steps.length) {
            return (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Operation</Table.HeaderCell>
                            <Table.HeaderCell>Quotient</Table.HeaderCell>
                            <Table.HeaderCell>Remainder</Table.HeaderCell>
                            {notes ? <Table.HeaderCell>Notes</Table.HeaderCell> : null}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderStepsBody(steps, notes)}</Table.Body>
                </Table>
            );
        }
        return null;
    };

    render() {
        const { radix, decimalNumber } = this.props;
        const invalidRadix = !isValidRadix(radix);

        return (
            <React.Fragment>
                <Header as="h1">Convert a decimal number to a different radix</Header>
                {invalidRadix ? (
                    <Header as="h3" style={{ color: "tomato" }}>
                        Radix must be in the range of [2..36]
                    </Header>
                ) : null}
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
                            <label>Decimal number to convert</label>
                            <Form.Input
                                type="number"
                                name="decimalNumber"
                                value={decimalNumber}
                                onChange={this.onChange}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
                {this.renderAnswer()}
                {this.renderSteps()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        radix: state.radix,
        decimalNumber: state.decimalNumber,
    };
};

export default connect(mapStateToProps, { setRadix, setDecimalNumber, setRadixNumber })(
    FromDecimal
);
