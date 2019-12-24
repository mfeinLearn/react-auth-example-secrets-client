import React from 'react'
//deconstruction - used to grab properties from objects in deconstruction
const Secrets = ({ secrets }) => {
  const secretsJSX = secrets.map(s => <p key={s.id}>{s.content}</p>)
  return (
    <div className="Secrets">
      {secretsJSX}
    </div>
  )
}

export default Secrets
