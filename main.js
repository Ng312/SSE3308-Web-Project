document.addEventListener("DOMContentLoaded", function () {
  // Mouse Trailer Function
  const trailer = document.getElementById("trailer");
  window.onmousemove = e => {
    const x = e.clientX - trailer.offsetWidth / 2;
    const y = e.clientY - trailer.offsetHeight / 2;
    trailer.style.transform = `translate(${x}px,${y}px)`;
  };

  let productData = null;



  document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display products
    fetch("fetch_products.php")
        .then(response => response.json())
        .then(data => {
            const productlistHTML = document.querySelector(".products");
            productlistHTML.innerHTML = "";
            if (Array.isArray(data)) {
                data.forEach(product => {
                    let productDiv = document.createElement("div");
                    productDiv.className = "wrapper";
                    productDiv.innerHTML = `
                        <div class="container" data-id="${product.id}">
                            <div class="top" style="background: url('${product.image}') no-repeat center; background-size: 60%;"></div>
                            <div class="bottom">
                                <div class="left">
                                    <div class="details">
                                        <h2>${product.name}</h2>
                                        <p>${product.price}</p>
                                    </div>
                                    <div class="buy"><img src="/img/cart.png" alt="Cart Icon"></div>
                                </div>
                            </div>
                        </div>
                    `;
                    productlistHTML.appendChild(productDiv);

                    productDiv.querySelector(".container").addEventListener("click", function () {
                        let productId = this.getAttribute("data-id");
                        window.location.href = "/product_detail.php?id=" + productId;
                    });
                });
            }
        })
        .catch(error => console.error("Error fetching the product data:", error));

    // Toggle the Add Product Form
    const addProductBtn = document.getElementById("addProductBtn");
    const addProductForm = document.getElementById("addProductForm");

    addProductBtn.addEventListener("click", () => {
        addProductForm.style.display = addProductForm.style.display === "none" ? "block" : "none";
    });

    // Handle new product form submission
    const newProductForm = document.getElementById("newProductForm");

    newProductForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const formData = new FormData(newProductForm);

        fetch("add_product.php", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Product added successfully!");
                location.reload(); // Reload the page to display the new product
            } else {
                alert("Error adding product: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error adding product:", error);
        });
    });
});






  document.addEventListener("DOMContentLoaded", () => {
    // Toggle the Add Product Form
    const addProductBtn = document.getElementById("addProductBtn");
    const addProductForm = document.getElementById("addProductForm");

    addProductBtn.addEventListener("click", () => {
        addProductForm.style.display = addProductForm.style.display === "none" ? "block" : "none";
    });

    // Handle new product form submission
    const newProductForm = document.getElementById("newProductForm");

    newProductForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const formData = new FormData(newProductForm);

        fetch("add_product.php", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Product added successfully!");
                location.reload(); // Reload the page to display the new product
            } else {
                alert("Error adding product: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error adding product:", error);
        });
    });
});




  //clock
  function updateClock() {
    const clockElements = document.querySelectorAll(".clock");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    clockElements.forEach((clockElement) => {
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    });
  }

  setInterval(updateClock, 1000); // Update the clock every second
  updateClock(); // Initial call to display the clock immediately
});

//pop up message on cards
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("myModal");
  var modalContent = document.getElementById("modalContent");
  var modalImage = document.getElementById("modalImage"); // Add this line to get the modal image container

  // Function to open the modal and display product information
  function openModal(productInfo, imageUrl) {
    modal.style.display = "block";
    modalContent.innerHTML = productInfo;
    modalImage.innerHTML = "<img src='" + imageUrl + "' alt='Product Image'>";
  }

  // Function to close the modal
  function closeModal() {
    modal.style.display = "none";
  }

  // Close the modal when clicking outside the modal content
  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  // Close the modal when pressing the escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // Attach click event listener to each product card
  var productCards = document.querySelectorAll(".card");
  productCards.forEach(function (card) {
    card.addEventListener("click", function () {
      var productInfo = this.querySelector(".sci").innerHTML;
      var imageUrl = this.querySelector(".imgBx img").src;
      openModal(productInfo, imageUrl);
    });
  });
});

//combo box state
document.addEventListener("DOMContentLoaded", function () {
  var states = [
    "Johor", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang",
    "Perak", "Perlis", "Penang", "Sabah", "Sarawak", "Selangor", "Terengganu",
    "Wilayah Persekutuan Kuala Lumpur", "Wilayah Persekutuan Labuan",
    "Wilayah Persekutuan Putrajaya"
  ];

  var stateInput = document.getElementById("stateInput");
  var datalist = document.createElement("datalist");
  datalist.id = "states";

  states.forEach(function (state) {
    var option = document.createElement("option");
    option.value = state;
    datalist.appendChild(option);
  });

  stateInput.setAttribute("list", "states");
  stateInput.parentNode.appendChild(datalist);

  // Initialize Select2 on the state input field
  $("#stateInput").select2({
    placeholder: "Select a state",
    width: "100%",
    theme: "bootstrap4",
    dropdownAutoWidth: true,
    data: states.map(function (state) {
      return { id: state, text: state };
    }),
    matcher: function (params, data) {
      // If there are no search terms, return all options
      if ($.trim(params.term) === "") {
        return data;
      }

      // Check if the option starts with the search term
      if (data.text.toUpperCase().indexOf(params.term.toUpperCase()) === 0) {
        return data;
      }

      // If the option does not match, do not include it
      return null;
    },
  });
});
