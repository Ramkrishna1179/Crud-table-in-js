let table = document.getElementsByTagName("table")[0];
let sn;
let SN = 1;
let new_arr = [];
let arr = JSON.parse(localStorage.getItem("data")) || [];
let selectedRow = null;
let form = document.querySelector("#btn");
form.addEventListener("click", formsubmit);
function formsubmit() {
  let x = catchdata();
  if (x.email === undefined || x.contact === undefined) {
    alert("Please enter a valid email address and contact number");
  } else {
    if (selectedRow == null) {
      append(x);
      // createSr_No();
      do_empty_form_fields();
    } else {
      updatefunc(x);
      do_empty_form_fields();
      selectedRow = null;
    }
  }
}
function catchdata() {
  let obj = {};
  let x = document.querySelector("#email").value;
  let y = document.querySelector("#contact").value;
  let a = document.querySelector("#lname").value;
  let b = document.querySelector("#fname").value;
  var c = document.getElementsByName("gender");
  console.log(c);
  // let c = document.querySelector("#gender").value;
  function check(a, b, c, x, y) {
    let obj = {};
    if (x == "") {
      alert("Please input email address");
    } else if (x.indexOf("@") <= 0) {
      alert("Please enter @ in email field");
    } else if (
      x.charAt(x.length - 4) !== "." &&
      x.charAt(x.length - 3) !== "."
    ) {
      alert("Please enter a valid . input");
    } else if (x.includes("gmail") !== true) {
      alert("Please enter a valid email address");
    } else if (y == "") {
      alert("Please input Mobile Number");
    } else if (isNaN(y)) {
      alert("Please input Number Value");
    } else if (y.length < 10) {
      alert("Please input 10 Digit Number");
    } else if (y.length > 10) {
      alert("Please input 10 Digit Number");
    } else if (y.charAt(0) != 9 && y.charAt(0) != 8 && y.charAt(0) != 7) {
      alert("Please Start Your Number with 9, 8, 7");
    } else {
      obj["lname"] = a;
      obj["name"] = b;
      function displayRadioValue(c) {
        for (i = 0; i < c.length; i++) {
          if (c[i].checked) {
            return c[i].value;
          }
          else{
           return c[i] = "";
          }
        }
      }
      let g = displayRadioValue(c);
      obj["gender"] = g;
      obj["email"] = x;
      obj["contact"] = y;
    }
    arr.push(obj);
    localStorage.setItem("data", JSON.stringify(arr));
    return obj;
  }
  // obj["lname"] = a;
  // obj["name"] = b;
  // function displayRadioValue(c) {
  //   for (i = 0; i < c.length; i++) {
  //     if (c[i].checked) {
  //       return c[i].value;
  //     }
  //   }
  // }
  // let g = displayRadioValue(c);
  // obj["gender"] = g;
  // obj["email"] = x;
  // obj["contact"] = y;
  return check(a, b, c, x, y);
  // return obj;
}
function append(x) {
  let tbody = document.getElementsByTagName("tbody")[0];
  let tr = document.createElement("tr");
  tr.setAttribute("id", "tr");
  tr.setAttribute("draggable", "true");
  tr.setAttribute("ondragstart", "start()");
  tr.setAttribute("ondragover", "dragover()");

  let sn = document.createElement("td");
  sn.innerHTML = table.rows.length;
  let a = document.getElementById("div");
  h = document.createElement("p");
  h.setAttribute("id", SN++);
  h.innerHTML = table.rows.length;
  a.append(h);

  sn.setAttribute("class", "disp_none");
  let cc = document.createElement("td");
  cb = document.createElement("input");
  cb.value = table.rows.length;
  cb.addEventListener("click", (event) => {
    // debugger
    let a = event.target.value;
    a = Number(a);
    new_arr.push(a);
    // console.log(new_arr)
  });
  cb.setAttribute("type", "checkbox");
  cb.setAttribute("id", "c");

  let td1 = document.createElement("td");
  td1.innerText = x.name;

  let td2 = document.createElement("td");
  td2.innerText = x.lname;

  let td21 = document.createElement("td");
  td21.innerText = x.gender;

  let td3 = document.createElement("td");
  td3.innerText = x.email;

  let td4 = document.createElement("td");
  td4.innerText = x.contact;
  td4.setAttribute("id", "td4");

  let td5 = document.createElement("td");
  td5.setAttribute("class", "td5");

  let btn = document.createElement("button");
  btn.innerHTML = '<a class="dlt" onClick="onDelete(this)">Delete</a>';
  btn.setAttribute("id", "dltbtn");

  let td6 = document.createElement("td");
  td6.setAttribute("class", "td5");
  let ubtn = document.createElement("button");
  ubtn.innerHTML = '<a class="edt" onClick="onEdit(this)">Edit</a>';
  ubtn.setAttribute("data-bs-toggle", "modal");
  ubtn.setAttribute("data-bs-target", "#myModal");
  ubtn.setAttribute("id", "ubtn");

  td5.append(btn);
  td6.append(ubtn);
  tr.append(sn, cc, cb, td1, td2, td21, td3, td4, td5, td6);
  tbody.append(tr);
}

