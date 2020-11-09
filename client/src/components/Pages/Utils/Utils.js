import classes from "./Utils.module.css";

function messageHandler(message, userName, selectedContactsName) {
  const text = document.createElement("li");
  text.innerHTML = `${message} from ${userName}`;

  if (selectedContactsName === "recieved") text.className = classes.LeftTextBox;
  else text.className = classes.RightTextBox;

  document.getElementById("ul").appendChild(text);
}
export default messageHandler;
