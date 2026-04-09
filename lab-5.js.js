let studentIndex = 0;
let sorted = false;
// Event listener for form submission
document.getElementById('student-form').addEventListener('submit', addStudent);

// Enable button when typing
document.getElementById('student-name').addEventListener('input', function(){
let name = document.getElementById('student-name').value;

if(name === '')
document.getElementById('add-btn').disabled = true;
else
document.getElementById('add-btn').disabled = false;

});

// Search filter
document.getElementById('search-box').addEventListener('input', searchStudent);

// Sort button
document.getElementById('sort-btn').addEventListener('click', sortStudents);

// Highlight first student
document.getElementById('highlight-first').addEventListener('click', highlightFirst);


// Add student
function addStudent(event){

event.preventDefault();

let studentName = document.getElementById('student-name').value;
let studentRoll = document.getElementById('student-roll').value;

if(studentName === '' || studentRoll === ''){
alert("Please enter name and roll");
return;
}

let li = document.createElement('li');
li.classList.add('student-item');
li.dataset.index = studentIndex;
studentIndex++;

let span = document.createElement('span');
span.textContent = studentRoll + " - " + studentName;


// Present checkbox
let presentBox = document.createElement('input');
presentBox.type = "checkbox";

presentBox.addEventListener('change',function(){

if(presentBox.checked)
li.classList.add('present');
else
li.classList.remove('present');

updateAttendance();

});


// Edit button
let editButton = document.createElement('button');
editButton.textContent = "Edit";
editButton.classList.add('btn-edit');

editButton.addEventListener('click',function(){
editStudent(li,span);
});


// Delete button
let deleteButton = document.createElement('button');
deleteButton.textContent = "Delete";
deleteButton.classList.add('btn-delete');

deleteButton.addEventListener('click',function(){

let confirmDelete = confirm("Are you sure you want to delete this student?");

if(confirmDelete){
deleteStudent(li);
}

});


li.appendChild(span);
li.appendChild(presentBox);
li.appendChild(editButton);
li.appendChild(deleteButton);

document.getElementById('student-list').appendChild(li);

document.getElementById('student-name').value='';
document.getElementById('student-roll').value='';

updateCount();
updateAttendance();

}


// Delete student
function deleteStudent(studentElement){

studentElement.remove();

updateCount();
updateAttendance();

}


// Edit student
function editStudent(studentElement, studentNameElement){

let text = studentNameElement.textContent.split(" - ");

let roll = text[0];
let name = text[1];

let newRoll = prompt("Enter new roll",roll);
let newName = prompt("Enter new name",name);

if(newRoll !== null && newName !== null){
studentNameElement.textContent = newRoll + " - " + newName;
}

}


// Update total count
function updateCount(){

let total = document.querySelectorAll('.student-item').length;

document.getElementById('student-count').textContent = "Total students: " + total;

}


// Attendance counter
function updateAttendance(){

let students = document.querySelectorAll('.student-item');

let present = 0;

students.forEach(student=>{
if(student.classList.contains('present'))
present++;
});

let absent = students.length - present;

document.getElementById('attendance').textContent =
"Present: "+present+" , Absent: "+absent;

}


// Search student
function searchStudent(){

let text = document.getElementById('search-box').value.toLowerCase();

let students = document.querySelectorAll('.student-item');

students.forEach(student=>{

let name = student.querySelector('span').textContent.toLowerCase();

if(name.includes(text))
student.style.display="flex";
else
student.style.display="none";

});

}


// Sort students
function sortStudents(){

let ul = document.getElementById('student-list');
let students = Array.from(document.querySelectorAll('.student-item'));

if(!sorted){

students.sort(function(a,b){

let nameA = a.querySelector('span').textContent.split(" - ")[1].toLowerCase();
let nameB = b.querySelector('span').textContent.split(" - ")[1].toLowerCase();

return nameA.localeCompare(nameB);

});

sorted = true;

}else{

students.sort(function(a,b){
return a.dataset.index - b.dataset.index;
});

sorted = false;

}

students.forEach(student=>{
ul.appendChild(student);
});

}


// Highlight first student
function highlightFirst(){

let students = document.querySelectorAll('.student-item');

if(students.length === 0)
return;

let firstStudent = students[0];

if(firstStudent.classList.contains('top-student')){
firstStudent.classList.remove('top-student');
}
else{

students.forEach(student=>{
student.classList.remove('top-student');
});

firstStudent.classList.add('top-student');

}
}