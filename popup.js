document.addEventListener('DOMContentLoaded', (event) => {
    var changeColor = document.querySelector("#changeColor");
    chrome.storage.sync.get("color", ({ color }) => {
        changeColor.style.backgroundColor = color;
    });

    changeColor.addEventListener("click", async() => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageBackgroundColor,
        });
    });

    // The body of this function will be executed as a content script inside the
    // current page
    function setPageBackgroundColor() {
        chrome.storage.sync.get("color", ({ color }) => {
            var sidebar = document.getElementsByClassName("_2Ts6i _3RGKj")[1];
            if (sidebar.style.display == "none") {
                sidebar.style.display = "block";
            } else {
                sidebar.style.display = "none";
            }
        });
    }
});
