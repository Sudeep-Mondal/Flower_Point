const token = localStorage.getItem("adminToken");

// Redirect to login if no token
if (!token) {
    window.location.href = "index.html";
}

// Logout Function
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("adminToken");
    window.location.href = "index.html";
});

async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3001/admin/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Ensure token is passed for authentication
            },
        });

        if (!response.ok) {
            console.error('Error fetching users:', response.statusText);
            return;
        }

        const users = await response.json();

        // Populate the user table
        const userTableBody = document.getElementById('user-table').querySelector('tbody');
        userTableBody.innerHTML = ''; // Clear existing rows

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
}


// Delete User 
async function deleteUser(id) {
    try {
        const response = await fetch(`http://localhost:3001/admin/users/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            fetchUsers(); 
        }
    } catch (error) {
        console.error("Failed to delete user:", error);
    }
}

document.getElementById('add-Product-Form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').value;

    const data = {
        name: productName,
        price: productPrice,
        description: productDescription,
        image_url: productImage,
    };

    try {
        const response = await fetch('http://localhost:3001/admin/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Ensure the token is available
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok) {
            document.getElementById('result').textContent = `Product added successfully! ID: ${responseData.id}`;
            alert("Product added successfully");
        } else {
            document.getElementById('result').textContent = `Error: ${responseData.error || 'Unknown error'}`;
            console.error('Error details:', responseData); 
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'An error occurred while adding the product.';
    }
});


fetchUsers();
