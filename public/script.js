"use strict";

//url for fetching api
let url = "http://127.0.0.1:3000/workexperience"
//ul element from DOM
const listEl = document.getElementById("explist")


//get added work experience on startpage
if (listEl) { getData() }


//function for fetching existing data/experiences
async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    //if data exists, write out to DOM ul list
    if (data) {
        data.forEach(exp => {

            const liEl = document.createElement("li") //add a li element for each experience
            const deleteEl = document.createElement("button") //add delete button for each experience
            deleteEl.textContent = "delete"
            deleteEl.className = "deletebutton"
            liEl.innerHTML = `<p>Company: ${exp.company} <br> Jobtitle: ${exp.jobtitle} <br> Location: ${exp.location}</p>`
            listEl.appendChild(liEl);
            liEl.appendChild(deleteEl)
            //eventlistener for deleting data for each experience
            deleteEl.addEventListener("click", () => { deleteData(exp.id, liEl) })
        });
    }
};

async function deleteData(id, liEl) {
    try { //fetch API with method DELETE, delete experience with chosen ID
        const response = await fetch(`http://127.0.0.1:3000/workexperience/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.ok) { //write out deleted item to console
            console.log(`Deleted item with id: ${id}`);
            liEl.remove(); //remove the li elemenent from the page
        } else {
            console.error('Failed to delete item');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}


//for sumbitting/saving a new work experience
let savebuttonEl = document.getElementById("submit")

if (savebuttonEl) {
    savebuttonEl.addEventListener("click", (event) => {
        event.preventDefault();  //prevent the form from reloading automatically

        //get the values of the inputs from the form
        const companyInp = document.getElementById("company").value;
        const jobtitleInp = document.getElementById("jobtitle").value;
        const locationInp = document.getElementById("location").value;
        //call createExperience with the input values
        createExperience(companyInp, jobtitleInp, locationInp);
    })

    //function for saving new experiences to the website and database
    async function createExperience(comp, jobtitle, location) {

        let experience = {
            company: comp,
            jobtitle: jobtitle,
            location: location
        }

        if (comp === "" || jobtitle === "" || location === "") {
            let pEl = document.createElement("p")
            pEl.innerHTML = "Please fill in all fields!";
            pEl.style.color = "orange";
            let articleEl = document.querySelector("article")
            articleEl.innerHTML = "<h1>Add a new work experience:</h1>"
            articleEl.appendChild(pEl);

        } else {
            //fetch API with POST method for posting new data to database
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, //transform to JSON
                body: JSON.stringify(experience)
            }); if (response.ok) {
                document.getElementById("company").value = "";
                document.getElementById("jobtitle").value = "";
                document.getElementById("location").value = "";
                let articleEl = document.querySelector("article")
                articleEl.innerHTML = "<h1>Add a new work experience:</h1>"
                let pEl = document.createElement("p");
                pEl.innerHTML = "Experience saved successfully!";
                pEl.style.color = "orange";
                articleEl.appendChild(pEl);
            }
        }

    }
}