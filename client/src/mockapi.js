const status = {
    open: "open",
    claimed: "claimed",
    closed: "closed"
};

const defaultRole = {
    mentor: false,
    hacker: true,
    admin: false,
};

class TicketExists extends Error {
    constructor(message) {
        super(message);
        this.name = "TicketExists";
    }
}

// example review
// {
//   rating: 0-5
//   comment: "wow pretty good"
// }

// example ticket
// {
//   text: "mentors, need help with python"
//   owner: "username"
//   status: "open" //or "closed" or "claimed"
//   mentorReview: Review (optional)
//   menteeReview: Review (optional)
// }

const from = (username) => (tickets) => {
    if (Array.isArray(tickets)) {
        return tickets.filter(ticket => ticket.owner === username);
    } else {
        return tickets.owner === username
    }
}

const withStatus = (status) => (tickets) => {
    console.log(tickets);
    if (Array.isArray(tickets)) {
        return tickets.filter(ticket => ticket.status === status);
    } else {
        return tickets.status === status;
    }
}

const first = (arr) => arr[0];

class MentorqClient {
    tickets = [];
    ticketCallbacks = [];

    // you can pass in {role: {role: true}} to give roles to user
    constructor(token, {role, tickets = []} = {}) {
        this.tickets = tickets;
        this.userData = {
            token,
            username: "heman",
            role: Object.assign({}, defaultRole, role)
        }
    }

    // tickets
    async getTickets() {
        return this.tickets;
    }


    async newTicket(text) {
        let myTicket = await this.getTickets()
            .then(from(this.userData.username))
            .then(withStatus(status.open))
            .then(first);

        if (myTicket !== undefined && !this.userData.role.admin) {
            throw new TicketExists();
        }

        const ticket = {
            status: status.open,
            text,
            owner: this.userData.username
        }

        this.tickets.push(ticket);
        this.ticketCallbacks.forEach(f => f(this.tickets));
    }

    onTickets(callback) {
        this.ticketCallbacks.push(callback);
    }

    setStatus(ticket) {

    }

    // TODO
    // status stuff
}

export {
    MentorqClient,
    withStatus,
    status,
    from
}
