function addconfesion() {
    let confessionText = document.getElementById("confessionText").value;
    let selectedOption = document.getElementById("selectOption").value;
    let randomId = (Math.floor(1000 + Math.random() * 9000)).toString();;
    var confessionObject = {
        id: randomId,
        text: confessionText,
        option: selectedOption,
        replies:[],
    };


    localStorage.setItem("confession_" + randomId, JSON.stringify(confessionObject));


    console.log("Confession Text: " + confessionText);
    console.log("Selected Option: " + selectedOption);
    console.log("ID: " + randomId);
    displayConfessions();
    
}




// Function to retrieve and display confessions
function displayConfessions() {
    // Clear previous content
    var confessionList = document.getElementById("confessionList");
    confessionList.innerHTML = "";

    // Iterate through local storage keys
    for (var key in localStorage) {
        if (key.startsWith("confession_")) {
             
            // Retrieve and parse the confession object
            var confessionObject = JSON.parse(localStorage.getItem(key));
                console.log(confessionObject)
            // Create a card element for each confession
            var card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">ID: ${confessionObject.id}</h5>

                    <p class="card-text">Category: ${confessionObject.option}</p>
                    <p class="card-text">Confession:${confessionObject.text}</p>
                    <button onclick="updateConfession('${confessionObject.id}')">Update</button>
                    <button onclick="deleteConfession('${confessionObject.id}')">Delete</button>
                    <button onclick="replyConfession('${confessionObject.id}')">Reply..</button>
                </div>
            `;

            // Append the card to the list
            confessionList.appendChild(card);
        }
    }
}
// Function to update a confession
function updateConfession(confessionId) {
    var editUrl = "Update.html?id=" + confessionId;
    window.location.href = editUrl;
} 
function replyConfession(confessionId) {
    var replyUrl = "Reply.html?id=" + confessionId;
    window.location.href = replyUrl;
   
}
function UpdateConfession2(confessionId) {
   
    var confessionKey = "confession_" + confessionId;
    var confessionObject = JSON.parse(localStorage.getItem(confessionKey)); 
    var textarea = document.getElementById("confessionupdateText");
    textarea.value = confessionObject.text;
    var catgry=document.getElementById("selectOptionupdate")
    catgry.value= confessionObject.option;

}
function getConfessionIdFromURL() {
    var urlString = window.location.href;
    console.log("Current URL:", urlString);
    var urlParts = urlString.split("/");
    var lastPart = urlParts[urlParts.length - 1];
    
    var confessionId = lastPart.split("?id=")[1];
    console.log("Extracted ID:", confessionId);

    return confessionId;
}
function UpdateConfession3() {

    var confessionId = getConfessionIdFromURL();
    var textarea = document.getElementById("confessionupdateText");
    var cat= document.getElementById("selectOptionupdate");
   
    var confessionKey = "confession_" + confessionId;
    var existingConfession = JSON.parse(localStorage.getItem(confessionKey));

    if (existingConfession) {
        existingConfession.text = textarea.value;
        existingConfession.option = cat.value;
        localStorage.setItem(confessionKey, JSON.stringify(existingConfession));
        alert("Confession updated successfully!");
    } else {
        alert("Confession not found for ID:", confessionId);
    }
}
function submitreply(){
    var confessionId = getConfessionIdFromURL();
    var replytextarea = document.getElementById("confessionreplyText").value;  
    var confessionKey = "confession_" + confessionId;
    var existingConfession = JSON.parse(localStorage.getItem(confessionKey));
    if (existingConfession) {
        existingConfession.replies.push(replytextarea);
        localStorage.setItem(confessionKey, JSON.stringify(existingConfession));
        console.log(existingConfession)
        alert("Reply added successfully!");
    } else {
        alert("Confession not found for ID:", confessionId);
    }
}


// Function to delete a confession
function deleteConfession(confessionId) {
    localStorage.removeItem("confession_" + confessionId);
    displayConfessions(); // Refresh the display after deletion
}



function SetReplyPage(confessionId){
    var confessionKey = "confession_" + confessionId;
    var confessionObject = JSON.parse(localStorage.getItem(confessionKey));
    console.log(confessionObject)
    var card=document.getElementById("card")
    card.innerHTML = `<strong>Confession:<strong/>${confessionObject.text}`
                
            
}
