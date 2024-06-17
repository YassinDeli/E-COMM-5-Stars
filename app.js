const CartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");

const CartDOM = document.querySelector(".cart");
const CartOverlay = document.querySelector(".cart-overlay");
const Cartitems = document.querySelector(".cart-items");
const CartOverTotal = document.querySelector(".cart-total");
const CartOverContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// Initialize an empty array to store items added to the cart
let cart = [];

// Getting the products
class Products {
    // Define an asynchronous method to fetch products
    async getProducts() {
        try {
            // Use fetch to get the contents of "products.json"
            let result = await fetch("products.json");
            // Parse the result into a JavaScript object
            let data = await result.json();
            // Extract the 'items' array from the parsed data
            let products = data.items;
            // Map over the products array to extract relevant fields and reformat each product object
            products = products.map(item => {
                // Destructure title and price from item.fields
                const { title, price } = item.fields;
                // Destructure id from item.sys
                const { id } = item.sys;
                // Extract the image URL from the nested object structure
                const image = item.fields.image.fields.file.url;
                // Return a new object with the relevant properties
                return { title, price, id, image };
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// Display products
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <!-- single product -->
            <article class="product">
                <div class="img-container">
                    <img src=${products.image} alt="product" class="product-img" />
                    <button class="bag-btn" data-id=${products.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to bag
                    </button>
                </div>
                <h3>${products.title}</h3>
                <h4>${products.price}</h4>
            </article>
            <!-- end of single product -->
            `;
        });
        productsDOM.innerHTML = result;
    }
}

// Local storage
class Storage {}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // Get all products
    products.getProducts().then(products => ui.displayProducts(products));
});

