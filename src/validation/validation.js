const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidName = function (value) {
  let nameRegex =
    /^[a-zA-Z ]+$/;
  if (nameRegex.test(value)) return true;
};

const isValidCollegeName = function (value) {
  let nameRegex =
  /^[a-z ,.'-]+$/i;
  if (nameRegex.test(value)) return true;
};
const isValidEmail = function (value) {
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
    if (emailRegex.test(value)) return true;
  };

  const isValidMobile = function (value) {
    let mobileRegex =
      /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
      
    if (mobileRegex.test(value)) return true;
  };

module.exports ={
    isValid,
    isValidEmail,
    isValidMobile,
    isValidName,
    isValidCollegeName
}