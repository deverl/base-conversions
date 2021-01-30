import React from "react";
import { Header, Form, Table } from "semantic-ui-react";

// import './ToDecimal.css';
import { decimalToRadix, radixToDecimal, hasNotes, digitToDecimal } from "../utils";

class ToDecimal extends React.Component {
    state = { radix: 16, radixNumber: "" };

    componentDidMount() {}

    onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    renderAnswer = () => {
        const { radixNumber, radix } = this.state;
        if (radixNumber) {
            const answer = radixToDecimal(radixNumber, radix);
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
            throw new Error(`Radix (${radix}) is out of range [2..36]`);
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
        const { radixNumber, radix } = this.state;
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

    render() {
        const { radix, radixNumber } = this.state;
        const error = radix < 2 || radix > 36;

        return (
            <React.Fragment>
                <Header as="h1">Convert to decimal number from a different radix</Header>
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
                            <label>Number (in base {radix}) to convert</label>
                            <Form.Input
                                name="radixNumber"
                                value={radixNumber}
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

export default ToDecimal;
