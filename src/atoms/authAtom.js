const { atom } = require("recoil");

const authScreenAtom= atom({
    key:'authScreenAtom',
    default:'signup'
})
export default authScreenAtom