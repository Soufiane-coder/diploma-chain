import React from 'react';
import Card from '../../components/card/card.component';
import "./card-list.style.scss";

const CardList = () => {
    return (
        <div className="card-list">
            <Card /><Card /><Card />
        </div>
    )
}

export default CardList;