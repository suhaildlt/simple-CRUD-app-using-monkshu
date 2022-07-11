/*
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const mainView = async () => {
  let resp = await apiman.rest(
    APP_CONSTANTS.API_VIEWDIRECTORY,
    "POST",
    {},
    false,
    true
  );
  if (!resp) router.reload();
  app_viewdirectory.shadowRoot.querySelector("#startButton").style.display =
    "none";

  const addButton =
    '<input type="button" value="Add an Entry" onclick=\'monkshu_env.components["app-viewdirectory"].goToAddView();\'>';
  const tableHeader =
    "<tr><th>Name</th><th>Number</th><th>Edit</th><th>Delete</th></tr>";
  let sendObj = addButton + tableHeader;
  resp.forEach((data) => {
    let dataFormating =
      '<tr><td id="name' +
      data.id +
      '">' +
      data.name +
      '</td><td id="number' +
      data.id +
      '">' +
      data.number +
      "</td>";
    let editButton =
      '<td><input type="button" value="EDIT" onclick=\'monkshu_env.components["app-viewdirectory"].goToEditView(' +
      data.id +
      ")';></td>";
    let deleteButton =
      '<td><input type="button" value="DELETE" onclick=\'monkshu_env.components["app-viewdirectory"].goToDeleteView(' +
      data.id +
      ")';></td></tr>";
    sendObj = sendObj + dataFormating + editButton + deleteButton;
  });

  app_viewdirectory.shadowRoot
    .querySelector("#view")
    .insertAdjacentHTML("beforeend", sendObj);
};
// call viewDirectory fn after loading of main window
window.addEventListener("load", function () {
  mainView();
});
// fn help for adding to directory
const goToAddView = async () => {
  let newName = prompt("Enter new Name");
  console.log(newName);
  let newNumber = prompt("Enter new Number");
  if (
    newName === "" ||
    newNumber === "" ||
    newName === null ||
    newNumber === null
  ) {
    return alert("Cannot add empty ");
  }
  let addResp = await apiman.rest(
    APP_CONSTANTS.API_ADDTODIRECTORY,
    "POST",
    {
      name: newName,
      number: newNumber,
    },
    false,
    true
  );
  if (addResp.result === true) {
    alert("Data added to database successfully");
    return router.loadPage(APP_CONSTANTS.VIEWDIRECTORY_HTML);
  } else {
    alert("Something went wrong, Try again");
  }
};
// fn helps to delete an entry
// id parameter helps to identify exact element

const goToDeleteView = async (id) => {
  const retVal = confirm("Do you want to continue ?");
  if (retVal === true) {
    let deleteResp = await apiman.rest(
      APP_CONSTANTS.API_DELETEDIRECTORY,
      "POST",
      { id: id },
      false,
      true
    );
    if (deleteResp.result === true) {
      alert("Data deleted");
      return router.loadPage(APP_CONSTANTS.VIEWDIRECTORY_HTML);
    } else {
      alert("Something went wrong ,Try again");
    }
  }
};
// fn helps to edit an entry
// id parameters helps to get exact element from DOM
const goToEditView = async (id) => {
  console.log(`#name${id}`);
  const nameToEdit = app_viewdirectory.shadowRoot.querySelector(
    `#name${id}`
  ).innerHTML;

  let editedName = prompt("Type Name", nameToEdit);
  const numberToEdit = app_viewdirectory.shadowRoot.querySelector(
    `#number${id}`
  ).innerHTML;
  let editedNumber = prompt("Type Number", numberToEdit);
  if (nameToEdit === editedName || numberToEdit === editedNumber) {
    return alert("No change");
  }
  let editResp = await apiman.rest(
    APP_CONSTANTS.API_EDITDIRECTORY,
    "POST",
    {
      id: id,
      name: editedName,
      number: editedNumber,
    },
    false,
    true
  );
  if (editResp.result === true) {
    alert("Edited entry updated in database");
    return router.loadPage(APP_CONSTANTS.VIEWDIRECTORY_HTML);
  } else {
    alert("Something went wromg, Not updated, Try again");
  }
};

function register() {
  // convert this all into a WebComponent so we can use it
  monkshu_component.register(
    "app-viewdirectory",
    `${APP_CONSTANTS.APP_PATH}/components/app-viewdirectory/app-viewdirectory.html`,
    app_viewdirectory
  );
}

const trueWebComponentMode = true; // making this false renders the component without using Shadow DOM

export const app_viewdirectory = {
  trueWebComponentMode,
  register,
  mainView,
  goToAddView,
  goToDeleteView,
  goToEditView,
};
