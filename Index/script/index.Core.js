function contactUsWindow() {
    document.getElementById('contactUsWindow').style.display = 'block';
}
function contactUs() {
    const bugOrComment = document.getElementById('bugOrCommentSelect').value;
    let text = document.getElementById('commentBox').value.trim();

    if (!text) {
        alert("Please enter a message.");
        return;
    }

    text = bugOrComment === "bug" ? "🐞 Bug Report: " + text : "💬 Comment: " + text;

    fetch('/api/send-discord.php', { // oder send-discord.js falls du Node nutzt
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('commentBox').value = "Your message is being sent...";
            setTimeout(() => {
                document.getElementById('commentBox').value = "Your message was sent!";
            }, 1000);
            setTimeout(() => {
                document.getElementById('contactUsWindow').style.display = 'none';
                document.getElementById('commentBox').value = "";
            }, 5000);
        } else {
            alert("Server error. Message not sent.");
        }
    })
    .catch(err => {
        alert("Error: " + err.message);
    });
}
