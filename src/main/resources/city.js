let content = document.getElementById('content')

function showCityHome() {
    let html = `
        <div class="col-12" >
        <h2 style="text-align: center" >Danh sách thanh pho</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddForm()">Thêm mới</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Thanh pho</th>
                  <th scope="col">Quoc gia</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody id="list-city">
               
              </tbody>
            </table>
        </div>`
    loadListCity();
    content.innerHTML = html
}

function loadListCity(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city",
        success: function (data) {
            let html1 = "";
            for (let i = 0; i < data.length; i++) {
                html1 += `<tr><th scope="row">${i+1}</th>
                        
                          <td><a onclick="viewDetail(${data[i].id})">${data[i].name}</a></td>
                          <td>${data[i].country.name}</td>
                          <td><button class="btn btn-outline-secondary mr-2" onclick="showEdit(${data[i].id})">Sửa</button>
                          <Button class="btn btn-outline-danger" onclick="deleteCity(${data[i].id},'${data[i].name}')">Xoá</Button></td></tr>`
            }
            document.getElementById('list-city').innerHTML = html1;
        }, error: function (error) {
            console.log(error);
        }
    })
}

function viewDetail(id){
    $.ajax ({
        type: "GET",
        url: "http://localhost:8080/city/" + id,
        success: function (data) {
            console.log(data)
            let str = `<h1>Thanh pho ${data.name}</h1>
    <button onclick="showCityHome()">Xem danh sach thanh pho</button>
    <p>Ten: ${data.name}</p>
    <p>Quoc gia: ${data.country.name}</p>
    <p>Dien tich: ${data.area}</p>
    <p>Dan so: ${data.population}</p>
    <p>GDP: ${data.gdp}</p>
    <p>Gioi thieu: </p>
    <p>${data.description}</p>
    <button onclick="showEdit(${data.id})">Chinh sua</button>
    <button onclick="deleteCity(${data.id})">Xoa</button>`
            content.innerHTML = str
        }
    })
}

function showAddForm() {
    let html = `
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">     
                        <label>Name:</label>
                        <input type='text'  id="name" class="form-control" placeholder="Name">
                        <label>Quoc gia: </label>
                        <select id="country">`
                            $.ajax({
                                type: "GET",
                                url: "http://localhost:8080/country",
                                success: function (country) {
                                console.log(country);
                                let str = "";
                                for (let i = 0; i < country.length; i++) {
                                str += `<option value="${country[i].id}">${country[i].name}</option>`
                            }
                                document.getElementById('country').innerHTML = str;
                            }
                            })
                        html += `</select>
                        <label>Dien tich:</label>
                        <input type='text' id="area" class="form-control" placeholder="Area">   
                        <label>Dan so:</label>
                        <input type='number' id="population" class="form-control" placeholder="Population"> 
                        <label>GDP:</label>
                        <input type='number' id="gdp" class="form-control" placeholder="GDP"> 
                        <label>Description:</label>
                        <input type='text' id="description" class="form-control" placeholder="Description"> 
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="saveCity()">Save</button>
            </div>
        </div>
    </div>
</div>`
    content.innerHTML = html;
    $('#addModal').modal('show');
}

function saveCity() {
    let name = document.getElementById("name").value;
    let area = document.getElementById('area').value;
    let population = document.getElementById("population").value;
    let gdp = document.getElementById("gdp").value;
    let description = document.getElementById("description").value;
    let countryId = document.getElementById("country").value;
    let city = {
        name: name,
        population: population,
        description: description,
        country: {
            id: countryId
        },
        area: area,
        gdp: gdp
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        ,
        type: "POST",
        url: "http://localhost:8080/city",
        data: JSON.stringify(city),
        success: function (city) {
            console.log(city);
            $('#addModal').modal('hide');
            showCityHome()
        }
    })
}

function showEdit(id) {
    let edit = `
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">     
                         <input type="hidden" id="id">
                        <label>Name:</label>
                        <input type='text'  id="nameEdit" class="form-control">
                        <label>Country:</label>
                        <select id="country">`
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/country",
        success: function (country) {
            console.log(country);
            let str = "";
            for (let i = 0; i < country.length; i++) {
                str += `<option  value="${country[i].id}">${country[i].name}</option>`
            }
            document.getElementById('country').innerHTML = str;
        }

    })
    edit += `</select>
                        <label>Dien tich:</label>
                        <input type='text' id="areaEdit" class="form-control">   
                        <label>Dan so:</label>
                        <input type='text' id="populationEdit" class="form-control"> 
                        <label>GDP:</label>
                        <input type='number' id="gdpEdit" class="form-control"> 
                        <label>Gioi thieu:</label>
                        <input type='text' id="descriptionEdit" class="form-control"> 
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="editProduct()">Save</button>
            </div>
        </div>
    </div>
</div>`
    content.innerHTML = edit;
    $('#editModal').modal('show');
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/" + id,
        success: function (city) {
            document.getElementById("id").value = city.id
            document.getElementById("nameEdit").value = city.name
            document.getElementById("descriptionEdit").value = city.description
            document.getElementById("populationEdit").value = city.population
            document.getElementById("areaEdit").value = city.area
            document.getElementById("gdpEdit").value = city.gdp
            document.getElementById("country").value = city.country
            console.log(city)
        }
    })
}

function editProduct() {
    let id = document.getElementById('id').value;
    let name = document.getElementById("nameEdit").value;
    let description = document.getElementById("descriptionEdit").value;
    let population = document.getElementById("populationEdit").value;
    let area = document.getElementById("areaEdit").value;
    let countryId = document.getElementById("country").value;
    let gdp = document.getElementById("gdpEdit").value;
    let city = {
        name: name,
        population: population,
        description: description,
        country: {
            id: countryId
        },
        area: area,
        gdp: gdp
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/city/' + id,
        data :JSON.stringify(city),
        success: function () {
            $('#editModal').modal('hide');
            showCityHome()
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function deleteCity(id){
    if (confirm("Bạn có chắc chắn muốn xoá thanh pho ko ???")) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/city/'+id,
            success: function (){
                showCityHome()
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
}