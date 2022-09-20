const rexIDCheck = /^[a-z]+[a-z0-9]{3,16}/gm;
const rexPhoneNumber = /((01[016789])(\d{3,4})(\d{4})){1}/gm;
const rexEmail = /^[a-zA-Z0-9+-_]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm;

export { rexIDCheck, rexPhoneNumber, rexEmail };
