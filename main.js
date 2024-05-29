document.addEventListener('DOMContentLoaded', function() {
    
    let productData = null;
    let productDetail = null;

    // Function to display products
    function addProduct() {
        let productlistHTML = document.querySelector('.products');
        if (productlistHTML) {
            productlistHTML.innerHTML = ''; 
            if (productData != null) {
                productData.forEach(product => {
                    let productDiv = document.createElement('div');
                    productDiv.className = 'wrapper';
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
                });

                document.querySelectorAll('.container').forEach(container => {
                    container.addEventListener('click', function() {
                        let productId = this.getAttribute('data-id');
                        window.location.href = '/detail.html?id=' + productId;
                    });
                });
            }
        }
    }

    // Function to display product detail
    function showDetail() {
        let detailHTML = document.querySelector('.product_detail');
        if (detailHTML) {
            detailHTML.innerHTML = ''; 
    
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
    
            const product = productDetail.find(p => p.id == productId);
    
            if (product) {
                let nutritionHtml = '';
                if (product.nutrition_facts) {
                    const nf = product.nutrition_facts;
                    nutritionHtml = `
                        <table>
                            <tr><th colspan="2">Nutrition Facts</th></tr>
                            <tr><td style = "padding-right:100px;">Ingredients</td><td>${nf.ingredients.join(', ')}</td></tr>
                            <tr><td>Serving Size</td><td>${nf.serving_size}</td></tr>
                            <tr><td>Calories</td><td>${nf.calories}</td></tr>
                            <tr><td>Total Fat</td><td>${nf.total_fat.value}g (${nf.total_fat.percent}%)</td></tr>
                            <tr><td>Cholesterol</td><td>${nf.cholesterol.value}mg (${nf.cholesterol.percent}%)</td></tr>
                            <tr><td>Sodium</td><td>${nf.sodium.value}mg (${nf.sodium.percent}%)</td></tr>
                            <tr><td>Total Carbohydrate</td><td>${nf.total_carbohydrate.value}g (${nf.total_carbohydrate.percent}%)</td></tr>
                            <tr><td>Sugars</td><td>${nf.sugars.value}g</td></tr>
                            <tr><td>Protein</td><td>${nf.protein.value}g</td></tr>
                        </table>
                    `;
                }
    
                let detailDiv = document.createElement('div');
                detailDiv.className = 'card';
                detailDiv.innerHTML = `
                <div class="imgBx">
                    <img src="${product.image}" alt="Product Image">
                </div>
                <div class="details">
                    <div class="content">
                        <div class="description">
                            <h2>${product.name}<br></h2>
                            <p>${product.description}</p>
                            <p>${nutritionHtml}</p>
                        </div>
                        <div class = "purchase">
                        <h3>${product.price}</h3>
                        <button>Add to Cart</button>
                        </div>
                    </div>
                </div>
                `;
                detailHTML.appendChild(detailDiv);
    
            } else {
                console.error('Product not found');
            }
        } else {
            console.error('Product detail not found');
        }
    }
    

    // Fetch product data 
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Invalid data format');
            }
            productData = data;
            productDetail = data;
            addProduct();

            if (window.location.pathname.endsWith('detail.html')) {
                showDetail();
            }
        })
        .catch(error => console.error('Error fetching the product data:', error));

    // FAQ Accordions
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        const question = accordion.querySelector('.question');
        const arrow = accordion.querySelector('.arrow');
        const answer = accordion.querySelector('.answer');

        question.addEventListener('click', () => {
            const isActive = accordion.classList.contains('active');

            accordions.forEach(acc => {
                acc.classList.remove('active');
                acc.querySelector('.arrow').classList.remove('active');
                acc.querySelector('.answer').style.maxHeight = null;
            });

            if (!isActive) {
                accordion.classList.add('active');
                arrow.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                accordion.classList.remove('active');
                arrow.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });

    // Checkout Page 
    window.togglePaymentForm = function(formId) {
        const forms = ['card-form', 'ewallet-form'];
        forms.forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        document.getElementById(formId).classList.remove('hidden');
    }

});
