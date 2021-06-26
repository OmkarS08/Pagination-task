// get table data from parsing external JSON filedata
let jsondata = JSON.parse(data);
console.log(jsondata);

for (let i = 0; i < jsondata.length; i++) {
    console.log(jsondata[i].id, jsondata[i].name, jsondata[i].Email)
}
/****HTML ELEMENT CREATION******/
//header
const header = document.createElement("header")
const heading1 = document.createElement("h1")
heading1.innerText = "UserData";
header.append(heading1);
document.body.append(header);

//main

//selectoption

const div1 = document.createElement('div');
div1.setAttribute("class", "div1");
const label = document.createElement('label');
label.innerHTML = " Elemets/Page:  ";
const select = document.createElement('select');
select.setAttribute("class", "dataperpage");
select.innerHTML = `
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>`;
label.append(select);
div1.append(label);
document.body.append(div1);

//table

const div2 = document.createElement('div');
div2.setAttribute("class", "table");
div2.innerHTML = `<table>
<thead>
    <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>E-MAILID</th>
    </tr>
</thead>
<tbody></tbody>
</table>`;
document.body.append(div2);

//pagination

const div3 = document.createElement('div');
div3.setAttribute("class", "pagination");
document.body.append(div3);
const ul = document.createElement('ul');
div3.append(ul);

/*********************************************** */

//javascript functioning

//select option

let totalpages = Math.ceil(jsondata.length / 5)
let page = 1;
select.onchange = function() {
    let dataperpage = Math.ceil(jsondata.length / parseInt(select.value))
    Paginationfun(dataperpage, 1);
}

Paginationfun(totalpages, page);

//function declaration
function Paginationfun(totalpages, page) {
    let liTag = '';
    let active;
    let beforepage = page - 2;
    let afterpage = page + 2;

    if (page > 1) {
        liTag += `<li class="first btn"onclick="Paginationfun(${totalpages},${1})">First</li>
    <li class="prev btn"onclick="Paginationfun(${totalpages},${page-1})">Prev</li>`

    }
    if (page == 1) {
        beforepage = 1;
        afterpage = 5;
    } else if (page == 2) {
        beforepage = 1;
        afterpage = 5;
    }
    if (page == totalpages) {
        beforepage = totalpages - 4;
        afterpage = totalpages
    } else if (page == totalpages - 1) {
        beforepage = totalpages - 4;
        afterpage = totalpages;
    }
    // this if loop initialize total of number buttons if pages are greater than or =5

    if (totalpages < 5) {
        beforepage = 1;
        afterpage = totalpages;
    }
    // this if loop initialize total of number buttons if pages are less than 5

    for (let pLen = beforepage; pLen <= afterpage; pLen++) {
        if (page === pLen) {
            active = "active";
        } else {
            active = "";
        }

        liTag += `<li class="number ${active}" onclick="Paginationfun(${totalpages}, ${pLen})">${pLen}</li>`
    } // this for loop creates the number buttons. 

    if (page < totalpages) {
        liTag += ` <li class="next btn" onclick="Paginationfun( ${totalpages}, ${page + 1})">Next</li>
    <li class="last btn" onclick="Paginationfun( ${totalpages}, ${totalpages})">Last</li>`
    } // this if statement create last and next button only when current page moves away from last page

    console.log(totalpages, page);


    //addding row elements to the table
    document.querySelector("tbody").innerHTML = "";
    let dataperpage = document.querySelector('.dataperpage').value;
    let rowfirst = page * (parseInt(dataperpage)) - (parseInt(dataperpage));
    let rowlast = rowfirst + (+dataperpage);
    try {
        //accesiing from the json obj with forloop
        for (let i = rowfirst; i < rowlast; i++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${jsondata[i].id}</td>
                <td>${jsondata[i].name}</td>
                <td>${jsondata[i].Email}</td>`;
            document.querySelector("tbody").append(tr);

        }

    } catch (err) {
        console.log("JSON DAtA ENDED")
    }
    //catch is used to justify error if it is undefined
    ul.innerHTML = liTag
}
//end of paginationfun() function

/**************************************** */