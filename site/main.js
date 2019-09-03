// Convenience for requests
let HttpClient = function() {
    this.get = function(url, callback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() { 
            if (request.readyState == 4 && request.status == 200)
                callback(request.responseText);
        }

        request.open("GET", url, true);            
        request.send(null);
    }
}
let client = new HttpClient();

// Get and parse repo readme
readme = client.get("https://raw.githubusercontent.com/marier-nico/arch-build/master/README.md", function(response) {
    document.getElementById("github-readme").innerHTML = marked(response)
})

// Get files in s3
client.get("https://aur-nmarier-com.s3.amazonaws.com/?list-type=2", function(response) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(response, "text/xml");

    prefix = "packages/x86_64/"
    objs = xmlDoc.getElementsByTagName("Contents");
    fileList = document.getElementById("file-list");
    files = [...objs].map(o => o.childNodes[0].textContent)
                     .filter(n => n.startsWith(prefix))
                     .filter(n => n !== prefix)
                     .map(n => n.replace(prefix, ""));

    for (file of files) {
        let li = document.createElement("li");
        li.innerText = file
        fileList.append(li)
    }
});