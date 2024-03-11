if (localStorage.getItem('toDoList') === null) {
    var toDos = [];
    localStorage.setItem('toDoList', JSON.stringify(toDos));
}

function showData() {
    var allToDos = localStorage.getItem('toDoList');
    jsonToDos = JSON.parse(allToDos) || [];

    var table = "<table border='1'><tr><th>Nro</th><th>To Do</th></tr>";

    for (var i = 0; i < jsonToDos.length; i++) {
        table += "<tr>";
        table += "<td>" + (i) + "</td>";
        table += "<td>";
        table += "<input type='checkbox' id='checkbox_" + i + "' onclick='toggleStrikeThrough(" + i + ")'";
        if (jsonToDos[i].completed) {
            table += " checked"; // Check the checkbox if completed
        }
        table += ">";
        table += "<label for='checkbox_" + i + "'>";
        if (jsonToDos[i].completed) {
            table += "<s>" + jsonToDos[i].toDo + "</s>"; // Apply strikethrough if completed
        } else {
            table += jsonToDos[i].toDo;
        }
        table += "</label>";
        table += "</td>";
        table += "</tr>";
    }

    var place = document.getElementById('storage_place');
    place.innerHTML = table;
}

function toggleStrikeThrough(index) {
    var checkBox = document.getElementById("checkbox_" + index);

    jsonToDos[index].completed = checkBox.checked;
    localStorage.setItem('toDoList', JSON.stringify(jsonToDos));

    showData();
}

function saveData() {
    var toDos = JSON.parse(localStorage.getItem('toDoList')) || [];
    // Saves data to local storage
    var toDoInput = document.getElementById('toDo');
    var toDo = toDoInput.value;

    if (toDo == null || toDo == "" || toDo.length < 3|| toDo.length > 12) {
        toDoInput.style.borderColor = "red";
        document.getElementById("feedback").innerHTML = "<b style='color: white;'>*Fill in properly</b>";
        return false;
        // Creates an error message if input is faulty
    }

    // Create a new object
    var toDoItem = {
        toDo: toDo,
        completed: false
    }

    // Save item to list
    toDos.push(toDoItem);

    // Save list to local storage
    localStorage.setItem('toDoList', JSON.stringify(toDos));

    // Reset the border color and remove error text
    toDoInput.style.borderColor = "";
    document.getElementById("feedback").innerHTML = "";
    showData();
}


function deleteData() {
    var delNum = document.getElementById("delNumber").value;

    var myToDos = localStorage.getItem('toDoList');
    var jsonToDos = JSON.parse(myToDos);

    jsonToDos.splice(delNum, 1);
    //Deletes singular data from list based on input value

    localStorage.setItem('toDoList', JSON.stringify(jsonToDos));
    showData();
}

function clearData() {
    var myToDos = localStorage.getItem('toDoList');
    var jsonToDos = JSON.parse(myToDos);

    // Remove out all checkmarked items
    jsonToDos = jsonToDos.filter(item => !item.completed);

    localStorage.setItem('toDoList', JSON.stringify(jsonToDos));
    showData();
}

