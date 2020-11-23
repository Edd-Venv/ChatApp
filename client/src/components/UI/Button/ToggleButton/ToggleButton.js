export default function toggleButton() {
  const toggleBtn = document.getElementById("drawer-toggle");
  if (toggleBtn.className === "bx bx-menu") toggleBtn.className = "bx bx-x";
  else toggleBtn.className = "bx bx-menu";
}
