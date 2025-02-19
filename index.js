let searchResults = []

$("#form").submit(function(e){
    e.preventDefault()

    var query = $("#search").val()

    let result = ''

    var API_KEY = 'eaa855e42757a7e1cc239caf19495d89'

    var url = 'http://api.serpstack.com/search?access_key=' + API_KEY + '&type=web&query=' + query

    
    $.get(url, function (data) {

        $("#result").html ('')
        console.log(data)

        searchResults = data.organic_results

        data.organic_results.forEach(res => {

            result = `
                <h1>${res.title}</h1><br><a target="_blank" href="${res.url}">${res.url}</a>
                <p>${res.snippet}</p>

            `

            $("#result").append(result)           
            
        });
    })
    
    let saveBtn = document.getElementById("save")

    saveBtn.style.display = "block"
 })

 function saveAsCSV() {
    if (searchResults.length === 0) {
        alert("The is nothimg to save");
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