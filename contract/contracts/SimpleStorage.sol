// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct DiplomeStruct {
  string nom;
  string niveau;
  string ref;
}

struct StudentStruct {
  string cin;
  string university;
  DiplomeStruct[] diplomeStructs;
}

contract Diplome {
  string public nom;
  string public niveau;
  string public ref;

  constructor(string memory _nom, string memory _niveau, string memory _ref) {
    nom = _nom;
    niveau = _niveau;
    ref = _ref;
  }

  function structIt() public view returns (DiplomeStruct memory) {
    return DiplomeStruct(nom, niveau, ref);
  }
}

contract Student {
  string public cin;
  string public university;
  Diplome[] public diplomes;

  constructor(string memory _cin, string memory _university) {
    cin = _cin;
    university = _university;
  }

  function structIt() public view returns (StudentStruct memory) {
    DiplomeStruct[] memory diplomeStructs1 = new DiplomeStruct[](
      diplomes.length
    );
    for (uint256 i = 0; i < diplomes.length; i++) {
      diplomeStructs1[i] = diplomes[i].structIt();
    }
    return StudentStruct(cin, university, diplomeStructs1);
  }

  function getInformations()
    public
    view
    returns (string memory, string memory, DiplomeStruct[] memory)
  {
    DiplomeStruct[] memory diplomeStructs2 = new DiplomeStruct[](
      diplomes.length
    );
    for (uint256 i = 0; i < diplomes.length; i++) {
      diplomeStructs2[i] = diplomes[i].structIt();
    }
    return (cin, university, diplomeStructs2);
  }

  function addDiplome(
    string memory nom,
    string memory niveau,
    string memory ref
  ) public {
    diplomes.push(new Diplome(nom, niveau, ref));
    DiplomeStruct[] memory diplomeStructs1 = new DiplomeStruct[](
      diplomes.length
    );
    for (uint256 i = 0; i < diplomes.length; i++) {
      diplomeStructs1[i] = diplomes[i].structIt();
    }
  }

  function getDiplomeCount() public view returns (uint) {
    return diplomes.length;
  }

  // function getDiplome(uint index) public view returns (uint256, uint, string memory) {
  //   require(index < diplomes.length, "Invalid index");
  //   Diplome diplome = diplomes[index];
  //   return (diplome.id, diplome.niveau, diplome.ref);
  // }
}

contract SimpleStorage {
  Student[] students;

  constructor() {
    Student student1 = new Student("UB101646", "um5");
    student1.addDiplome("Informatique", "deug", "0x35543223");
    student1.addDiplome("Informatique", "licence", "0x3534523");
    students.push(student1);

    Student student2 = new Student("D73842", "msl");
    student2.addDiplome("arabic", "deug", "0x96443223");
    student2.addDiplome("arabic", "licence", "0x6435623");
    students.push(student2);
  }

  // function read() public view returns (string memory, string memory) {
  //   require(students.length > 0, "No students available");
  //   return students[0].getInformations();
  // }

  function getStudentCount() public view returns (uint) {
    return students.length;
  }

  function getStudents() public view returns (StudentStruct[] memory) {
    StudentStruct[] memory studentStructs = new StudentStruct[](
      students.length
    );

    for (uint256 i = 0; i < students.length; i++) {
      studentStructs[i] = students[i].structIt();
    }
    return studentStructs;
  }

  // function getStudent(uint flkj) public pure returns (Etudiant[] memory) {
  //   Etudiant[] memory etudiants = new Etudiant[](1);
  //   etudiants[0] = Etudiant("amimi", "soufiane");
  //   return etudiants;
  // }

  // function getStudent(
  //   uint index
  // ) public view returns (string memory, string memory, Diplome[] memory) {
  //   require(index < students.length, "Invalid index");
  //   Student student = students[index];
  //   return student.getInformations();
  // }

  // function addDiplome(uint256 id, uint niveau, string memory ref) public {
  //   student.addDiplome(id, niveau, ref);
  // }

  // function getDiplomeCount() public view returns (uint) {
  //   return student.getDiplomeCount();
  // }

  // function getDiplome(
  //   uint index
  // ) public view returns (uint256, uint, string memory) {
  //   return student.getDiplome(index);
  // }
}
