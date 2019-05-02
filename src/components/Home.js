import React from 'react'

export default function Home(props) {
    return (
        <div>
            {props.name ? `Hello, ${props.name}` : "No name given..."}
        </div>
    )
}