const clickFunc = async () => {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const elemArr = document.getElementsByTagName("*");
    console.log("here",elemArr)
    Array.from(elemArr).forEach(element => {
        try{
            var intext = element.innerText;
            if(intext && intext != "" && [...element.childNodes]
            .some(n => n.nodeType === Node.TEXT_NODE
                  && n.nodeValue.trim() !== '')){
                console.log(intext);
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    var activeTab = tabs[0];
                    chrome.runtime.sendMessage({ type: 'translate', tabId: activeTab.id, text : intext , from , to }, function (response) {
                        console.log('Received response from background script:', response);
                        if(response){
                            element.innerText = response
                        }
                    });
                });
            }
        } catch(err){
            console.log(err);
        }
    })
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     var activeTab = tabs[0];

    //     chrome.runtime.sendMessage({ type: 'getActiveTabDOM', tabId: activeTab.id }, function (response) {
    //         console.log('Received response from background script:', response);
    //     });
    // });
    

}

// Add an event listener to the button
document.getElementById('translateButton').addEventListener('click', clickFunc);
