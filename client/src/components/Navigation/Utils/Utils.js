export const sideDrawerHandler = () => {
  const sideDrawerToggle = document.getElementById("drawer-toggle");
  const nav = document.getElementById("nav-bar");
  console.log("called first");
  if (sideDrawerToggle && nav) {
    sideDrawerToggle.addEventListener("click", () => {
      console.log("called second");
      nav.classList.toggle("Show");
    });
  }
};

export const nothin = () => {
  "sfsdf";
};
