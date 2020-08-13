//This part of code puts protests on database, on the website
    //makes a database ref
let name;
let counter = 0;
let dataRef = firebase.database().ref("registeredProtest");
dataRef.on("child_added", showProtests);

function showProtests(rowData) {
    let row = rowData.val();
    //reference to div on signup.html
    let mainContainer = document.getElementById("mainContainer");
    //creates new elements that'll go in the mainContainer
    let newDiv = document.createElement("div");
    newDiv.style.color = "white";
    newDiv.style.backgroundColor = "rgb(128, 9, 9)";
    newDiv.style.padding = "20px";
    newDiv.style.margin = "10px"
    newDiv.style.width = "80%"
    let newP = document.createElement("p");
    let newImg = document.createElement("img");
    //makes attributes of 
    newImg.src = row.IMAGE;
    newImg.style.height = "inherit";
    newImg.style.width = "50%";
    newImg.style.border = "thin solid black";
    newImg.style.float = "left";
    //puts image in the newDiv
    newDiv.appendChild(newImg);
    newP.innerText = "Protest Name: " + row.NAME + "\n" + "Date: " + row.DATE + "\n" + "Address: " + row.ADDRESS + "\n" + 
    "Start: " + row.START + "\n" + "End: " + row.END + "\n" + "Limit: " + row.LIMIT + " people \n" + "People Going: " + 
    row.PEOPLEGOING + " people \n" + "Description: " + row.DESCRIPTION + "\n";
    let textDiv = document.createElement("div");
    newP.style.float = "left";
    newP.style.textAlign = "left";
    newP.style.padding = "60px"
    textDiv.style.float = "right";
    textDiv.style.width = "50%";
    //puts newP in newDiv
    textDiv.appendChild(newP);
    textDiv.style.textAlign = "center";
    newDiv.appendChild(textDiv);
    mainContainer.appendChild(newDiv);
}

//This part of code updates databse 
let newDataRef = firebase.database().ref("signUps")
let button = document.querySelector("button");
button.addEventListener('click', onClick);

function onClick(event){
    event.preventDefault();
    name = document.getElementById("name").value;
    const number = document.getElementById("how_many_people").value;

    //clears form
    document.getElementById("name").value = "";
    document.getElementById("how_many_people").value = "";

    //makes object to push to databse 
    let value = {
        protestName: name,
        peopleGoing: number
    }

    newDataRef.push(value);

    //makes function that iterates over array and sees if they're equal
    firebase.database().ref("registeredProtest").on('value', function (snap){
        snap = snap.val();
        //keys of objects from database
        let snapKeys = Object.keys(snap);
        snapKeys.forEach(function(key){
            let boolean1 = true;
            if (snap[key].NAME == name){
                if (counter == 0){
                    counter++;
                    let db = firebase.database();
                    let total = snap[key].PEOPLEGOING + Number(number);
                    dataRef.child(key).update({ PEOPLEGOING: total}); 
                    location.reload(); 
                }
            }
        });
    });
}
