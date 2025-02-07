const webhookURL = "YOUR_DISCORD_WEBHOOK_URL"; // Replace with your Discord webhook URL

function openGift(giftNumber, giftElement) {
    const images = {
        1: "okay.jpg",
        2: "NOO.jpg",
        3: "photo3.jpg"
    };

    const imageUrl = images[giftNumber];

    // Add boom animation to the clicked gift
    giftElement.classList.add("boom");

    // Wait for the boom animation to finish before showing the photo
    setTimeout(() => {
        const fullscreen = document.getElementById("fullscreen");
        const giftImage = document.getElementById("giftImage");
        giftImage.src = imageUrl;
        fullscreen.style.display = "flex";

        // Send the photo to Discord webhook
        sendToDiscord(imageUrl);
    }, 600); // Match this with the animation duration
}

function closeGift() {
    document.getElementById("fullscreen").style.display = "none";
}

function sendToDiscord(imageUrl) {
    const data = {
        content: "🎁 A gift has been opened!",
        embeds: [
            {
                title: "Gift Opened!",
                image: {
                    url: imageUrl
                }
            }
        ]
    };

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log("Gift sent to Discord!");
        } else {
            console.error("Failed to send to Discord.");
        }
    })
    .catch(error => console.error("Error:", error));
}
