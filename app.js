//Define UI variable
let form;
let taskList;
let clearBtn
let filter;
let taskInput;

function findElements() {
	form = document.querySelector('#task-form');
	taskList = document.querySelector('.collection');
	clearBtn = document.querySelector('.clear-tasks');
	filter = document.querySelector('#filter');
	taskInput = document.querySelector('#task');
}

function createLink() {
		const link = document.createElement('a');
		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="fa fa-remove"></>';
		return link;
}

function createList() {
	const li = document.createElement('li');
	li.className = 'collection-item';
	li.appendChild(document.createTextNode(taskInput.value));
	return li;
}


function createListOfElements() {
	const li = createList();
	li.appendChild(createLink());
	taskList.appendChild(li);
}

function checkStorage() {
	let tasks;
		if (localStorage.getItem('tasks') === null) tasks = [];
	 else tasks = JSON.parse(localStorage.getItem('tasks'));
		return tasks;
}

//Store in local storage
function storeTask(task) {
	const tasks = checkStorage();
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(event) {
	if (taskInput.value === '') alert('Add task');
	else {
		event.preventDefault();
		createListOfElements();
		storeTask(taskInput.value);
		taskInput.value = '';
	}	
}

function removeTask(event) {
	const { target } = event;
	if (target.parentElement.classList.contains('delete-item')) {
		target.parentElement.parentElement.remove();
		removeTaskFromStorage(target.parentElement.parentElement);
	}
}

function clearTaskFromStorage() {
	localStorage.clear();
}

function clearTasks(event) {
	while(taskList.firstChild) taskList.removeChild(taskList.firstChild);
	clearTaskFromStorage();
}

function filterTasks(event) {
	const { target } = event;
	const text = target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach( task => {
	const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) !== -1) task.style.display = 'block';
		else task.style.display = 'none';
	});
}

//Save task after reload
function getTasks() {
	const tasks = checkStorage();
	tasks.forEach( task => {
			const link = createLink();
			const li = document.createElement('li');
			li.className = 'collection-item';
			li.appendChild(document.createTextNode(task));
			li.appendChild(link);
			taskList.appendChild(li);
	});
}

function removeTaskFromStorage(taskItem) {
	const tasks = checkStorage();
	tasks.forEach( (task, index) => {
		if (taskItem.textContent === task) tasks.splice(index, 1);
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function subscribe() {
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', clearTasks);
	filter.addEventListener('keyup', filterTasks);
	document.addEventListener('DOMContentLoaded', getTasks);
}

window.onload = init() {
	findElements();
	subscribe();
}
