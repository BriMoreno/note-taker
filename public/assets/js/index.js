// making variables based off of html classes
const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveBtn = $(".save-note");
const $addBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// to track of the notes being input in a array
let inputNote = [];

// to return all the notes from the db
const returnAll = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

// to save the notes to db
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

// delete notes via id
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

// to display note being written and make it so if the title and text are empty then user is unable to save the note
const renderNote = () => {
  $saveBtn.hide();

  if (inputNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(inputNote.title);
    $noteText.val(inputNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// saves input and updates db by spliting the title and text into columns in the table of the db
const handleNoteSave = function () {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };

  saveNote(newNote).then(() => {
    renderAllNotes();
    renderNote();
  });
};

// Deletes note when button is clicked
const handleNoteDelete = function (event) {
  // prevents the event click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const note = $(this).parent(".list-group-item").data();

  if (inputNote.id === note.id) {
    inputNote = {};
  }
  // once deleted it will call two function to rerun so that it no longer shows on screen
  deleteNote(note.id).then(() => {
    renderAllNotes();
    renderNote();
  });
};

const displayNote = function () {
  inputNote = $(this).data();
  renderNote();
};

const displayNewNote = function () {
  inputNote = {};
  renderNote();
};

// cannot save a note if the title or text area is empty
const renderSave = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveBtn.hide();
  } else {
    $saveBtn.show();
  }
};

// Render's the note titles on the side
const renderNoteList = (notes) => {
  $noteList.empty();

  const noteListItems = [];

  // to display the list with the delete button
  const create$li = (text, dltBtn = true) => {
    const $li = $("<li class='list-group-item'>");
    const $span = $("<span>").text(text);
    $li.append($span);

    if (dltBtn) {
      const $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }
    return $li;
  };
  //no saved notes means no delete button
  if (notes.length === 0) {
    noteListItems.push(create$li("No saved Notes", false));
  }
  notes.forEach((note) => {
    const $li = create$li(note.title).data(note);
    noteListItems.push($li);
  });
  $noteList.append(noteListItems);
};

// to render to the side bar
const renderAllNotes = () => {
  return returnAll().then(renderNoteList);
};

//click events will trigger the functions to happen
$saveBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", displayNote);
$addBtn.on("click", displayNewNote);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", renderSave);
$noteText.on("keyup", renderSave);

renderAllNotes();
