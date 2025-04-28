
//package requirements
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

//use database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Failed to open database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

const app = express();
//if no specified port, use port 3000
const port = process.env.PORT || 3000;

//middlewares used
app.use(cors()); app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));




// Routes
app.get("/workexperience", (req, res) => {

    //Get experiences, database query
   db.all("SELECT * FROM experiences;", (err, rows) => {
        if (err) {
            res.status(500).json({ error: "something went wrong" + err });
            return;
        }//if nothing is added
        if (rows.length === 0) {
            res.status(404).json({ message: "no experiences added" })
        }
        //return results in json
        res.json(rows);
    });
});

//update row in database
app.put("/workexperience/:id", (req, res) => {
    const { company, jobtitle, location } = req.body;
    const id = req.params.id; //paramameter in url
    //database query
    const query = `UPDATE experiences SET company = ?, jobtitle = ?, location = ? WHERE id = ?`;

    db.run(query, [company, jobtitle, location, id], function (err) {
        if (err) { //if error
            console.error("update failed: " + err);
            return res.status(500).json({ error: "failed to update work experience" });
        }

        res.json({ message: "Work experience updated", id });
    });
});

//delete row in database
app.delete("/workexperience/:id", (req, res) => {
    //id in url parameter
    const id = req.params.id;

    const query = `DELETE FROM experiences WHERE id = ?`;


    db.run(query, [id], function (err) {
        if (err) { // if error
            console.error("delete failed: " + err);
            return res.status(500).json({ error: "failed to delete work experience" });
        }
        //return info about successful delete of id row
        res.json({ message: "Work experience deleted", id });
    });
});

//create row in database with POST
app.post("/workexperience", (req, res) => {
    //get info from input fields
    let company = req.body.company;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    //detailed information of errors
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    }
//if  all input fields are not written, throw error
    if (!company || !jobtitle || !location) {

        //error messages
        errors.message = "fields not included";
        errors.detail = "You must include all fields in JSON";
        //response
        errors.https_response.message = "Bad Request";
        errors.https_response.code = 400;

        res.status(400).json(errors);

        return;
    }

    //add experience to database from input
    const query = 'INSERT INTO experiences(company, jobtitle, location) VALUES (?, ?, ?);'; db.run(query, [company, jobtitle, location], function (err) {
            if (err) { //if error
               return res.status(500).json({ error: "something went wrong" + err });
            };
//send info about successful result in json
            res.status(200).json({
                message: "Work experience received",
                data: {
                    company,
                    jobtitle,
                    location
                }
            });
        });


});

//tell express to start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});