const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(form);

  axios.post("/report", data);
  form.reset();
});
