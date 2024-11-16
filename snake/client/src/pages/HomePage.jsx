import React from 'react'

function HomePage() {
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-4">
                <div className="p-3 border bg-light">
                <h2>Left Section</h2>
                <p>Content for the left section.</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="p-3 border bg-light">
                <h2>Center Section</h2>
                <p>Content for the center section.</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="p-3 border bg-light">
                <h2>Right Section</h2>
                <p>Content for the right section.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage;