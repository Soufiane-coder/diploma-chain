
export const addStudent = (studentList,student) => {
    const searchedStudent = studentList.find((item) => item.studentId === student.studentId);
    if(searchedStudent){
        return studentList;
    }
    return studentList.concat(student);
}

export const addSemester = (studentList, studentId) => {
    const searchedStudent = studentList.find((item) => item.studentId === studentId);
    if(!searchedStudent){
        console.error('There is no student'); // This is not have to be displayed cause there is always a student before we make adding semester
        return studentList;
    }
    !searchedStudent.semesters ? searchedStudent.semesters = [{semester: 1, modules: []}] :
    searchedStudent.semesters.push({semester: searchedStudent.semesters.length + 1, modules: []})
    return studentList
}

export const addModule = (studentList, studentId, semesterNum, moduleName, note, id) => {
    const searchedStudent = studentList.find((item) => item.studentId === studentId);
    if(!searchedStudent){
        console.error('There is no student'); // This is not have to be displayed cause there is always a student before we make adding semester
        return studentList;
    }
    const searchedSemester = searchedStudent.semesters?.find(item => item.semester === semesterNum);
    searchedSemester.modules.push({moduleName,note, id});
    return studentList;
}

export const changeAttribute = (studentList, studentId, attributeName, newAttributeValue) => {
    console.log(studentId, attributeName, newAttributeValue);
    const searchedStudent = studentList.find((item) => item.studentId === studentId);
    if(!searchedStudent){
        console.error('There is no student'); // This is not have to be displayed cause there is always a student before we make adding semester
        return studentList;
    }
    searchedStudent[attributeName] = newAttributeValue;
    return studentList;
}