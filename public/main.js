const $submit = $("#submit");
const $task = $("#task");
const $prio = $("#priority");
const $high = $("#high");
const $med = $("#med");
const $low = $("#low");

// GET REQUEST
$.get("/api/todolist", function (data) {
  console.log(data);
  for (const task of data) {
    const $taskDiv = $("<div>")
      .addClass("tasks")
      .attr("id", task.id)
      .text(task.task_name);
    const $editIcon = $("<i>").addClass("fa-sharp fa-solid fa-pen");
    const $deleteIcon = $("<i>").addClass("fa-solid fa-trash");
    const $deleteButton = $("<button>")
      .addClass("delete-button")
      .append($deleteIcon);

    const $editbutton = $("<button>").addClass("edit-button").append($editIcon);

    if (task.prio === "high") {
      $high.prepend($taskDiv.append($editbutton, $deleteButton));
    }
    if (task.prio === "med") {
      $med.prepend($taskDiv.append($editbutton, $deleteButton));
    }
    if (task.prio === "low") {
      $low.prepend($taskDiv.append($editbutton, $deleteButton));
    }
  }
});
//POST REQUEST
$submit.on("click", function () {
  let newTask = {
    task_name: $task.val(),
    prio: $prio.val(),
  };
  if (newTask.task_name === "") {
    alert("please enter task");
    return;
  }
  $.ajax({
    type: "POST",
    url: "/api/todolist",
    data: JSON.stringify(newTask),
    contentType: "application/json",
    success: function (data) {
      console.log(data);
      const $taskDiv = $("<div>")
        .addClass("tasks")
        .attr("id", data.id)
        .text(data.task_name);
      const $editIcon = $("<i>").addClass("fa-sharp fa-solid fa-pen");
      const $deleteIcon = $("<i>").addClass("fa-solid fa-trash");
      const $deleteButton = $("<button>")
        .addClass("delete-button")
        .append($deleteIcon);

      const $editbutton = $("<button>")
        .addClass("edit-button")
        .append($editIcon);

      if (data.prio === "high") {
        $high.prepend($taskDiv.append($editbutton, $deleteButton));
      }
      if (data.prio === "med") {
        $med.prepend($taskDiv.append($editbutton, $deleteButton));
      }
      if (data.prio === "low") {
        $low.prepend($taskDiv.append($editbutton, $deleteButton));
      }
    },
  });
});
// PATCH REQUEST
$(document).on("click", ".edit-button", function () {
  const $taskDiv = $(this).parent();
  const currentTaskName = $taskDiv.text();

  const $editInput = $("<input>").addClass("edit-input").val(currentTaskName);

  const $cancelButton = $("<button>").text("Cancel").addClass("cancel-button");

  const $submitButton = $("<button>").text("Submit").addClass("submit-button");

  $taskDiv.empty().append($editInput, $cancelButton, $submitButton);
});

$(document).on("click", ".cancel-button", function () {
  const $editIcon = $("<i>").addClass("fa-sharp fa-solid fa-pen");
  const $deleteIcon = $("<i>").addClass("fa-solid fa-trash");
  const $deleteButton = $("<button>")
    .addClass("delete-button")
    .append($deleteIcon);

  const $editbutton = $("<button>").addClass("edit-button").append($editIcon);
  const $taskDiv = $(this).parent();
  const taskName = $taskDiv.find(".edit-input").val();

  $taskDiv.empty().text(taskName).append($editbutton, $deleteButton);
});

$(document).on("click", ".submit-button", function () {
  const $taskDiv = $(this).parent();
  const taskId = $taskDiv.attr("id");
  const newTaskName = $taskDiv.find(".edit-input").val();
  const $editIcon = $("<i>").addClass("fa-sharp fa-solid fa-pen");
  const $deleteIcon = $("<i>").addClass("fa-solid fa-trash");
  const $deleteButton = $("<button>")
    .addClass("delete-button")
    .append($deleteIcon);

  const $editButton = $("<button>").addClass("edit-button").append($editIcon);
  $.ajax({
    type: "PATCH",
    url: "/api/todolist/" + taskId,
    data: JSON.stringify({ task_name: newTaskName }),
    contentType: "application/json",
    success: function (data) {
      $taskDiv.empty().text(data.task_name).append($editButton, $deleteButton);
    },
  });
});
//DELETE REQUEST

$(document).on("click", ".delete-button", function (event) {
  event.stopPropagation();
  const taskId = $(this).parent().attr("id"); // Use $(this) instead of $(".delete-button")

  $.ajax({
    type: "DELETE",
    url: "/api/todolist/" + taskId,
    success: function () {
      $("#" + taskId).remove();
    },
  });
});
