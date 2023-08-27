import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';

class ExchangeList extends Component {

    constructor(props) {
        super(props);
        this.state = {exchanges: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        debugger
        fetch('/exchanges')
            .then(response => response.json())
            .then(data => this.setState({exchanges: data}));
    }

    async remove(id) {
        debugger
        await fetch(`/exchanges/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedexchanges = [...this.state.exchanges].filter(i => i.id !== id);
            this.setState({exchanges: updatedexchanges});
        });
    }

    render() {
        debugger
        const {exchanges} = this.state;

        const exchangeList = exchanges.map(exchange => {
            return <tr key={exchange.id}>
                <td style={{whiteSpace: 'nowrap'}}>{exchange.from}</td>
                <td>{exchange.to}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/exchanges/" + exchange.id}>ویرایش</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(exchange.id)}>حذف</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/exchanges/new">افزودن نرخ ارزی</Button>
                    </div>

                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">از</th>
                            <th width="30%">به</th>
                        </tr>
                        </thead>
                        <tbody>
                        {exchangeList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ExchangeList;