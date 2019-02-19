import React, { Component } from 'react';
import {from, withStatus, status} from "./mockapi";

const Ticket = ({text}) => {
    return <li>{text}</li>;
};

class Queue extends Component {
    constructor({client}) {
        super();
        this.state = {
            tickets: []
        };
        const setTickets = (tickets) => {
            this.setState({tickets});
        };
        client.onTickets(setTickets);
        client.getTickets().then(setTickets);
    }
    
    onTicket(ticket) {
        
    }
    render() {
        const role = this.props.client.userData.role;
        const myUsername = this.props.client.userData.username;
        let tickets = [];
        if (role.admin) {
            tickets = this.state.tickets;
        } else if (role.mentor) {
            tickets = this.state.tickets.filter(withStatus(status.open));
        } else {
            tickets = this.state.tickets
                .filter(withStatus(status.open))
                .filter(from(myUsername));
        }
        return (
            <ul>
              {tickets.map(ticket => <Ticket {...ticket}/>)}
            </ul>
        );
    }
}

export {
    Queue
};
