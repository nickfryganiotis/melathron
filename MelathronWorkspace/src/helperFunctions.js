/*Συνάρτηση που παίρνει έναν πίνακα απο JSON, και επιστρέφει έναν πίνακα με ένα attribute αυτόν χωρίς διπλότυπα
Αν καθοριστεί η παράμετρος conditional_attribute επιλέγονται μόνο attributes αντικειμένων 
των οποίων το conditional_attribute είναι ίσο με αυτό του dependence_json αντικειμένου*/
export function makeToUnique(array_of_json, target_attribute, dependence_json ,conditional_attribute) {
  var unique_array = [];
  if (typeof array_of_json === "undefined" || typeof dependence_json === "undefined") {
    return unique_array;
  }
  if (typeof conditional_attribute !== "undefined") {
    array_of_json.forEach((element) => {
      if (
        !unique_array.includes(element[target_attribute]) &&
        dependence_json[conditional_attribute] === element[conditional_attribute]
      ) {
        unique_array.push(element[target_attribute]);
      }
    });
  } else {
    array_of_json.forEach((element) => {
      if (!unique_array.includes(element[target_attribute])) {
        unique_array.push(element[target_attribute]);
      }
    });
  }
  return unique_array;
}

//Συνάρτηση που παίρνει ένα αντικέιμενο και το μετατρέπει σε option για dropdown menu 
export function arrayToOption(item) {
  return <option>{item}</option>;
}

//Συνάρτηση που παίρνει έναν πίνακα/json αντικειμένων και τα εμφανίζει ως στήλες πίνακα (κελιά)
export function mapToRow(elements){
    return elements.map((element) => {
      return <td>{element}</td>;
    });
  };

//Συνάρτηση που παίρνει ένα σύνολο αντικειμένων/πινάκων και εφαρμόζει την mapToRow σε κάθε ένα, εμφανίζοντάς τα ανά γραμμή
export function getJSONValues(table){
    return table.map((item) => {
      const values = Object.values(item);
      return <tr>{mapToRow(values)}</tr>;
    });
  };

//Συνάρτηση που φορτώνει από το local storage την επιλογή του χρήστη για ήπειρο και περιοχή και θέτει μια μεταβλητή ίση με αυτή την επιλογή με την setAreaChoice
export async function loadAreaChoice(setAreaChoice){
  var x = localStorage.getItem('area_choice')
  var y = JSON.parse(x)
  if (typeof(y)!== 'undefined'){
    setAreaChoice(y)
    //return y
  }
}

export function removeDuplicates( arr, prop ) {
  var obj = {};
  for ( var i = 0, len = arr.length; i < len; i++ ){
    if(!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
  }
  var newArr = [];
  for ( var key in obj ) newArr.push(obj[key]);
  return newArr;
}


/*const attributes = [
    "Κωδικός",
    "Όνομα", 
     "Επώνυμο", 
    "Πατρώνυμο", 
    "Επωνυμία Εταιρίας", 
    "Ιστοσελίδα",
    "Email", 
    "Οδός", 
    "Τ.Κ.",
    "Κατηγορία Αποτελέσματος",
    "Αποτέλεσμα",
  ];*/
//<td>{((status[key]) && <MultiComp />)  || ((!status[key]) && cust[key])}</td>
export function greekToEnglish(obj) {
  const dict = {
    "ΟΝΟΜΑ" : "first_name",
    "ΕΠΩΝΥΜΟ" : "last_name",
    "ΠΑΤΡΩΝΥΜΟ" : "fathers_name",
    "ΕΠΩΝΥΜΙΑ ΕΤΑΙΡΙΑΣ" : "company_name",
    "ΔΥΝΑΜΙΚΟ" : "personnel",
    "FAX" : "fax",
    "EMAIL" : "email",
    "ΙΣΤΟΣΕΛΙΔΑ" : "website",
    "ΟΔΟΣ" : "address_street",
    "ΑΡΙΘΜΟΣ" : "address_number",
    "ΤΚ" : "address_postal_code",
    "Τ.Κ." : "address_postal_code",
    "ΣΧΟΛΙΑ" : "comments",
    "ΣΤΑΘΕΡΑ" : "phone",
    "ΚΙΝΗΤΑ" : "mobile",
    "ΝΟΜΟΣ/ΠΟΛΙΤΕΙΑ" : "state",
    "ΝΟΜΟΣ" : "state",
    "ΠΟΛΙΤΕΙΑ" : "state",
    "ΠΟΛΗ" : "city",
    "ΠΕΡΙΟΧΗ" : "area",
    "ΚΩΔΙΚΟΣ ΑΠΟΤΕΛΕΣΜΑΤΟΣ" : "apotelesma_id",
    "ΚΩΔΙΚΟΣ ΕΠΑΓΓΕΛΜΑΤΟΣ" : "job_id",
    "ΚΩΔΙΚΟΣ ΤΟΠΟΘΕΣΙΑΣ" : "location_id",
    "ΚΩΔΙΚΟΣ ΠΩΛΗΤΗ" : "salesman_id"
  }

  let x = {}
  Object.keys(obj).forEach(function(key) {
    x[dict[key]] = obj[key];
  })
  return x
}

export function timeConverter(UNIX_timestamp){
  var x = Date.parse(UNIX_timestamp);
  var a = new Date(x);
  var year = a.getFullYear();
  var month = a.getMonth()+1;
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  //var sec = a.getSeconds();
  var time = date + '-' + month + '-' + year + ' ' + hour + ':' + min;
  return time;
}

export function deleteCommon( arr1, arr2){
  let res = []
  let common = false;
  for (let i=0 ; i<arr1.length ; i++){
    for (let j=0 ; j<arr2.length ; j++){
      if(JSON.stringify(arr1[i]) == JSON.stringify(arr2[j])){
        common = true;
        console.log(arr1[i])
        console.log(arr2[j])
      }
      if (!common) {res.push(arr1[i]);common = false;}
    }
  }
  console.log(res)
  return res
}