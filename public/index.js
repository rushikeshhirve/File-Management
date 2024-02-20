async function fetchData() {
  try {
    const response = await fetch("/files");
    const data = await response.json();
    console.log(data);
    data.forEach((element) => {
      let ele = document.createElement("div");
      ele.innerHTML = `
      <div class="file-item"> 
        <span>${element}</span>
        <div>
          <form method="post" action="/deletefile" >
            <input type="hidden" name="fileName" value="${element}" />
            <button type="submit" class="btn-file">Delete file</button>
          </form>
          <form method="post" action="/downloadfile" >
            <input type="hidden" name="fileName" value="${element}" />
            <button type="submit" class="btn-file">Download</button>
          </form>
        </div>
      </div>
        `;
      document.getElementById("fileList").appendChild(ele);
    });
  } catch (error) {
    console.error("Error fetching files:", error);
  }
}
fetchData();

function validateForm() {
  console.log("hi");
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput.files.length === 0) {
    alert("Add a file");
    return false;
  }
  return true;
}
