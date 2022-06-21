let textArea = document.querySelector('.textArea');
let addBtn = document.querySelector('.add');
let row = document.querySelector('.row__resultNotes');
let clear = document.querySelector('.clear');
addBtn.addEventListener('click', addFunction);

class simpanTodos{
  constructor(title,tampungArea,day,time){
    this.title = title;
    this.tampungArea = tampungArea;
    this.day = day;
    this.time = time;
  }
}

function addFunction(e){
  e.preventDefault();
  let tampungArea = textArea.value;
  let title = document.querySelector('.title').value; 
  let date = new Date();
  let day = date.getDate() + '/' + ('0' + (date.getMonth() + 1)) + '/' + date.getFullYear() ;
  let hours = date.getHours();
  let minutes = date.getMinutes();
   let time = `${hours}:${minutes}`

  if(!tampungArea || !title){
    window.alert("Isi yang benar")
  }else{
    let notes;
    if(localStorage.getItem('notes') === null){
      notes = [];
    }else{
      notes = JSON.parse(localStorage.getItem('notes'));
    } 
    let obj = new simpanTodos(title,tampungArea,day,time)
    notes.push(obj);
    localStorage.setItem("notes", JSON.stringify(notes))
    title.value = ""
    textArea.value = "";
    showTheNotes();
  
  }
}

function showTheNotes (){
  let notes;
  if(localStorage.getItem("notes") === null){
    notes = [];
  }else{
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  let tampungString = ""
  notes.forEach((Element,index) => {
    tampungString += `<div class="box__note" id="${index}">
                        <div class="notesTitle">
                            <h2>${Element.title}</h2>
                            <span>${Element.time}</span>
                            <span>${Element.day}</span>
                        </div>
                        <span class ="text">${Element.tampungArea}</span>
                        <button id="${index}" class="deleteNote" onclick="deletedBox(this.id)">Delete Note</button>
                      </div>`  
  });
  row.innerHTML = tampungString;
}
function deletedBox(getData){
  if(confirm("Apakah anda yakin ingin menghapus ? ")){
    let boxNote = document.querySelector('.box__note');
    boxNote.remove();
    removeLocalStorage(getData)
  }else{
    location.reload();
  }
}
function removeLocalStorage(getData){
  let notes;
  if(localStorage.getItem("notes") === null){
    notes = [];
  }else{
    notes  = JSON.parse(localStorage.getItem("notes"));
  }
  let indexNotes = getData;
  notes.splice(notes.indexOf(indexNotes), 1);
  localStorage.setItem("notes", JSON.stringify(notes))

}
document.addEventListener('DOMContentLoaded',() => {
  showTheNotes()
})

clear.addEventListener('click', () => {
  if(confirm("Apakah anda ingin menghapus semua ?")){
    localStorage.clear()
    location.reload();
  }else{
    location.reload();
  }
})

// handle screen
let container = document.querySelector('.container')
let handleScreen = matchMedia("(max-width:350px)");
handleScreen.addListener(handleMediaScreen);
function handleMediaScreen(e){
  if(e.matches){
    console.log(e.matches)
    container.style.display = "none"
  }else{
    container.style.display = "block";
  }
}