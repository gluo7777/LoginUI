export default {
    dob: (val, appContext) => {
        let current = new Date();
        let minYear = current.getUTCFullYear - 18;
        let minDate = new Date(current);
        minDate.setUTCFullYear(minYear);
        if (val.getTime() < minDate.getTime()) {
            return "Must be at least 18 years old.";
        } else {
            return null;
        }
    }
};