import React from "react";
import { Form, Header, Table } from "semantic-ui-react";

// import "./FromDecimal.css";
import { digits } from "../constants";
import { decimalToRadix, hasNotes } from "../utils";

class FromDecimal extends React.Component {
    state = { radix: 16, decimalNumber: "" };

    onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    getSteps = (decimalNumber, radix) => {
        if (radix < 2 || radix > 36) {
            return [];
        }
        const steps = [];
        while (decimalNumber > 0) {
            let m = decimalNumber % radix;
            let q = (decimalNumber / radix) | 0;
            let c = digits[m];
            let step = {};
            step.operation = `${decimalNumber} / ${radix}`;
            step.quotient = "" + q;
            step.remainder = "" + c;
            if (m > 9) {
                step.notes = `${c} is ${m} in decimal`;
            } else {
                step.notes = "";
            }
            steps.push(step);
            decimalNumber = (decimalNumber / radix) | 0;
        }
        return steps;
    };

    renderAnswer = () => {
        const { decimalNumber, radix } = this.state;
        if (decimalNumber) {
            const answer = decimalToRadix(decimalNumber, radix);
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
        const { decimalNumber, radix } = this.state;
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
        const { radix, decimalNumber } = this.state;
        const error = radix < 2 || radix > 36;

        return (
            <React.Fragment>
                <Header as="h1">Convert a decimal number to a different radix</Header>
                {error ? (
                    <Header as="h3" style={{ color: "tomato" }}>
                        Radix must be in the range of [2..36]
                    </Header>
                ) : null}
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Field>
                            <label>Radix</label>
                            <Form.Input
                                error={error}
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

export default FromDecimal;
