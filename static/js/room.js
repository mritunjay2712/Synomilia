document.addEventListener('DOMContentLoaded', function() {
  // Fetch uploaded files from the server
  fetch('/get_uploaded_files')
      .then(response => response.json())
      .then(data => {
          // Select the container element to display uploaded files
          const uploadedFilesContainer = document.getElementById('uploaded__files');

          // Clear any existing files
          uploadedFilesContainer.innerHTML = '';

          // Iterate over the list of files and create download links
          data.files.forEach(file => {
              const fileLink = document.createElement('a');
              fileLink.setAttribute('href', `/static/uploads/${file}`);
              fileLink.setAttribute('download', '');
              fileLink.textContent = file;

              const listItem = document.createElement('li');
              listItem.appendChild(fileLink);

              uploadedFilesContainer.appendChild(listItem);
          });
      })
      .catch(error => {
          console.error('Error fetching uploaded files:', error);
      });
});



let messagesContainer = document.getElementById('messages');
messagesContainer.scrollTop = messagesContainer.scrollHeight;

const memberContainer = document.getElementById('members__container');
const memberButton = document.getElementById('members__button');

const chatContainer = document.getElementById('messages__container');
const chatButton = document.getElementById('chat__button');

let activeMemberContainer = false;

memberButton.addEventListener('click', () => {
  if (activeMemberContainer) {
    memberContainer.style.display = 'none';
  } else {
    memberContainer.style.display = 'block';
  }

  activeMemberContainer = !activeMemberContainer;
});

let activeChatContainer = false;

chatButton.addEventListener('click', () => {
  if (activeChatContainer) {
    chatContainer.style.display = 'none';
  } else {
    chatContainer.style.display = 'block';
  }

  activeChatContainer = !activeChatContainer;
});

let displayFrame = document.getElementById('stream__box')
let videoFrames = document.getElementsByClassName('video__container')
let userIdInDisplayFrame = null;

let expandVideoFrame = (e) => {

  let child = displayFrame.children[0]
  if(child){
      document.getElementById('streams__container').appendChild(child)
  }

  displayFrame.style.display = 'block'
  displayFrame.appendChild(e.currentTarget)
  userIdInDisplayFrame = e.currentTarget.id

  for(let i = 0; videoFrames.length > i; i++){
    if(videoFrames[i].id != userIdInDisplayFrame){
      videoFrames[i].style.height = '100px'
      videoFrames[i].style.width = '100px'
    }
  }

}

for(let i = 0; videoFrames.length > i; i++){
  videoFrames[i].addEventListener('click', expandVideoFrame)
}


let hideDisplayFrame = () => {
    userIdInDisplayFrame = null
    displayFrame.style.display = null

    let child = displayFrame.children[0]
    document.getElementById('streams__container').appendChild(child)

    for(let i = 0; videoFrames.length > i; i++){
      videoFrames[i].style.height = '300px'
      videoFrames[i].style.width = '300px'
  }
}

displayFrame.addEventListener('click', hideDisplayFrame)

document.addEventListener('DOMContentLoaded', function () {
  // Get references to HTML elements
  const fileInput = document.getElementById('file-input');
  const uploadButton = document.getElementById('upload-btn');

  // Event listener for the upload button click
  uploadButton.addEventListener('click', function () {
      const file = fileInput.files[0]; // Get the selected file

      if (file) {
          // Create a FormData object to send the file to the server
          const formData = new FormData();
          formData.append('file', file);

          // You can send the formData to the server using fetch or XMLHttpRequest
          // For example, using fetch:
          fetch('/upload', {
              method: 'POST',
              body: formData
          })
          .then(response => {
              // Handle the response from the server
              if (response.ok) {
                  console.log('File uploaded successfully');
              } else {
                  console.error('Error uploading file');
              }
          })
          .catch(error => {
              console.error('Error:', error);
          });
      } else {
          console.error('No file selected');
      }

  });

// Function to fetch and display uploaded files
function fetchUploadedFiles() {
  fetch('/get_uploaded_files')
      .then(response => response.json())
      .then(data => {
          const uploadedFilesList = document.getElementById('uploaded__files');
          uploadedFilesList.innerHTML = '';

          data.forEach(file => {
              const listItem = document.createElement('li');
              const link = document.createElement('a');
              link.href = '/static/uploads/' + file;
              link.textContent = file;
              link.download=file;
              listItem.appendChild(link);
              uploadedFilesList.appendChild(listItem);
          });
      })
      .catch(error => console.error('Error fetching uploaded files:', error));
}

// Call the function to fetch and display uploaded files
fetchUploadedFiles();



});

// Add this code to your room.js file


