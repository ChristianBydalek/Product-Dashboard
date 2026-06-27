const URL = "https://www.course-api.com/javascript-store-products";

// fetchProductsThen() function for Step 3
function fetchProductsThen() {
    fetch(URL)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((p) => {
            if (p?.fields?.name) {
                console.log(p.fields.name);
            }
        });
    })
    .catch((err) => {
        console.error("Fetch failed", err);
    });
}

// fetchProductsAsync() for Step 4
async function fetchProductsAsync() {
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        displayProducts(data);
    } catch (err) {
        handleError(err);
    }
}

// displayProducts(products) for Step 5
function displayProducts(products) {
    const container = document.getElementById("product-container");
    if (!container) return;

    products.slice(0,5).forEach((p) => {
        const { name, price, image } = p.fields ?? {};
        const imgUrl = Array.isArray(image) && image[0]?.url ? image[0].url : "";
        const dollars = typeof price === "number" ? (price / 100).toFixed(2) : "-";

        const card = document.createElement("article");
        card.className = "product-card";
        card.innerHTML = `
        <img src="${imgUrl}" alt="${name ?? "Product Image"}" loading="lazy" />
        <div class ="card-body">
            <h3>${name ?? "Unknown Product"}</h3>
            <p>$${dollars}</p>
        </div>
        `;
        container.appendChild(card);
    });

    if (container.children.length === 0) {
        const status = document.createElement("div");
        status.className = "status";
        status.textContent = "No products available.";
        container.appendChild(status);
    }
}

// handleError(error) for Step 6
function handleError(error) {
    console.error("An error occured:", error.message);
    const container = document.getElementById("product-container");
    container.innerHTML = `
    <div class="status error">Error loading products. Please try againa later.</div>
    `;
}

// Calls both functions
fetchProductsThen();
fetchProductsAsync();