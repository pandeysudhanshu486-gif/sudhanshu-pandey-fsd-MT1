const express = require("express");
const app = express();

app.use(express.json());

let registrations = [
    {
        id: 501,
        participantName: "Riya Sharma",
        eventName: "Tech Fest",
        department: "CSE",
        ticketCount: 2,
        paymentStatus: "Paid"
    },
    {
        id: 502,
        participantName: "Arjun Mehta",
        eventName: "Code Sprint",
        department: "IT",
        ticketCount: 1,
        paymentStatus: "Pending"
    },
    {
        id: 503,
        participantName: "Neha Verma",
        eventName: "Tech Fest",
        department: "ECE",
        ticketCount: 3,
        paymentStatus: "Paid"
    },
    {
        id:504,
        "participantName": "Karan Singh",
        "eventName": "AI Workshop",
        "department": "CSE",
        "ticketCount": 2,
        "paymentStatus": "Pending"
    }
];


app.get("/api/registrations", (req, res) => {
    res.status(200).json(registrations);
});


app.post("/api/registrations", (req, res) => {
    const {
        participantName,
        eventName,
        department,
        ticketCount,
        paymentStatus
    } = req.body;

    if (
        !participantName ||
        !eventName ||
        !department ||
        !Number.isInteger(ticketCount) ||
        ticketCount <= 0 ||
        !["Paid", "Pending"].includes(paymentStatus)
    ) {
        return res.status(400).json({
            message: "Invalid input data"
        });
    }

    const newRegistration = {
        id: Math.max(...registrations.map(r => r.id), 500) + 1,
        participantName,
        eventName,
        department,
        ticketCount,
        paymentStatus
    };

    registrations.push(newRegistration);

    res.status(201).json(newRegistration);
});


app.get("/api/registrations/filter", (req, res) => {
    const department = req.query.department;

    if (!department) {
        return res.status(400).json({
            message: "Department query is required"
        });
    }

    const result = registrations.filter(r =>
        r.department.toLowerCase() === department.toLowerCase()
    );

    res.status(200).json(result);
});


app.get("/api/registrations/pending", (req, res) => {
    const result = registrations.filter(
        r => r.paymentStatus === "Pending"
    );

    res.status(200).json(result);
});


app.get("/api/registrations/:id", (req, res) => {
    const id = Number(req.params.id);

    const registration = registrations.find(r => r.id === id);

    if (!registration) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    res.status(200).json(registration);
});


app.put("/api/registrations/:id", (req, res) => {
    const id = Number(req.params.id);

    const registration = registrations.find(r => r.id === id);

    if (!registration) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    const {
        participantName,
        eventName,
        department,
        ticketCount,
        paymentStatus
    } = req.body;

    if (
        !participantName ||
        !eventName ||
        !department ||
        !Number.isInteger(ticketCount) ||
        ticketCount <= 0 ||
        !["Paid", "Pending"].includes(paymentStatus)
    ) {
        return res.status(400).json({
            message: "Invalid input data"
        });
    }

    registration.participantName = participantName;
    registration.eventName = eventName;
    registration.department = department;
    registration.ticketCount = ticketCount;
    registration.paymentStatus = paymentStatus;

    res.status(200).json(registration);
});
app.delete("/api/registrations/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = registrations.findIndex(r => r.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    registrations.splice(index, 1);

    res.status(200).json({
        message: "Registration deleted successfully"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});