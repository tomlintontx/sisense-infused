

$(document).ready(function() {
    $('.js-example-basic-multiple').select2();
});

const buildTable = async () => {
    $('#tablediv').empty();
    $('#tablediv').append("<table id='table1' class='display' height='400px' width='100%'></table>");
    var jaql = getValues();
    debugger;
    values = document.getElementsByClassName('select2-selection__choice')
    vArray = []
    $.each(values, function(index,obj) {
        vArray.push({title: obj.title});
    });
    var myHeaders = new Headers();
    myHeaders.append('Content-Type','application/json');
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWU2MTE2MjI0NzM3NzUwMDJkMzcyMDlkIiwiYXBpU2VjcmV0IjoiN2E4Y2Y2ZGQtNTA0MS1kMDk5LWQwM2ItZjM3OTc2YWEzZTg4IiwiaWF0IjoxNjEyNDE0Njk4fQ.Sc0_wN8fllvXQViUPaUonzK6531SrN6dN4QMCHou1fU");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(jaql)
    };
    let response = await fetch("https://us-demo4.sisense.com/api/datasources/Healthcare%20Model%20-%20New/jaql?skipPermissions=false", requestOptions)
    const myJson = await response.json();
    var table = $('#table1').DataTable( {
        data: myJson.values,
        columns: vArray
    } );
}
function getValues() {
    values = document.getElementsByClassName('select2-selection__choice')
    vArray = []
    $.each(values, function(index,obj) {
        vArray.push(obj.title);
    });
    var jaql = {
        "datasource": "Healthcare Model - New",
        "metadata": []
    };
    $.each(vArray, function(index,obj) {
        debugger;
        jaql.metadata.push(masterFields[obj])
    })
    return jaql;
}
const masterFields = {
    "Visit ID": {
        "dim": "visits.visit_id"
    },
    "Facility Name": {
        "dim": "facilities.fac_name"
    },
    "Provider Name": {
        "dim": "providers.provider_name"
    },
    "Specialty Name": {
        "dim": "specialties.specialty_name"
    },
    "Patient Type Group": {
        "dim": "patient_type.patient_type_group"
    },
    "Patient Type": {
        "dim": "patient_type.patient_type"
    },
    "Payor": {
        "dim": "payors.payor_name"
    },
    "Visits": {
        "dim": "visits.visit_id",
        "agg": "count"
    },
    "Total Charges": {
        "dim": "visits.total_charges",
        "agg": "sum"
    },
    "Total Cost": {
        "dim": "visits.total_cost",
        "agg": "sum"
    }
};