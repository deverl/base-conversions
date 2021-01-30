import React from "react";
import { Form, Header, Table } from "semantic-ui-react";

import "./App.css";

class App extends React.Component {
    state = { radix: 16, decimalNumber: "" };

    digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    componentDidMount() {}

    onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    decimalToRadix = (decimalNumber, radix = 16) => {
        if (radix < 2 || radix > 36) {
            return "";
        }
        let result = "";
        while (decimalNumber > 0) {
            let m = decimalNumber % radix;
            let c = this.digits[m];
            result = c + result;
            decimalNumber = (decimalNumber / radix) | 0;
        }
        return result;
    };

    getSteps = (decimalNumber, radix) => {
        if (radix < 2 || radix > 36) {
            return [];
        }
        const steps = [];
        while (decimalNumber > 0) {
            let m = decimalNumber % radix;
            let q = (decimalNumber / radix) | 0;
            let c = this.digits[m];
            let step = {};
            step.operation = `${decimalNumber} / ${radix}`;
            step.quotient = "" + q;
            step.remainder = "" + c;
            steps.push(step);
            decimalNumber = (decimalNumber / radix) | 0;
        }
        return steps;
    };

    renderStepsBody = steps => {
        if (steps && steps.length) {
            return steps.map((step, index) => {
                return (
                    <Table.Row key={index}>
                        <Table.Cell>{step.operation}</Table.Cell>
                        <Table.Cell>{step.quotient}</Table.Cell>
                        <Table.Cell>{step.remainder}</Table.Cell>
                    </Table.Row>
                );
            });
        }
        return null;
    };

    renderSteps = () => {
        const { decimalNumber, radix } = this.state;
        const steps = this.getSteps(decimalNumber, radix);
        if (steps && steps.length) {
            return (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Operation</Table.HeaderCell>
                            <Table.HeaderCell>Quotient</Table.HeaderCell>
                            <Table.HeaderCell>Remainder</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderStepsBody(steps)}</Table.Body>
                </Table>
            );
        }
        return null;
    };

    render() {
        const { radix, decimalNumber } = this.state;
        const error = radix < 2 || radix > 36;

        return (
            <div className="ui container app-container">
                <Header as="h1">Convert a decimal number to a different radix</Header>
                {error ? (
                    <Header as="h3" style={{ color: "tomato" }}>
                        Radix must be in the range of [2..36]
                    </Header>
                ) : null}
                <Form onSubmit={this.onSubmit}>
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
                        <label>Decimal number</label>
                        <Form.Input
                            type="number"
                            name="decimalNumber"
                            value={decimalNumber}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                </Form>
                <Header as="h2">{this.decimalToRadix(decimalNumber, radix)}</Header>
                {this.renderSteps()}
            </div>
        );
    }
}

export default App;
