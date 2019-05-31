// export default comfun = {
//     isPoneAvailable(str) {
//         var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
//         if (!myreg.test(str)) {
//             return false;
//         } else {
//             return true;
//         }
//     },
//     sortRule(a, b) {
//         return a.sort - b.sort;
//     }
// }
export default function sortRule(a, b) {
    return a.sort - b.sort;
}