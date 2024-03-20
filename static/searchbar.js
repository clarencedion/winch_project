function searchbar() {
    var input, filter, container, company, name, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    container = document.getElementsByClassName("container")[0];
    company = container.getElementsByClassName("company");

    for (i = 0; i < company.length; i++) {
        name = company[i].getElementsByClassName("name")[0];
        txtValue = name.textContent || name.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            company[i].style.display = "";
        } else {
            company[i].style.display = "none";
        }
    }
}
