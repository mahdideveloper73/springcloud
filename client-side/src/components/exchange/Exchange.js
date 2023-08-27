import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
// import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class Exchange extends Component {
    render() {

        return (
            <div>
                {/*<AppNavbar/>*/}
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/clients/new">Add Client</Button>
                    </div>
                    <h3>Clients</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Email</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default Exchange;