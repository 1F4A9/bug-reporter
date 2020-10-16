const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(form);
  console.log(...data);

  axios.post("http://localhost:5000/bug", data);
  form.reset();
});
