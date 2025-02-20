let searchResults = []

$("#form").submit(function(e){
    e.preventDefault()

    var query = $("#search").val()

    let result = ''
    
    let apiKey = "AIzaSyAexqF1IHx92CL0oR6ynYYIXdMpuRYhKXo";
    let cx = "e1ce37b10d7ae4c77"; 
    let url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                
                searchResults = data.items

                let output = "<ul>";

                data.items.forEach(item => {
                    output += `<li><a href="${item.link}" target="_blank">${item.title}</a><br>${item.snippet}</li>`;
                });

                output += "</ul>";

                document.getElementById("results").innerHTML = output;

                let saveBtn = document.getElementById("save")
                saveBtn.style.display = "block"
            })            
            .catch(error => console.error("Error:", error));    
 })

 function saveAsCSV() {
    if (searchResults.length === 0) {
        alert("The is nothing to save");
        return;
    }

    let csvContent = "Title,Link,Snippet\n";
    searchResults.forEach(item => {
        let row = `"${item.title.replace(/"/g, '""')}","${item.link}","${item.snippet.replace(/"/g, '""')}"`;
        csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "search_results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
