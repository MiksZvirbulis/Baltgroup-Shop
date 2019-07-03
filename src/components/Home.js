import React from 'react'

const Home = props => {
    return (
        <>
            <p className="mt-2" dangerouslySetInnerHTML={{__html: props.helloText}}></p>
        </>
    )
}

export default Home