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
export function loadAreaChoice(setAreaChoice){
  var x = localStorage.getItem('area_choice')
  var y = JSON.parse(x)
  if (typeof(y)!== 'undefined'){
    setAreaChoice(y)
  }
}

