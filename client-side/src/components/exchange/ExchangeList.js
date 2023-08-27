import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
// import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ExchangeList extends Component {

    constructor(props) {
        super(props);
        this.state = {exchanges: []};
    }

    componentDidMount() {
        fetch('/currency-exchange')
            .then(response => response.json())
            .then(data => this.setState({exchanges: data}));
    }





    render() {
        const {exchanges, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const exchangeList = exchanges.map(exchnage => {
            return <tr key={exchnage.id}>
                <td style={{whiteSpace: 'nowrap'}}>{exchnage.from}</td>
                <td>{exchnage.to}</td>
            </tr>
        });

        return (
            <div>
                {/*<AppNavbar/>*/}
                <Container fluid>
                    {/*<div className="float-right">*/}
                    {/*    <Button color="success" tag={Link} to="/clients/new">Add Client</Button>*/}
                    {/*</div>*/}
                    <h3>exchnages</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">id</th>
                            <th width="30%">From</th>
                            <th width="40%">To</th>
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