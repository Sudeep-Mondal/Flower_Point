document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3001/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store token and redirect to dashboard
            localStorage.setItem("adminToken", data.token);
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("error-message").textContent = data.message;
        }
    } catch (error) {
        console.error("Login failed:", error);
    }
});
