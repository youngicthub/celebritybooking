function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("active");
}

document.querySelectorAll(".fa-heart").forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("liked");
  });
});

// Add interactivity for buttons
document.querySelectorAll(".buy-btn").forEach((button) => {
  button.addEventListener("click", () => {
    alert("Ticket purchase feature coming soon!");
  });
});

const newEvent = {
  month: "JAN",
  day: "10",
  year: "2027",
  title: "New Year Blast",
  location: "📍 Lagos",
};

const tourList = document.getElementById("tourList");
const tourItem = document.createElement("div");
tourItem.className = "tour-item";
tourItem.innerHTML = `
  <div class="tour-date">
    <span class="month">${newEvent.month}</span>
    <span class="day">${newEvent.day}</span>
    <span class="year">${newEvent.year}</span>
  </div>
  <div class="tour-details">
    <h2>${newEvent.title}</h2>
    <div class="location">${newEvent.location}</div>
  </div>
  <button class="buy-btn">PURCHASE TICKETS</button>
`;
// tourList.appendChild(tourItem);

// Attach event listener to the new button
tourItem.querySelector(".buy-btn").addEventListener("click", () => {
  alert(`You selected: ${newEvent.title}`);
});

document.querySelectorAll(".favorite-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("active");
    if (icon.classList.contains("active")) {
      icon.style.background = "#22c55e"; // green
    } else {
      icon.style.background = "#a855f7"; // purple
    }
  });
});

// Booking function bookTicket(event) {

document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const steps = [
    document.getElementById("step1"),
    document.getElementById("step2"),
    document.getElementById("step3"),
  ];
  const continue1Btn = document.getElementById("continue1");
  continue1Btn.addEventListener("click", () => {
    console.log(steps[0]);
    steps[0].classList.add("hidden");
    steps[1].classList.remove("visible");
    steps[2].classList.add("hidden");
  });

  const back2Btn = document.getElementById("back2");
  const continue2Btn = document.getElementById("continue2");
  continue2Btn.addEventListener("click", () => {
    steps[0].classList.add("hidden");
    steps[1].classList.add("hidden");
    steps[2].classList.remove("visible");
  })

  const back3Btn = document.getElementById("back3");
  const stepIndicators = document.querySelectorAll(".step-indicator");
  const progressLine1 = document.getElementById("progress-line-1");
  const progressLine2 = document.getElementById("progress-line-2");
  const messageBox = document.getElementById("messageBox");
  const messageText = document.getElementById("messageText");
  const closeMessageBtn = document.getElementById("closeMessage");

  const paymentProofInput = document.getElementById("paymentProof");
  const dropArea = document.getElementById("drop-area");
  const filePreview = document.getElementById("file-preview");
  const fileNameSpan = document.getElementById("file-name");
  const removeFileBtn = document.getElementById("remove-file");

  let currentStep = 0;

  // Function to update step visibility and active indicators
  function updateSteps() {
    steps.forEach((step, index) => {
      if (index === currentStep) {
        step.classList.remove("hidden");
      } else {
        step.classList.add("hidden");
      }
    });

    stepIndicators.forEach((indicator, index) => {
      if (index <= currentStep) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });

    // Update progress lines
    if (currentStep >= 1) {
      progressLine1.style.width = "100%";
    } else {
      progressLine1.style.width = "0%";
    }
    if (currentStep >= 2) {
      progressLine2.style.width = "100%";
    } else {
      progressLine2.style.width = "0%";
    }
  }

  // Function to show a message box
  function showMessage(message) {
    messageText.textContent = message;
    messageBox.classList.remove("hidden");
  }

  // Function to hide the message box
  closeMessageBtn.addEventListener("click", () => {
    messageBox.classList.add("hidden");
  });

  // Navigation for Step 1
  continue1Btn.addEventListener("click", () => {
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");

    if (!fullName.value || !email.value || !phone.value) {
      showMessage(
        "Please fill in all required fields (Full Name, Email Address, Phone Number) before continuing."
      );
      return;
    }
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showMessage("Please enter a valid email address.");
      return;
    }

    // Populate summary for step 3
    document.getElementById("summaryFullName").textContent = fullName.value;
    document.getElementById("summaryEmail").textContent = email.value;

    currentStep = 1;
    updateSteps();
  });

  // Navigation for Step 2
  back2Btn.addEventListener("click", () => {
    currentStep = 0;
    updateSteps();
  });

  continue2Btn.addEventListener("click", () => {
    // You can add validation for Step 2 fields here if needed
    const bookingType = document.getElementById("bookingType").value;
    const preferredDate = document.getElementById("preferredDate").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (!bookingType || !preferredDate || !paymentMethod) {
      showMessage(
        "Please select a Booking Type, Preferred Date, and Payment Method."
      );
      return;
    }

    document.getElementById("summaryPaymentMethod").textContent = paymentMethod;

    currentStep = 2;
    updateSteps();
  });

  // Navigation for Step 3
  back3Btn.addEventListener("click", () => {
    currentStep = 1;
    updateSteps();
  });

  // Handle file input
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("border-navy-blue", "bg-blue-50");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("border-navy-blue", "bg-blue-50");
  });

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("border-navy-blue", "bg-blue-50");
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  });

  paymentProofInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  });

  removeFileBtn.addEventListener("click", () => {
    paymentProofInput.value = ""; // Clear the file input
    filePreview.classList.add("hidden");
    fileNameSpan.textContent = "";
  });

  function handleFileUpload(file) {
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      showMessage("Invalid file type. Please upload a PNG, JPG, or PDF.");
      paymentProofInput.value = ""; // Clear the input
      return;
    }

    if (file.size > maxSize) {
      showMessage("File size exceeds 5MB. Please upload a smaller file.");
      paymentProofInput.value = ""; // Clear the input
      return;
    }

    fileNameSpan.textContent = file.name;
    filePreview.classList.remove("hidden");
  }

  // Form submission
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    const paymentProof = document.getElementById("paymentProof");
    if (!paymentProof.files.length) {
      showMessage(
        "Please upload your payment proof before confirming your booking."
      );
      return;
    }

    // In a real application, you would send this data to a server
    // using fetch() or XMLHttpRequest.
    const formData = new FormData(bookingForm);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log("Booking Data:", data);
    showMessage(
      "Your booking has been successfully submitted! We will review your payment proof shortly."
    );

    // Optionally reset the form or redirect
    // bookingForm.reset();
    // currentStep = 0;
    // updateSteps();
  });

  // Initial step setup
  updateSteps();
});
