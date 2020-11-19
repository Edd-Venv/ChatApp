import classes from "./ToolTip.module.css";

const handleToolTip = (
  tooltipId,
  inputId,
  formId,
  message,
  left = 50,
  top = 68
) => {
  if (!document.getElementById(tooltipId)) {
    const toolTip = document.createElement("p");
    toolTip.id = tooltipId;

    if (document.getElementById(inputId)) {
      document.getElementById(formId).appendChild(toolTip);
      const hostElement = document.getElementById(formId);
      const hostElPosLeft = hostElement.offsetLeft;
      const hostElPosTop = hostElement.offsetTop;

      // const hostElHeight = hostElement.clientHeight;

      const x = hostElPosLeft + left;
      const y = hostElPosTop - top;
      toolTip.className = classes.ToolTip;
      toolTip.style.left = `${x}px`;
      toolTip.style.top = `${y}px`;
      toolTip.innerHTML = message;
    }
  }
};
export default handleToolTip;
