
import axios from 'axios'
/*Συνάρτηση που παίρνει έναν πίνακα απο JSON, και επιστρέφει έναν πίνακα με ένα attribute αυτόν χωρίς διπλότυπα
Αν καθοριστεί η παράμετρος conditional_attribute επιλέγονται μόνο attributes αντικειμένων 
των οποίων το conditional_attribute είναι ίσο με αυτό του dependence_json αντικειμένου*/
export function makeToUnique(array_of_json, target_attribute, dependence_json ,conditional_attribute) {
  var unique_array = [];
  if (typeof array_of_json === "undefined") {
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
    "ΚΩΔΙΚΟΣ ΠΩΛΗΤΗ" : "salesman_id",
    "ΗΜΕΡΟΜΗΝΙΑ ΠΑΡΑΓΓΕΛΙΑΣ" : "order_date",
    "ΣΥΝΟΛΙΚΟ ΠΟΣΟ" : "total_amount",
    "VOUCHER" : "voucher",
    "ΚΩΔΙΚΟΣ ΣΥΝΔΡΟΜΗΣ" : "subscription_id",
    "ΑΡΙΘΜΟΣ ΔΟΣΕΩΝ" : "number_of_doses",
    "ΠΟΣΟ ΔΟΣΗΣ" : "dose_amount",
    "ΠΡΟΘΕΣΜΙΑ ΠΛΗΡΩΜΗΣ" : "dose_deadline",
    "ΤΡΟΠΟΣ ΠΛΗΡΩΜΗΣ ΔΟΣΗΣ" : "payment_method",
    "ΠΛΗΡΩΘΕΝ ΠΟΣΟ ΔΟΣΗΣ" : "payment_amount",
    "ΚΩΔΙΚΟΣ ΤΡΟΠΟΥ ΠΑΡΑΔΟΣΗΣ" : "shipping_method_id",
    "ΚΩΔΙΚΟΣ ΠΕΛΑΤΗ" : "spcode"
  }

  let x = {}
  Object.keys(obj).forEach(function(key) {
    x[dict[key]] = obj[key];
  })
  return x
}

export function timeConverter(UNIX_timestamp, showfull = true){
  if (UNIX_timestamp){
  var x = Date.parse(UNIX_timestamp);
  var a = new Date(x);
  var year = a.getFullYear();
  var month = a.getMonth()+1;
  var date = a.getDate();
  //let hour= a.getHours();
  //let min = a.getMinutes();
  var hour = (a.getHours())/10 === 0 ? "0" + toString(a.getHours()) : a.getHours()
  var min = (a.getMinutes())/10 === 0 ? "0" + toString(a.getMinutes()) : a.getMinutes()
  //var sec = a.getSeconds();
  var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min;
  let tim2 = date + '/' + month + '/' + year;
  return (showfull?time:tim2 );
  }
  return null;
}

export function getRandomCustomers(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x]["spcode"];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}


export function makeIntoExcel(custs){
  const dict = {
    "first_name" : "ΟΝΟΜΑ",
    "last_name" : "ΕΠΩΝΥΜΟ",
    "fathers_name" : "ΠΑΤΡΩΝΥΜΟ",
    "company_name" : "ΕΠΩΝΥΜΙΑ ΕΤΑΙΡΙΑΣ",
    "personnel" : "ΔΥΝΑΜΙΚΟ",
    "fax" : "FAX",
    "email" : "EMAIL",
    "website" : "ΙΣΤΟΣΕΛΙΔΑ",
    "address_street" : "ΟΔΟΣ",
    "address_number" : "ΑΡΙΘΜΟΣ",
    "address_postal_code" : "Τ.Κ.",
    "comments" : "ΣΧΟΛΙΑ",
    "phone" : "ΣΤΑΘΕΡΑ",
    "mobile" : "ΚΙΝΗΤΑ",
    "state_id" : "ΝΟΜΟΣ/ΠΟΛΙΤΕΙΑ",
    "city_id" : "ΠΟΛΗ",
    "area_id" : "ΠΕΡΙΟΧΗ",
    "apotelesma_id" : "ΚΩΔΙΚΟΣ ΑΠΟΤΕΛΕΣΜΑΤΟΣ",
    "job_id" : "ΚΩΔΙΚΟΣ ΕΠΑΓΓΕΛΜΑΤΟΣ",
    "location_id" : "ΚΩΔΙΚΟΣ ΤΟΠΟΘΕΣΙΑΣ",
    "state" : "ΝΟΜΟΣ/ΠΟΛΙΤΕΙΑ",
    "city" : "ΠΟΛΗ",
    "area" : "ΠΕΡΙΟΧΗ",
    "salesman_id" : "ΚΩΔΙΚΟΣ ΠΩΛΗΤΗ",
    "spcode" : "ΚΩΔΙΚΟΣ ΠΕΛΑΤΗ"
  }

  let res = custs.map( (cust) => {
    let kappa = {}
    Object.keys(dict).forEach((key)=>{ 
      if (cust.hasOwnProperty(key)) kappa[dict[key]] = cust[key]
      else kappa[dict[key]] = null
   });
   return kappa
  })
  return res
}

export function sendParameterRequest(tablename, datum){

  let d = {}
  d[tablename] = datum
  let paroptions = {
    method: "post",
    url: "http://localhost:5000/add_parameters",
    data : d
  }

  axios(paroptions).then((res)=> console.log(res)).catch((err)=> console.log(err))
}