<!DOCTYPE html>
<html lang="en">
<head>
    <title>Product Page</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/detailstyle.css">
    <link rel="stylesheet" href="/css/sharedstyle.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"></script>
</head>
<body>
    <div id="trailer"></div>
    <!-- Navigation bar -->
    <div class="container-fluid header-container">
        <nav class="navbar navbar-expand-md navbar-light">
            <div class="brand">
                <h1>Spreads</h1>
                <img class="icon" src="/img/logo.png" alt="jar icon">
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="main-navigation">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="product.html" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Products</a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="product.html">Peanut Butter</a>
                            <a class="dropdown-item" href="product.html">Almond Butter</a>
                            <a class="dropdown-item" href="product.html">Pistachio Butter</a>
                            <a class="dropdown-item" href="product.html">Cashew Butter</a>
                            <a class="dropdown-item" href="product.html">Gift Set</a>
                        </div>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="faq.html">FAQs</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact-us">Contact Us</a></li>
                    <li class="nav-item"><a class="cart" href="cart.html"><img src="/img/cart.png" class="avatar"></a></li>
                    <li class="nav-item"><a class="user" href="login.html"><img src="/img/user.png" class="avatar"></a></li>
                </ul>
            </div>
        </nav>
    </div>
    <!-- Product Detail -->
    <div class="container product_detail">
        <?php
        $servername = "localhost:3306";
        $username = "root";
        $password = "";
        $dbname = "sse3308";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Get the product ID from the URL
        $productId = isset($_GET['id']) ? intval($_GET['id']) : 0;

        if ($productId > 0) {
            // Fetch product details from the database
            $sql = "SELECT * FROM product_info WHERE id = $productId";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $product = $result->fetch_assoc();

                $detailHtml = "
                <div class=\"card\">
                    <div class=\"imgBx\">
                        <img src=\"" . htmlspecialchars($product['image']) . "\" alt=\"Product Image\">
                    </div>
                    <div class=\"details\">
                        <div class=\"content\">
                            <div class=\"description\">
                                <h2>" . htmlspecialchars($product['name']) . "<br></h2>
                                <p>" . htmlspecialchars($product['description']) . "</p>";

                // Check if ingredients are not empty
                if (!empty($product['ingredients'])) {
                    $detailHtml .= "
                                <table>
                                    <tr><th colspan=\"2\">Nutrition Facts</th></tr>
                                    <tr><td>Ingredients</td><td>" . htmlspecialchars($product['ingredients']) . "</td></tr>
                                    <tr><td>Serving size</td><td>" . htmlspecialchars($product['serving_size']) . "</td></tr>
                                    <tr><td>Calories</td><td>" . htmlspecialchars($product['calories']) . "</td></tr>
                                    <tr><td>Total Fat</td><td>" . htmlspecialchars($product['total_fat_value']) . "g (" . htmlspecialchars($product['total_fat_percent']) . "%)</td></tr>
                                    <tr><td>Cholesterol</td><td>" . htmlspecialchars($product['cholesterol_value']) . "mg (" . htmlspecialchars($product['cholesterol_percent']) . "%)</td></tr>
                                    <tr><td>Sodium</td><td>" . htmlspecialchars($product['sodium_value']) . "mg (" . htmlspecialchars($product['sodium_percent']) . "%)</td></tr>
                                    <tr><td>Total Carbohydrate</td><td>" . htmlspecialchars($product['total_carbohydrate_value']) . "g (" . htmlspecialchars($product['total_carbohydrate_percent']) . "%)</td></tr>
                                    <tr><td>Sugars</td><td>" . htmlspecialchars($product['sugars_value']) . "g</td></tr>
                                    <tr><td>Protein</td><td>" . htmlspecialchars($product['protein_value']) . "g</td></tr>
                                </table>";
                }

                $detailHtml .= "
                                <div class=\"purchase\">
                                    <h3>" . htmlspecialchars($product['price']) . "</h3>
                                    <button id=\"addToCartButton\" onclick = 'showDialog()'>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";

                echo $detailHtml;
            } else {
                echo "<p>Product not found</p>";
            }
        } else {
            echo "<p>Invalid product ID</p>";
        }

        $conn->close();
        ?>
    </div>
    
    <!-- Dialog Box -->
    <div id="dialogOverlay" class="dialog-overlay" style="display: none;"></div>
    <div id="dialogBox" class="dialog-box" style="display: none;">
        <div class="dialog-content">
            <p>The item was successfully added to your cart!</p>
            <button id="viewCartButton">View Cart</button>
            <button id="checkoutButton">Checkout</button>
        </div>
    </div>

    <!-- Contact form & Footer -->
    <footer class="bg-body-tertiary text-lg-start" style="background-color: #f1e2c5">
        <div class="row">
            <div class="col-8">
                <form class="contact-form" method="post" action="post_message.php" id="contact">
                    <div class="form-title">
                        <h5 id="contact-us">CONTACT</h5>
                        <h6>US</h6>
                    </div>
                    <div class="form-body-item">                      
                        <div class="form-group">
                            <input type="text" id="name" class="input" placeholder="NAME" name="username" required>
                            <input type="email" id="email" class="input" placeholder="EMAIL" name="email" required>
                            <input type="text" id="message" class="input" placeholder="MESSAGE" name="message" required>
                            <button type="submit" form="contact" value="Submit">Send</button>
                        </div>
                    </div>
                </form>
                <div class="copyright text-center">
                    © 2024 Copyright:
                    <a class="text-body" href="index.html">Spreads.com</a>
                </div>
            </div>
            <div class="col-4">
                <img src="/img/form-image.png" alt="spreads image">
            </div>
        </div>
    </footer>
    <script src="main.js"></script>
</body>
</html>
