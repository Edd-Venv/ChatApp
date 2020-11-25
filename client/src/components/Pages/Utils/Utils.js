import classes from "./Utils.module.css";
import messageFormClasses from "../../UI/Form/MessageForm/MessageForm.module.css";

export function getDate() {
  const d = new Date();
  const hour = d.getHours();
  const mins = d.getMinutes();
  return `${hour}:${mins}`;
}

export function typingFeedbackHandler(status, info) {
  const feedback = document.getElementById("feedback");
  const messagesFeed = document.getElementById("ul");

  switch (status) {
    case "TYPING": {
      if (feedback) {
        const p = document.createElement("p");
        const em = document.createElement("em");
        em.innerHTML = `${info.from} is typing...`;
        p.innerHTML = em.innerHTML;
        feedback.innerHTML = p.innerHTML;
        feedback.className = messageFormClasses.Typing;
        feedback.style.display = "flex";
        feedback.scrollIntoView({ smooth: true });
        messagesFeed.style.paddingBottom = 0;
      }
      break;
    }

    case "NOTTYPING": {
      if (feedback) {
        feedback.innerHTML = "";
        feedback.style.display = "none";
        messagesFeed.style.paddingBottom = "60px";
      }
      break;
    }

    default:
      return null;
  }
  return null;
}

function messageHandler(message, userName, status, timeStamp, image) {
  if (image) {
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
}
export default messageHandler;
