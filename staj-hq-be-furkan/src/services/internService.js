const excelToJson = require("convert-excel-to-json");
const fileSystem = require("fs")

function importExcel (filePath) {


   const excelData = excelToJson({
    sourceFile : filePath,
    header : {rows : 1},
    columnToKey:{
        A : 'applicationId',
        B : 'name',
        C : 'identityNo',
        D : 'school',
        E : 'department',
        F : 'grade',
        G : 'gpa_4',
        H : 'term',
        I : 'city',
        J : 'phoneNumber',
        K : 'email',
        L : 'faculty',
        M : 'yoksisVerification',
        R : 'gpa_100',
        S : 'transcriptLink',
        V : 'hasInternshipExperience',
        AC : 'gender',
        AD : 'nationality',
        AF : 'address',
        AG : 'postCode',
        AH : 'district'
    }
   });
    
   fileSystem.unlinkSync(filePath)


  return excelData;

}


module.exports = {
    importExcel
}