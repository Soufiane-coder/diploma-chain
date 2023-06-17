import React from 'react';
import Card from '../../components/card/card.component';
import "./card-list.style.scss";

const CardList = ({ searchedStudents }) => {
    return (
        <div className="card-list">
            {
                searchedStudents.length !== 0 ? searchedStudents.map(student =>
                    (<Card key={student.studentId} student={student} />)
                ) : <h1 style={{ marginLeft: "auto", marginRight: "auto" }}>Aucun étudiant a été trouvé</h1>
            }
        </div>
    )
}

export default CardList;