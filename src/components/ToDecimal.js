import React from "react";
import { Header, Form } from "semantic-ui-react";

// import './ToDecimal.css';
import { radixToDecimal } from "../utils";

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
                {/* {this.renderSteps()} */}
            </React.Fragment>
        );
    }
}

export default ToDecimal;