function do_empty_form_fields() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementsByClassName(".gender").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contact").value = "";
  document.getElementById("message_text").value = "";
}

function onDelete(y) {
  if (confirm("Are you sure to delete this record ?")) {
    n =
      y.parentElement.parentElement.parentElement.parentElement.parentElement
        .parentElement.previousElementSibling.firstElementChild
        .childElementCount;
    // n holds the the count of serial number present in the table
    let m = y.parentElement.parentElement.parentElement.firstChild.innerHTML;
    // m is the inner html of the rows first td which is hiden sn
    m = Number(m);
    for (let q = 1; q <= n; q++) {
      if (q === m) {
        console.log(n, m);
        let d =
          y.parentElement.parentElement.parentElement.parentElement
            .parentElement.parentElement.previousElementSibling
            .firstElementChild.children[q - 1];
        d.innerHTML = "";
        selectdelete = y.parentElement.parentElement.parentElement.remove(0);
        // console.log(q,m,d,selectdelete);
      }
    }
  }
}
function onEdit(y) {
  let up_btn = document.getElementById("btn");
  // up_btn.innerText = "Save Changes";
  var selecteventbtn = document.querySelector("a.edt");
  selectedRow = y.parentElement.parentElement.parentElement;
  // console.log(selectedRow);
  document.getElementById("fname").value = selectedRow.cells[2].innerHTML;
  document.getElementById("lname").value = selectedRow.cells[3].innerHTML;
  document.getElementsByClassName(".gender").value =
    selectedRow.cells[4].innerHTML;
  document.getElementById("email").value = selectedRow.cells[5].innerHTML;
  document.getElementById("contact").value = selectedRow.cells[6].innerHTML;
  up_btn.innerText = "Submit";
}
function updatefunc(x) {
  selectedRow.cells[2].innerHTML = x.name;
  selectedRow.cells[3].innerHTML = x.lname;
  selectedRow.cells[4].innerHTML = x.gender;
  selectedRow.cells[5].innerHTML = x.email;
  selectedRow.cells[6].innerHTML = x.contact;
}
let row;
function start() {
  row = event.target;
}
function dragover() {
  let e = event;
  e.preventDefault();
  let children = Array.from(e.target.parentNode.parentNode.children);
  if (children.indexOf(e.target.parentNode) > children.indexOf(row)) {
    e.target.parentNode.after(row);
  } else {
    e.target.parentNode.before(row);
  }
}
let remove = document.getElementById("multiple");
$("#multiple").on("click", function () {
  y =
    remove.parentElement.previousElementSibling.firstElementChild
      .childElementCount;
  // y holds the count of the child elements
  for (let a = 0; a < new_arr.length; a++) {
    for (let b = 1; b <= y; b++) {
      if (new_arr[a] == b) {
        console.log(new_arr[a], b);
        remove.parentElement.previousElementSibling.firstElementChild.children[
          new_arr[a] - 1
        ].innerHTML = "";
      }
    }
  }
  $("input:checked").not(".all").parents("tr").remove();
});
$(".all").on("click", function () {
  var $inputs = $("table").find("input");
  $inputs.prop("checked", "checked");
});

// function delete_S_N(y) {
//   x = y.parentElement.previousElementSibling.children;
//   console.log(x);
//   x.innerHTML = null;
// }

function search() {
  let filter = document.getElementById("search").value.toUpperCase();
  //  console.log(filter);
  let mytable = document.getElementsByTagName("table")[0];
  // console.log(mytable);
  let tr = mytable.getElementsByTagName("tr");
  // console.log(tr);
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[2];
    // let td1 = tr[i].getElementsByTagName("td")[4];
    if (td) {
      let tvalue = td.textContent;
      if (tvalue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  // || td.innerHTML
  // let s_earch = document.getElementById("search");
  // let tr = document.querySelectorAll("tbody tr");
  // console.log(tr)
  // let value = s_earch.value.toLowerCase();
  // console.log(value )
  // tr.forEach((row)=>{
  //   row.querySelector("td").textContent.toLowerCase().startsWith(value)
  //   ? (row.style.display="table-row")
  //   :(row.style.display="none")
  // });
}


// var wage = document.getElementById("message_text");
// wage.addEventListener("keydown", function (e) {
//     if (e.keyCode === 13) {
//       alert("jiyo lallla")
//     }
// });
// function validate(){
  
// }