//reference to database
let dataRef = firebase.database().ref("registeredProtest"); 

let button = document.getElementById("submit_button");
button.addEventListener('click', onClick);

function onClick(event){
    event.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const startTime = document.getElementById("start_time").value;
    const endTime = document.getElementById("end_time").value;
    const limit = document.getElementById("people_limit").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;
    const date = document.getElementById("date").value;

    //clears form
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("start_time").value = "";
    document.getElementById("end_time").value = "";
    document.getElementById("people_limit").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
    document.getElementById("date").value = "";

    //makes object to push to database
    let value = {
        NAME: name,
        ADDRESS: address,
        START: startTime,
        END: endTime,
        LIMIT: limit,
        PEOPLEGOING: 0,
        DESCRIPTION: description,
        IMAGE: image,
        DATE: date
    }

    //database push
    dataRef.push(value);
}