import React from "react"
import './card.css'

export default function Card(props) {
    let badgeText;
    if (props.location === "Online") {
        badgeText = "BUZZ"
    }
    
    return (
        <div className="card">
            {
                badgeText && 
                <div className="card--badge">{badgeText}</div>
            }
            <img 
                src={props.coverImg} 
                className="card--image" 
            />
            <div className="card--stats">
                <span>{props.stats.rating}</span>
                <span className="gray">({props.stats.reviewCount})</span>
            </div>
            <p className="card--title">{props.title}</p>
            <p className="card--price">
                <span className="bold">From ${props.price}</span> / person
            </p>
        </div>
    )
}