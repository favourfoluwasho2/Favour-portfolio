/* =========================================================================
   planner.js — Academic Planner task management system
   Demonstrates: arrays & functions, DOM manipulation, event handling,
   dynamic content updates, and localStorage persistence.
   ========================================================================= */

(function () {
  "use strict";

  var STORAGE_KEY = "favour-academic-planner-tasks";

  var form = document.getElementById("taskForm");
  var listEl = document.getElementById("task-list");
  var emptyState = document.getElementById("emptyState");
  var statsEl = document.getElementById("plannerStats");
  var filterPills = document.getElementById("filterPills");
  var clearDoneBtn = document.getElementById("clearDone");

  if (!form || !listEl) return; // only run on planner.html

  var currentFilter = "all";

  /* ---------------- data layer (array of task objects) ---------------- */

  function loadTasks() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return seedTasks();
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : seedTasks();
    } catch (err) {
      console.warn("Could not read saved tasks, starting fresh.", err);
      return seedTasks();
    }
  }

  function seedTasks() {
    var today = new Date();
    var inFiveDays = new Date(today);
    inFiveDays.setDate(today.getDate() + 5);

    return [
      {
        id: makeId(),
        title: "Finish Cyber Threat Management module 3",
        course: "Cyber Threat Mgmt",
        due: inFiveDays.toISOString().slice(0, 10),
        priority: "High",
        done: false
      },
      {
        id: makeId(),
        title: "Submit HTML assignment for this portfolio",
        course: "HTML",
        due: today.toISOString().slice(0, 10),
        priority: "Medium",
        done: true
      }
    ];
  }

  function saveTasks(tasks) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.warn("Could not save tasks in this browser.", err);
    }
  }

  function makeId() {
    return "t_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
  }

  var tasks = loadTasks();

  /* ---------------------------- rendering ------------------------------ */

  function isOverdue(task) {
    if (!task.due || task.done) return false;
    var due = new Date(task.due + "T23:59:59");
    return due.getTime() < Date.now();
  }

  function filteredTasks() {
    return tasks.filter(function (t) {
      if (currentFilter === "active") return !t.done;
      if (currentFilter === "done") return t.done;
      return true;
    });
  }

  function priorityTagClass(priority) {
    if (priority === "High") return "tag rust";
    if (priority === "Medium") return "tag gold";
    return "tag";
  }

  function formatDue(dateStr) {
    if (!dateStr) return "No due date";
    var d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }

  function render() {
    var visible = filteredTasks();
    listEl.innerHTML = "";

    if (visible.length === 0) {
      emptyState.style.display = "block";
      emptyState.textContent =
        tasks.length === 0
          ? "No tasks yet — add your first one to the left."
          : "Nothing in this view. Try a different filter.";
    } else {
      emptyState.style.display = "none";
      visible.forEach(function (task) {
        listEl.appendChild(buildTaskEl(task));
      });
    }

    renderStats();
  }

  function buildTaskEl(task) {
    var item = document.createElement("div");
    item.className = "task-item" + (task.done ? " done" : "");
    item.dataset.id = task.id;

    var overdue = isOverdue(task);

    item.innerHTML =
      '<button class="task-check" aria-label="Toggle complete" type="button">' +
      '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M2 8l4 4 8-8" stroke="#F7EDE2" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg></button>" +
      '<div class="task-main">' +
      '<p class="task-title"></p>' +
      '<div class="task-meta">' +
      '<span class="tag"></span>' +
      '<span class="' + priorityTagClass(task.priority) + '"></span>' +
      '<span class="task-due' + (overdue ? " overdue" : "") + '"></span>' +
      "</div></div>" +
      '<button class="task-del" aria-label="Delete task" type="button">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M3 4h10M6.5 4V2.6a.6.6 0 01.6-.6h1.8a.6.6 0 01.6.6V4M4.5 4l.6 9a1 1 0 001 .9h3.8a1 1 0 001-.9l.6-9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg></button>";

    // Fill text content safely (avoids HTML injection from user input)
    item.querySelector(".task-title").textContent = task.title;
    item.querySelector(".task-meta .tag:first-child").textContent = task.course || "General";
    item.querySelectorAll(".task-meta span")[1].textContent = task.priority;
    item.querySelector(".task-due").textContent =
      (overdue ? "Overdue · " : "Due ") + formatDue(task.due);

    item.querySelector(".task-check").addEventListener("click", function () {
      toggleDone(task.id);
    });
    item.querySelector(".task-del").addEventListener("click", function () {
      deleteTask(task.id);
    });

    return item;
  }

  function renderStats() {
    var total = tasks.length;
    var done = tasks.filter(function (t) { return t.done; }).length;
    var active = total - done;
    statsEl.innerHTML =
      '<span class="tag">' + total + " total</span>" +
      '<span class="tag gold">' + active + " active</span>" +
      '<span class="tag rust">' + done + " done</span>";
  }

  /* ---------------------------- mutations ------------------------------- */

  function addTask(title, course, due, priority) {
    tasks.unshift({
      id: makeId(),
      title: title,
      course: course,
      due: due,
      priority: priority,
      done: false
    });
    saveTasks(tasks);
    render();
  }

  function toggleDone(id) {
    tasks = tasks.map(function (t) {
      if (t.id === id) return Object.assign({}, t, { done: !t.done });
      return t;
    });
    saveTasks(tasks);
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (t) {
      return t.id !== id;
    });
    saveTasks(tasks);
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter(function (t) {
      return !t.done;
    });
    saveTasks(tasks);
    render();
  }

  /* ----------------------------- events --------------------------------- */

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var titleInput = document.getElementById("taskTitle");
    var title = titleInput.value.trim();
    if (!title) {
      titleInput.focus();
      return;
    }
    var course = document.getElementById("taskCourse").value;
    var due = document.getElementById("taskDue").value;
    var priority = document.getElementById("taskPriority").value;

    addTask(title, course, due, priority);
    form.reset();
    document.getElementById("taskPriority").value = "Medium";
    titleInput.focus();
  });

  filterPills.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    currentFilter = btn.dataset.filter;
    filterPills.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("active", b === btn);
    });
    render();
  });

  clearDoneBtn.addEventListener("click", clearCompleted);

  /* ------------------------------- init ---------------------------------- */
  render();
})();
