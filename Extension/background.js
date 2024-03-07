// background.js

// Listen for messages from content scripts or other parts of the extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'getActiveTabDOM') {
        // Access the DOM of the active tab
        chrome.scripting.executeScript({
            target: { tabId: request.tabId },
            function: () => document.body.innerHTML
        }, function (result) {
            // Send the DOM content back to the content script
            sendResponse({ domContent: result[0] });
        });

        // Return true to indicate that the response will be sent asynchronously
        return true;
    }
});


chrome.runtime.onMessage.addListener( function (request, sender, sendResponse) {
    if (request.type === 'translate') {
        chrome.scripting.executeScript({
            target: { tabId: request.tabId },
            function: () => document.body.innerHTML
        },  function (result) {
            const raw = JSON.stringify({
                "languageFrom": request.from,
                "languageTo": request.to,
                "text": [
                    {
                    "source": request.text
                    }
                ]
            });

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: raw,
                redirect: "follow"
            };

            fetch("http://localhost:8080/translate", requestOptions).then(res => {
                return res.json();
            }).then(data =>{
                sendResponse(data.message);
            }).catch(err=>{
                console.log(err)
            })
        });

        // Return true to indicate that the response will be sent asynchronously
        return true;
    }
});
