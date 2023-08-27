import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../AppNavbar';

class ExchangeEdit extends Component {

    emptyItem = {
        from: '',
        to: ''
    };

    constructor(props) {
        debugger
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        debugger
        if (this.props.match.params.id !== 'new') {
            const client = await (await fetch(`/exchanges/${this.props.match.params.id}`)).json();
            this.setState({item: client});
        }
    }

    handleChange(event) {
        debugger
        const target = event.target;
        const value = target.value;
        const from = target.name;
        let item = {...this.state.item};
        item[from] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        debugger
        event.preventDefault();
        const {item} = this.state;

        await fetch('/exchanges' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/exchanges');
    }

    render() {
        debugger
        const {item} = this.state;
        const title = <h2>{item.id ? 'ویرایش نرخ ارزی' : 'افزودن نرخ ارزی'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">از</Label>
                        <Input type="text" name="from" id="from" value={item.from || ''}
                               onChange={this.handleChange} autoComplete="from"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">به</Label>
                        <Input type="text" name="to" id="to" value={item.to || ''}
                               onChange={this.handleChange} autoComplete="to"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/exchanges">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(ExchangeEdit);