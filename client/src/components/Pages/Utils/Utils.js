import classes from "./Utils.module.css";

export function getDate() {
  const d = new Date();
  const hour = d.getHours();
  const mins = d.getMinutes();
  return `${hour}:${mins}`;
}

function messageHandler(message, userName, selectedContactsName, timeStamp) {
  const text = document.createElement("li");
  const p = document.createElement("p");
  const small = document.createElement("small");

  p.innerText = message;
  small.innerText = timeStamp;
  small.className = classes.Small;
  p.appendChild(small);

  text.innerHTML = `${p.innerHTML}`;

  if (selectedContactsName === "recieved") text.className = classes.LeftTextBox;
  else text.className = classes.RightTextBox;

  document
    .getElementById("ul")
    .appendChild(text)
    .scrollIntoView({ smooth: true });
}
export default messageHandler;
