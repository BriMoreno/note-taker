const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

//gets the notes from the db
const getNotes = () => {
  return $.ajax({
    url:"/notes",
    method: "GET",
   });
};

//to save notes
const saveNote = (note) => {
  return $.ajax({
    url: "/notes",
    data: note,
    method: "POST",
  });
};

//for deleting notes
const deleteNote = (id) => {
  return $.ajax({
    url: "/notes/" + id,
    method: "DELETE",
  });
};

//if there is a active note it will display else it will render empty
const renderActiveNote = () => {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr('readonly', true);
    $noteText.attr('readonly', true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr('readonly', false);
    $noteText.attr('readonly', false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

//get data from user input saves and updates view and db
const handleNoteSave = function () {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = function (event) {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const note = $(this).parent(".list-group-item").data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

//if title or text is empty then hide saveBtn else show the btn
const handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render the list of note titles
const renderNoteList = function(notes) {
  $noteList.empty();

  const noteListItems = [];

  // Returns jquery object in li with text input and deletebtn
  //else false
  const create$li = (text, deleteBtn = true) => {
    const $li = $("<li class= 'list-group-item>");
    const $span = $("<span>").text(text);
    $li.append($span);

    if (deleteBtn) {
      const $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-not'>");
      $li.append($delBtn);
    }
    return $li;
  };

  if (notes.length === 0) {
    noteListItems.push(create$li('No saved Notes', false));
  }

  notes.forEach(function (note) {
    const $li = create$li(note.title).data(note);
    noteListItems.push($li);
  });
    $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
  const getAndRenderNotes = () => {
    return getNotes().then(renderNoteList);
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

//get the list of notes to renders it
getAndRenderNotes();
