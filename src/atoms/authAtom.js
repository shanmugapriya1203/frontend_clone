const { atom } = require("recoil");

const authScreenAtom= atom({
    key:'authScreenAtom',
    default:'login'
})
export default authScreenAtom
