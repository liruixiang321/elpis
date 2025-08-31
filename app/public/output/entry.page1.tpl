<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <h1>Hello, Page 1!</h1>
    <button>Click Me</button>
  </body>
</html>
<script>
  // Your client-side JavaScript code here
  document.querySelector("button").addEventListener("click", function() {
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "/api/project/list");
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error("Request failed"));
        }
      };
      xhr.send();
    })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.error(error);
      });
  });
</script>


</script>