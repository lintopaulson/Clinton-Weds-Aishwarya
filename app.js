const scriptURL = "https://script.google.com/macros/s/AKfycbwDUEvTbdLqkzmdMJ_n_a-3hf51ci-EtA1sVNZypa4OCkPL-vrknDQOIPDQeG3pLCin0w/exec"; // Replace with your deployed Apps Script URL

document.getElementById("wishForm").addEventListener("submit", function(e){
  e.preventDefault();

  // Send as URL-encoded form
  const formData = new URLSearchParams();
  formData.append("name", this.name.value);
  formData.append("message", this.message.value);

  fetch(scriptURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    alert("Your wish has been sent!");
    this.reset();
    loadWishes(); // optional: reload wishes
  })
  .catch(err => console.error(err));
});