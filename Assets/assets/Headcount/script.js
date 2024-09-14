// script.js
document.getElementById('fetchButton').addEventListener('click', async function() {
    const identifier = document.getElementById('identifier').value;
    if (!identifier) {
        alert('Please enter an identifier.');
        return;
    }

    try {
        const response = await fetch(`/fetch_requirements?identifier=${encodeURIComponent(identifier)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        document.getElementById('requirements').value = data.requirements || 'No requirements found.';
    } catch (error) {
        console.error('Error fetching requirements:', error);
        document.getElementById('requirements').value = 'Error fetching requirements.';
    }
});

document.getElementById('submitButton').addEventListener('click', async function() {
    const identifier = document.getElementById('identifier').value;
    const changes = document.getElementById('changes').value;

    if (!identifier) {
        alert('Please enter an identifier.');
        return;
    }

    if (!changes) {
        alert('Please enter changes.');
        return;
    }

    try {
        const response = await fetch('/submit_changes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier, changes }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const result = await response.json();
        alert(result.message || 'Changes submitted successfully.');
    } catch (error) {
        console.error('Error submitting changes:', error);
        alert('Error submitting changes.');
    }
});
