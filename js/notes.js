let title = document.getElementById("newNote__title--label");
let content = document.getElementById("newNote__content");
const button = document.getElementById("notes__btn");
const prevNotes = document.getElementById("notes__prev--all");
const submitBtn = document.getElementById('submitNote');
let trashIcon = document.querySelector(".trash");
let notesObj = [];
let edited = false;
let ind = -1;

displayNotes();
let NoteDate = new Date();
const options = {
    day: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: 'long'
}
let date = NoteDate.toLocaleDateString("en-US", options);

// changing the CSS

title.addEventListener("click", (e) => {
    title.placeholder = "";
});
title.addEventListener("keyup", (event) => {
    let key = event.key;
    if (key === "Enter")
        content.focus();
});


submitBtn.addEventListener("click", (e) => {
    let notesTitle = title.value;
    let notesContent = content.value;

    if (!edited) {


        let note = {
            title: notesTitle,
            content: notesContent,
            Date: date
        };

        let allNotes = localStorage.getItem("notes");
        if (allNotes == null)
            notesObj = [];
        else
            notesObj = JSON.parse(allNotes);

        notesObj.push(note);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        displayNotes();
    } else {
        notesObj[ind].title = notesTitle;
        notesObj[ind].content = notesContent;
        localStorage.setItem("notes", JSON.stringify(notesObj));
        edited = false;
        displayNotes();
    }
});

button.addEventListener('click', () => {
    content.value = "";
    title.value = "";
    title.placeholder = 'Title';
})

//function to display all the notes

function displayNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null)
        notesObj = [];
    else
        notesObj = JSON.parse(notes);

    let html = "";
    if (notesObj.length == 0)
        prevNotes.innerHTML = `<div class="emptyBox">
    No notes to show, click above to add new notes 
</div>`

    notesObj.forEach((element, index) => {
        html += `<div class="notes__prev"><div class="notes__prev--title" id="notes__prev--title">${element.title}<i id=${index} onclick="editNote(this.id)" class="fas fa-edit edit"></i></div>
                    <div class="notes__prev--content" id="notes__prev-content">${element.content}</div>
                    <div class="notes__prev--date" id="notes__prev--date">${element.Date}
                    <i id=${index} onclick="deleteNode(this.id)" class="fa-solid fa-trash trash"></i>
                    </div></div>`
        if (notesObj.length != 0)
            prevNotes.innerHTML = html;


    });
}

//delete a note

function deleteNode(index) {
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    displayNotes();
}

//edit a note

function editNote(index) {

    edited = true;
    title.value = notesObj[index].title;
    content.value = notesObj[index].content;
    ind = index;
}