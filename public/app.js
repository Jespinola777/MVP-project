//GET REQUEST
$.get("/api/todolist", function (data) {
  console.log(data);
  for (const task of data) {
    if (task.prio === "high") {
      $high.prepend(
        $("<div>")
          .attr("class", "tasks")
          .attr("id", `${task.id}`)
          .text(task.task_name)
      );
    }
    if (task.prio === "medium") {
      $med.prepend(
        $("<div>")
          .attr("class", "tasks")
          .attr("id", `${task.id}`)
          .text(task.task_name)
      );
    }
    if (task.prio === "low") {
      $low.prepend(
        $("<div>")
          .attr("class", "tasks")
          .attr("id", `${task.id}`)
          .text(task.task_name)
      );
    }
  }
});

const $button = $("#submit");
const $task = $("#task");
const $prio = $("#priority");
const $high = $("#high");
const $med = $("#med");
const $low = $("#low");

//POST REQUEST

$button.on("click", function () {
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
      if (data.prio === "high") {
        $high.prepend(
          $("<div>")
            .attr("class", "tasks")
            .attr("id", `${task.id}`)
            .text(task.task_name)
        );
      }
      if (data.prio === "medium") {
        $med.prepend(
          $("<div>")
            .attr("class", "tasks")
            .attr("id", `${task.id}`)
            .text(task.task_name)
        );
      }
      if (data.prio === "low") {
        $low.prepend(
          $("<div>")
            .attr("class", "tasks")
            .attr("id", `${task.id}`)
            .text(task.task_name)
        );
      }
    },
  });
});

$(document).on("click", ".tasks", function () {
  const $task = $(this);
  const taskId = $task.attr("id");
  const currentTaskName = $task.text();
  const prio = $(this).parent().attr("id");
  $task.replaceWith(
    $("<div>")
      .addClass("edit-container")
      .append(
        $("<input>")
          .attr({
            type: "text",
            id: "editTask",
            value: currentTaskName,
          })
          .addClass("edit-input")
      )
      .append($("<button>").text("Submit").addClass("submit-button"))
      .append($("<button>").text("Cancel").addClass("cancel-button"))
  );

  $("#editTask").focus();
  $(document).on("click", ".cancel-button", function () {
    $(".edit-container").replaceWith(
      $("<div>").addClass("tasks").attr("id", taskId).text(currentTaskName)
    );
  });
  $(document).on("click", ".submit-button", function () {
    const editedTaskName = $("#editTask").val();
    const updatedTask = {
      id: taskId,
      task_name: editedTaskName,
      prio: prio,
    };
    console.log(updatedTask);
    $.ajax({
      type: "PATCH",
      url: "/api/todolist/" + taskId,
      data: JSON.stringify(updatedTask),
      contentType: "application/json",
      success: function (data) {
        $(".edit-container").replaceWith(
          $("<div>").addClass("tasks").attr("id", taskId).text(data.task_name)
        );
      },
    });
  });
});
