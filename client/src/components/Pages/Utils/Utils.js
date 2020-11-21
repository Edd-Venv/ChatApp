import classes from "./Utils.module.css";

export function getDate() {
  const d = new Date();
  const hour = d.getHours();
  const mins = d.getMinutes();
  return `${hour}:${mins}`;
}

function messageHandler(message, userName, status, timeStamp, image) {
  const feed = document.getElementById("ul");
  const img = document.createElement("img");
  const text = document.createElement("li");
  const div = document.createElement("div");
  const p = document.createElement("p");
  const small = document.createElement("small");

  img.src = `https://userspictures.s3.us-east-2.amazonaws.com/${image}`;
  img.className = classes.Img;
  p.innerText = message;
  small.innerText = timeStamp;
  small.className = classes.Small;
  p.appendChild(small);

  text.innerHTML = `${p.innerHTML}`;

  if (status === "recieved") {
    div.className = classes.Left;
    text.className = classes.LeftTextBox;
    div.prepend(img);
    div.appendChild(text);
  }

  if (status === "sent") {
    div.className = classes.Right;
    text.className = classes.RightTextBox;

    div.appendChild(text);
    div.append(img);
  }

  feed.appendChild(div).scrollIntoView({ smooth: true });
}
export default messageHandler;
