let title = document.getElementById("newNote__title--label");
let content = document.getElementById("newNote__content");
const button = document.getElementById("notes__btn");
const prevNotes = document.getElementById("notes__prev--all");
const submitBtn = document.getElementById('bottom');
let notesObj = [];

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
    notesObj.forEach((element, index) => {
        html += `<div class="notes__prev"><div class="notes__prev--title" id="notes__prev--title">${element.title}</div>
                    <div class="notes__prev--content" id="notes__prev-content">${element.content}</div>
                    <div class="notes__prev--date" id="notes__prev--date">${element.Date}
                    </div></div>`

        if (prevNotes.length != 0)
            prevNotes.innerHTML = html;
    });
}

//   const item = document.createElement("div");
//   item.setAttribute("class", "notes__prev");
//   item.innerHTML = `
//                     `;

//   prevNotes.appendChild(item);